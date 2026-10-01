import { describe, expect, it } from 'vitest';

import { participantName, resolveSystemNotice } from '../resolveSystemNotice';
import { client, colleague, message, operator, thread } from './fixtures';

describe('resolveSystemNotice', () => {
	it('maps a known type to its text and tone', () => {
		const notice = resolveSystemNotice(
			message({
				sender: operator,
				system: {
					type: 'transferred',
				},
			}),
			thread(),
		);
		expect(notice).toMatchObject({
			textKey: 'systemNotice.transferred',
			tone: 'neutral',
		});
		expect(notice.actor?.id).toBe(operator.id);
	});

	it('colours start positive and end negative', () => {
		expect(
			resolveSystemNotice(
				message({
					system: {
						type: 'thread_started',
					},
				}),
				thread(),
			).tone,
		).toBe('positive');
		expect(
			resolveSystemNotice(
				message({
					system: {
						type: 'thread_closed',
					},
				}),
				thread(),
			).tone,
		).toBe('negative');
	});

	it('prefers the actor named in metadata over the sender', () => {
		const t = thread({
			members: [
				operator,
				colleague,
				client,
			],
		});
		const notice = resolveSystemNotice(
			message({
				sender: operator,
				system: {
					type: 'member_added',
					metadata: {
						memberId: colleague.id,
					},
				},
			}),
			t,
		);
		expect(notice.actor?.id).toBe(colleague.id);
	});

	it('reads the joined / removed member from the chat-web-sdk metadata keys', () => {
		const t = thread({
			members: [
				operator,
				colleague,
				client,
			],
		});
		const joined = resolveSystemNotice(
			message({
				sender: operator,
				system: {
					type: 'member_added',
					metadata: {
						newMemberId: colleague.id,
					},
				},
			}),
			t,
		);
		const removed = resolveSystemNotice(
			message({
				sender: operator,
				system: {
					type: 'member_removed',
					metadata: {
						removedMemberId: colleague.id,
					},
				},
			}),
			t,
		);
		expect(joined.actor?.id).toBe(colleague.id);
		expect(removed.actor?.id).toBe(colleague.id);
	});

	it('falls back to the backend text for an unknown type', () => {
		const notice = resolveSystemNotice(
			message({
				body: 'Custom event',
				system: {
					type: 'something_new',
				},
			}),
			thread(),
		);
		expect(notice).toMatchObject({
			textKey: null,
			fallbackText: 'Custom event',
			tone: 'neutral',
		});
	});

	it('falls back to the generic text when an unknown type has no body', () => {
		const notice = resolveSystemNotice(
			message({
				body: undefined,
				system: {
					type: 'something_new',
				},
			}),
			thread(),
		);
		expect(notice).toMatchObject({
			textKey: 'systemNotice.unknown',
			fallbackText: null,
		});
	});

	// Review Focus #5
	it('keeps the name of an actor who already left the thread', () => {
		const notice = resolveSystemNotice(
			message({
				sender: colleague,
				system: {
					type: 'member_removed',
				},
			}),
			thread({
				members: [
					operator,
					client,
				],
			}),
		);
		expect(participantName(notice.actor)).toBe('Oleh Bondar');
	});
});

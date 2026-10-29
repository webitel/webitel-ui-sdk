import { describe, expect, it } from 'vitest';

import { isInternalThread, isOutgoingMessage } from '../isOutgoingMessage';
import { bot, client, colleague, message, operator, thread } from './fixtures';

const internalThread = thread({
	members: [
		operator,
		colleague,
		bot,
	],
});

describe('isInternalThread', () => {
	it('is a thread with no client', () => {
		expect(isInternalThread(internalThread)).toBe(true);
	});

	it('is not a thread with a client', () => {
		expect(isInternalThread(thread())).toBe(false);
	});

	it('is not a thread whose members are not known', () => {
		expect(
			isInternalThread(
				thread({
					members: [],
				}),
			),
		).toBe(false);
		expect(
			isInternalThread(
				thread({
					members: undefined,
				}),
			),
		).toBe(false);
	});
});

describe('isOutgoingMessage', () => {
	describe('with a client in the thread', () => {
		const withClient = thread({
			members: [
				operator,
				colleague,
				bot,
				client,
			],
		});

		it.each([
			[
				'the operator',
				operator,
			],
			[
				'a colleague',
				colleague,
			],
			[
				'a bot',
				bot,
			],
		])('puts %s on the operator’s side', (_who, sender) => {
			expect(
				isOutgoingMessage(
					message({
						sender,
					}),
					withClient,
					operator.id,
				),
			).toBe(true);
		});

		it('puts the client on the other side', () => {
			expect(
				isOutgoingMessage(
					message({
						sender: client,
					}),
					withClient,
					operator.id,
				),
			).toBe(false);
		});
	});

	describe('between colleagues', () => {
		it('puts only the operator on the operator’s side', () => {
			const outgoing = (sender: typeof operator) =>
				isOutgoingMessage(
					message({
						sender,
					}),
					internalThread,
					operator.id,
				);

			expect(outgoing(operator)).toBe(true);
			expect(outgoing(colleague)).toBe(false);
			expect(outgoing(bot)).toBe(false);
		});

		it('puts nobody on it while the operator’s member is unknown', () => {
			expect(
				isOutgoingMessage(
					message({
						sender: operator,
					}),
					internalThread,
					'',
				),
			).toBe(false);
		});
	});
});

import { describe, expect, it } from 'vitest';

import { getMessageStatus } from '../getMessageStatus';
import { bot, client, message, operator, thread } from './fixtures';

const own = (seq: string) =>
	message({
		sender: operator,
		seq,
	});

describe('getMessageStatus', () => {
	it('shows no ticks on the client’s messages', () => {
		expect(
			getMessageStatus(
				message({
					sender: client,
				}),
				thread(),
				operator.id,
			),
		).toBeNull();
	});

	it('shows no ticks on deleted or system messages', () => {
		expect(
			getMessageStatus(
				{
					...own('1'),
					deleted: true,
				},
				thread(),
				operator.id,
			),
		).toBeNull();
		expect(
			getMessageStatus(
				{
					...own('1'),
					system: {
						type: 'transferred',
					},
				},
				thread(),
				operator.id,
			),
		).toBeNull();
	});

	it('is sent without any client read state', () => {
		expect(getMessageStatus(own('5'), thread(), operator.id)).toBe('sent');
	});

	it('is sent when the message has no seq', () => {
		expect(
			getMessageStatus(
				{
					...own('5'),
					seq: undefined,
				},
				thread(),
				operator.id,
			),
		).toBe('sent');
	});

	it('follows the client horizons', () => {
		const t = thread({
			readStates: [
				{
					memberId: client.id,
					deliveredUpToSeq: '7',
					readUpToSeq: '5',
				},
			],
		});
		expect(getMessageStatus(own('5'), t, operator.id)).toBe('read');
		expect(getMessageStatus(own('6'), t, operator.id)).toBe('delivered');
		expect(getMessageStatus(own('8'), t, operator.id)).toBe('sent');
	});

	// Review Focus #1
	it('compares seq numerically, not as strings', () => {
		const t = thread({
			readStates: [
				{
					memberId: client.id,
					deliveredUpToSeq: '9',
					readUpToSeq: '9',
				},
			],
		});
		expect(getMessageStatus(own('10'), t, operator.id)).toBe('sent');
		expect(getMessageStatus(own('9'), t, operator.id)).toBe('read');
	});

	it('ignores the contact-centre side’s own horizons', () => {
		const t = thread({
			members: [
				operator,
				client,
				bot,
			],
			readStates: [
				{
					memberId: operator.id,
					readUpToSeq: '100',
				},
				{
					memberId: bot.id,
					readUpToSeq: '100',
				},
			],
		});
		expect(getMessageStatus(own('3'), t, operator.id)).toBe('sent');
	});

	it('takes the lowest horizon over several clients', () => {
		const second = {
			id: 'm-client-2',
			contact: {
				name: 'Bob',
				type: 'viber',
			},
		};
		const t = thread({
			members: [
				operator,
				client,
				second,
			],
			readStates: [
				{
					memberId: client.id,
					readUpToSeq: '10',
				},
				{
					memberId: second.id,
					deliveredUpToSeq: '8',
					readUpToSeq: '4',
				},
			],
		});
		expect(getMessageStatus(own('6'), t, operator.id)).toBe('delivered');
		expect(getMessageStatus(own('9'), t, operator.id)).toBe('sent');
	});

	it('treats a member’s read horizon as delivered for that member', () => {
		const second = {
			id: 'm-client-2',
			contact: {
				name: 'Bob',
				type: 'viber',
			},
		};
		const t = thread({
			members: [
				operator,
				client,
				second,
			],
			readStates: [
				{
					memberId: client.id,
					deliveredUpToSeq: '10',
					readUpToSeq: '0',
				},
				{
					memberId: second.id,
					deliveredUpToSeq: '0',
					readUpToSeq: '10',
				},
			],
		});
		expect(getMessageStatus(own('6'), t, operator.id)).toBe('delivered');
	});

	it('uses the member carried on the read state when it left thread.members', () => {
		const t = thread({
			members: [
				operator,
			],
			readStates: [
				{
					member: client,
					readUpToSeq: '3',
				},
			],
		});
		expect(getMessageStatus(own('3'), t, operator.id)).toBe('read');
	});
});

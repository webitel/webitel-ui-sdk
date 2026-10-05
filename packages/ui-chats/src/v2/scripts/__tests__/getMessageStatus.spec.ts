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

	// generated types say string | undefined, but JSON can carry null; Number(null) is 0
	it('is sent, not read, when seq arrives as null', () => {
		const t = thread({
			readStates: [
				{
					memberId: client.id,
					readUpToSeq: '0',
				},
			],
		});
		expect(
			getMessageStatus(
				{
					...own('1'),
					seq: null as never,
				},
				t,
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

	// A re-joined operator gets a new member id, but the thread snapshot (and so
	// selfMemberId) still holds the old one; their contact is the stable identity.
	describe('after the operator rejoined with a new member id', () => {
		const oldMember = {
			id: 'm-me-old',
			contact: {
				name: 'Dania',
				type: 'webitel',
				sub: '164',
				iss: 'webitel',
			},
		};
		const newMember = {
			id: 'm-me-new',
			contact: {
				name: 'Dania',
				type: 'webitel',
				sub: '164',
				iss: 'webitel',
			},
		};
		const t = thread({
			members: [
				oldMember,
				client,
			],
			readStates: [
				{
					memberId: client.id,
					readUpToSeq: '5',
				},
			],
		});

		it('still treats their messages as their own', () => {
			expect(
				getMessageStatus(
					message({
						sender: newMember,
						seq: '3',
					}),
					t,
					oldMember.id,
				),
			).toBe('read');
		});

		it('does not claim another operator’s message', () => {
			const other = {
				id: 'm-other',
				contact: {
					name: 'Ola',
					type: 'webitel',
					sub: '289',
					iss: 'webitel',
				},
			};
			expect(
				getMessageStatus(
					message({
						sender: other,
					}),
					t,
					oldMember.id,
				),
			).toBeNull();
		});

		it('does not match the same subject from another issuer', () => {
			const lookalike = {
				id: 'm-x',
				contact: {
					name: 'Dania',
					type: 'telegram',
					sub: '164',
					iss: 'telegram',
				},
			};
			expect(
				getMessageStatus(
					message({
						sender: lookalike,
					}),
					t,
					oldMember.id,
				),
			).toBeNull();
		});
	});
});

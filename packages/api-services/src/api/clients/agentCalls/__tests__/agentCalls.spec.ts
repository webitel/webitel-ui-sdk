import { beforeEach, describe, expect, it, vi } from 'vitest';

const time = 123;

const searchHistoryCallPost = vi.fn(() =>
	Promise.resolve({
		data: {
			items: [
				{
					created_at: time,
					joined_at: time,
					duration: 60,
				},
			],
		},
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getCallService: () => ({
		searchHistoryCallPost,
	}),
}));

const { FormatDateMode } = await import('../../../../enums');
const { convertDuration } = await import('../../../../scripts');
const { formatDate } = await import('../../../../utils');
const { AgentCallsAPI } = await import('../agentCalls');

// Expected output mirrors the source `listHandler`: createdAt -> DATETIME,
// joinedAt -> TIME, durations via convertDuration, every other field null,
// files grouped into an (empty) object.
const expectItems = [
	{
		createdAt: formatDate(+time, FormatDateMode.DATETIME),
		joinedAt: formatDate(+time, FormatDateMode.TIME),
		duration: convertDuration(60),
		answeredAt: null,
		bridgedAt: null,
		queueBridgedAt: null,
		leavingAt: null,
		hangupAt: null,
		reportingAt: null,
		holdSec: null,
		waitSec: null,
		billSec: null,
		talkSec: null,
		reportingSec: null,
		queueWaitSec: null,
		queueDurationSec: null,
		scoreRequired: null,
		files: {},
	},
];

describe('AgentCallsAPI.getList', () => {
	beforeEach(() => searchHistoryCallPost.mockClear());

	it('correctly processes the response', async () => {
		const response = await AgentCallsAPI.getList({});
		expect(searchHistoryCallPost).toHaveBeenCalled();
		expect(response).toEqual({
			next: false,
			items: expectItems,
		});
	});

	it('sends the request body in snake_case', async () => {
		await AgentCallsAPI.getList({
			userId: '2',
			queueId: '3',
			skipParent: true,
		});
		const [body] = searchHistoryCallPost.mock.calls.at(-1);
		expect(Object.keys(body)).toEqual(
			expect.arrayContaining([
				'user_id',
				'queue_id',
				'skip_parent',
			]),
		);
		expect(body).not.toHaveProperty('userId');
		expect(body).not.toHaveProperty('queueId');
		expect(body).not.toHaveProperty('skipParent');
	});

	// EngineSearchHistoryCallRequest's id-ish fields (user_id, agent_id, ...)
	// are string[] on the wire — a bare id string trips the backend's proto
	// parser (400 "unexpected token" on the id's own characters).
	it('wraps single-value id filters into arrays for the wire', async () => {
		await AgentCallsAPI.getList({
			userId: '2',
			agentId: '3',
			queueId: '4',
			teamId: '5',
			contactId: '6',
			ownerId: '7',
			gatewayId: '8',
			ratedBy: '9',
		});
		const [body] = searchHistoryCallPost.mock.calls.at(-1);
		expect(body.user_id).toEqual([
			'2',
		]);
		expect(body.agent_id).toEqual([
			'3',
		]);
		expect(body.queue_id).toEqual([
			'4',
		]);
		expect(body.team_id).toEqual([
			'5',
		]);
		expect(body.contact_id).toEqual([
			'6',
		]);
		expect(body.owner_id).toEqual([
			'7',
		]);
		expect(body.gateway_id).toEqual([
			'8',
		]);
		expect(body.rated_by).toEqual([
			'9',
		]);
	});

	it('leaves id filters undefined when not provided', async () => {
		await AgentCallsAPI.getList({});
		const [body] = searchHistoryCallPost.mock.calls.at(-1);
		expect(body.user_id).toBeUndefined();
		expect(body.agent_id).toBeUndefined();
	});

	it('normalizes a {from,to} createdAt range for the wire', async () => {
		await AgentCallsAPI.getList({
			createdAt: {
				from: 100,
				to: 200,
			},
		});
		const [body] = searchHistoryCallPost.mock.calls.at(-1);
		expect(body.created_at).toEqual({
			from: 100,
			to: 200,
		});
	});

	it('omits created_at when neither from nor to is set', async () => {
		await AgentCallsAPI.getList({});
		const [body] = searchHistoryCallPost.mock.calls.at(-1);
		expect(body.created_at).toBeUndefined();
	});

	// the rated filter's value field emits a real boolean — rated: false is a
	// legitimate, deliberate filter value, not "no filter applied"
	it('sends rated: true as-is', async () => {
		await AgentCallsAPI.getList({
			rated: true,
		});
		const [body] = searchHistoryCallPost.mock.calls.at(-1);
		expect(body.rated).toBe(true);
	});

	it('sends rated: false as-is, not omitted or flipped', async () => {
		await AgentCallsAPI.getList({
			rated: false,
		});
		const [body] = searchHistoryCallPost.mock.calls.at(-1);
		expect(body.rated).toBe(false);
	});

	it('omits rated when the filter is not applied', async () => {
		await AgentCallsAPI.getList({});
		const [body] = searchHistoryCallPost.mock.calls.at(-1);
		expect(body).not.toHaveProperty('rated');
	});
});

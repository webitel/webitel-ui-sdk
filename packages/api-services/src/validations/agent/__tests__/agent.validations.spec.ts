import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { agentSchema } from '../agent.validations';

const filledAgent = {
	user: {
		id: '1',
		name: 'John',
	},
	team: {
		id: 2,
		name: 'Support',
	},
	chatCount: 1,
	taskCount: 1,
};

const issuePaths = (value: Record<string, unknown>) =>
	agentSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('agentSchema', () => {
	it('seeds a new agent with the defaults the form expects', () => {
		expect(getDefaultsFromZodSchema(agentSchema, {})).toMatchObject({
			supervisor: [],
			auditor: [],
			region: {},
			greetingMedia: {},
			progressiveCount: null,
			chatCount: 1,
			taskCount: 1,
			extraChatCount: 0,
			isSupervisor: false,
			screenControl: false,
		});
	});

	it('requires a user and a team', () => {
		const paths = issuePaths({
			user: {},
			team: {},
			chatCount: 1,
			taskCount: 1,
		});

		expect(paths).toContain('user.id');
		expect(paths).toContain('team.id');
	});

	it('requires chat and task counts of at least 1', () => {
		const paths = issuePaths({
			...filledAgent,
			chatCount: 0,
			taskCount: null,
		});

		expect(paths).toContain('chatCount');
		expect(paths).toContain('taskCount');
	});

	it('accepts an emptied progressive count, rejects one below 1', () => {
		expect(
			issuePaths({
				...filledAgent,
				progressiveCount: null,
			}),
		).not.toContain('progressiveCount');
		expect(
			issuePaths({
				...filledAgent,
				progressiveCount: 0,
			}),
		).toContain('progressiveCount');
	});

	it('accepts an emptied extra chat count, rejects a negative one', () => {
		expect(
			issuePaths({
				...filledAgent,
				extraChatCount: null,
			}),
		).not.toContain('extraChatCount');
		expect(
			issuePaths({
				...filledAgent,
				extraChatCount: -1,
			}),
		).toContain('extraChatCount');
	});

	it('accepts a valid agent', () => {
		expect(agentSchema.safeParse(filledAgent).success).toBe(true);
	});
});

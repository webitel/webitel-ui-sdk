import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { teamSchema } from '../team.validations';

const filledTeam = {
	name: 'Support',
	strategy: 'random',
	maxNoAnswer: 3,
	wrapUpTime: 15,
	noAnswerDelayTime: 30,
	taskAcceptTimeout: 30,
	callTimeout: 60,
	inviteChatTimeout: 30,
};

const issuePaths = (value: Record<string, unknown>) =>
	teamSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('teamSchema', () => {
	it('seeds a new team with the defaults the form expects', () => {
		expect(getDefaultsFromZodSchema(teamSchema, {})).toMatchObject({
			name: '',
			description: '',
			strategy: '',
			admin: [],
			screenControl: false,
			maxNoAnswer: 3,
			wrapUpTime: 15,
			noAnswerDelayTime: 30,
			taskAcceptTimeout: 30,
			callTimeout: 60,
			inviteChatTimeout: 30,
		});
	});

	it('requires a name and a strategy', () => {
		const paths = issuePaths({
			...filledTeam,
			name: '',
			strategy: '',
		});

		expect(paths).toContain('name');
		expect(paths).toContain('strategy');
	});

	it('requires every timing parameter', () => {
		const paths = issuePaths({
			...filledTeam,
			maxNoAnswer: null,
			wrapUpTime: null,
			noAnswerDelayTime: null,
			taskAcceptTimeout: null,
			callTimeout: null,
			inviteChatTimeout: null,
		});

		expect(paths).toEqual(
			expect.arrayContaining([
				'maxNoAnswer',
				'wrapUpTime',
				'noAnswerDelayTime',
				'taskAcceptTimeout',
				'callTimeout',
				'inviteChatTimeout',
			]),
		);
	});

	it('accepts a zero timing parameter', () => {
		expect(
			teamSchema.safeParse({
				...filledTeam,
				wrapUpTime: 0,
			}).success,
		).toBe(true);
	});

	it('accepts a filled team', () => {
		expect(teamSchema.safeParse(filledTeam).success).toBe(true);
	});
});

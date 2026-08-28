import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { z } from 'zod/v4';

/**
 * Guards the query params each client actually puts on the wire against the
 * generated schema for that endpoint.
 *
 * Why this exists: these clients used to call the webitel-sdk factories
 * positionally, where the local variable name never reached the request — the
 * factory mapped slot to parameter name. They now pass an object, so the keys
 * *are* the wire names and their casing suddenly matters. `casePriorities` was
 * shipping `not_in_sla` where the endpoint wants `notInSla`; nothing caught it,
 * because tsc only checks object literals and several of these clients hand the
 * generated method a pre-built object typed `any`.
 *
 * `.strict()` is the whole point: a plain `safeParse` *strips* unknown keys and
 * passes, so it would have waved the bug straight through. Explicit `undefined`
 * is fine either way, which matters because the clients spell absent filters
 * that way rather than omitting them.
 */
const captured = vi.fn();

const service = (method: string) => () => ({
	[method]: (...args: unknown[]) => {
		captured(args);
		return Promise.resolve({
			data: {},
		});
	},
});

vi.mock('../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getRegionService: service('searchRegion'),
	getSkillService: service('searchSkill'),
	getBucketService: service('searchBucket'),
	getMediaFileService: service('searchMediaFile'),
	getListService: service('searchList'),
	getCommunicationTypeService: service('searchCommunicationType'),
	getSystemSettingService: service('searchSystemSetting'),
	getRoutingSchemaService: service('searchRoutingSchema'),
	getAgentTeamService: service('searchAgentTeam'),
	getAgentService: service('searchAgent'),
	getPriorities: service('listPriorities'),
}));

const {
	ListPrioritiesQueryParams,
	SearchAgentQueryParams,
	SearchAgentTeamQueryParams,
	SearchBucketQueryParams,
	SearchCommunicationTypeQueryParams,
	SearchListQueryParams,
	SearchMediaFileQueryParams,
	SearchRegionQueryParams,
	SearchRoutingSchemaQueryParams,
	SearchSkillQueryParams,
	SearchSystemSettingQueryParams,
} = await import('../../../gen-wire');

const { RegionsAPI } = await import('../regions/regions');
const { SkillsAPI } = await import('../skills/skills');
const { BucketsAPI } = await import('../buckets/buckets');
const { MediaAPI } = await import('../media/media');
const { BlacklistsAPI } = await import('../lists/blacklists');
const { CommunicationsAPI } = await import('../communications/communications');
const { ConfigurationsAPI } = await import('../configurations/configurations');
const { FlowsAPI } = await import('../flows/flow');
const { TeamsAPI } = await import('../teams/teams');
const { AgentsAPI } = await import('../agents/agents');
const { CasePrioritiesAPI } = await import('../casePriorities/casePriorities');

/** What a datalist store sends: camelCase, with a `search` term. */
const listParams = {
	page: 2,
	size: 25,
	search: 'acme',
	sort: '+name',
	fields: [
		'id',
		'name',
	],
};

const cases: [
	string,
	() => Promise<unknown>,
	z.ZodObject,
][] = [
	[
		'RegionsAPI.getList',
		() => RegionsAPI.getList(listParams),
		SearchRegionQueryParams,
	],
	[
		'SkillsAPI.getList',
		() => SkillsAPI.getList(listParams),
		SearchSkillQueryParams,
	],
	[
		'BucketsAPI.getList',
		() => BucketsAPI.getList(listParams),
		SearchBucketQueryParams,
	],
	[
		'MediaAPI.getList',
		() => MediaAPI.getList(listParams),
		SearchMediaFileQueryParams,
	],
	[
		'BlacklistsAPI.getList',
		() => BlacklistsAPI.getList(listParams),
		SearchListQueryParams,
	],
	[
		'CommunicationsAPI.getList',
		() => CommunicationsAPI.getList(listParams),
		SearchCommunicationTypeQueryParams,
	],
	[
		'ConfigurationsAPI.getList',
		() => ConfigurationsAPI.getList(listParams),
		SearchSystemSettingQueryParams,
	],
	[
		'FlowsAPI.getList',
		() => FlowsAPI.getList(listParams),
		SearchRoutingSchemaQueryParams,
	],
	[
		'TeamsAPI.getList',
		() => TeamsAPI.getList(listParams),
		SearchAgentTeamQueryParams,
	],
	[
		'AgentsAPI.getList',
		() => AgentsAPI.getList(listParams),
		SearchAgentQueryParams,
	],
	[
		'CasePrioritiesAPI.getList',
		() => CasePrioritiesAPI.getList(listParams),
		ListPrioritiesQueryParams,
	],
];

describe('query params reaching the generated client', () => {
	beforeEach(() => captured.mockReset());

	it.each(
		cases,
	)('%s sends only keys the endpoint declares', async (_name, call, schema) => {
		await call();

		expect(captured).toHaveBeenCalledOnce();
		const params = captured.mock.calls[0][0].find(
			(arg: unknown) => arg && typeof arg === 'object' && !Array.isArray(arg),
		);
		// without this the assertion below passes vacuously on a missing object
		expect(params).toBeTypeOf('object');

		const result = schema.strict().safeParse(params);
		const issues = result.success
			? []
			: result.error.issues.map(
					(issue) => `${issue.code} ${issue.path.join('.')}`,
				);

		expect(issues).toEqual([]);
	});
});

describe('filters callers spell in camelCase', () => {
	beforeEach(() => captured.mockReset());

	/**
	 * crm passes these two from `opened-sla-condition-popup.vue`. This endpoint
	 * is one of eight (out of 441) whose params really are camelCase, so the
	 * client must not snake them on the way out.
	 */
	it('CasePrioritiesAPI.getList keeps notInSla and inSlaCond camelCase', async () => {
		await CasePrioritiesAPI.getList({
			...listParams,
			notInSla: '7',
			inSlaCond: '3',
		});

		const [params] = captured.mock.calls[0][0];
		expect(params).toMatchObject({
			notInSla: '7',
			inSlaCond: '3',
		});
		expect(ListPrioritiesQueryParams.strict().safeParse(params).success).toBe(
			true,
		);
	});

	/**
	 * These were sanitized away before the migration, so the filters silently
	 * did nothing. They must land on their generated snake_case names.
	 */
	it('AgentsAPI.getList maps team and skill onto team_id and skill_id', async () => {
		await AgentsAPI.getList({
			...listParams,
			team: [
				1,
			],
			skill: [
				2,
			],
		});

		const [params] = captured.mock.calls[0][0];
		expect(params).toMatchObject({
			team_id: [
				1,
			],
			skill_id: [
				2,
			],
		});
		expect(SearchAgentQueryParams.strict().safeParse(params).success).toBe(
			true,
		);
	});
});

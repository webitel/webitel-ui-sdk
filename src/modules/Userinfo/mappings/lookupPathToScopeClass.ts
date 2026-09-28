import { ScopeClass } from '../enums';
import { mapScopeClassToWtObjects } from './mappings';

/**
 * Needed to resolve lookup Read access: checks use WtObject, but `lookup.path`
 * is a type-registry path (`call_center/queues`) and often has no `objclass`.
 * This table maps path → ScopeClass; `mapScopeClassToWtObjects` then gives
 * WtObject. Paths not listed here go through `/types/{path}`.
 */

const lookupPathToScopeClass: Partial<Record<string, ScopeClass>> = {
	'call_center/queues': ScopeClass.Queue,
	'call_center/agents': ScopeClass.Agent,
	'call_center/list': ScopeClass.List,
	'call_center/teams': ScopeClass.Team,
	'call_center/skills': ScopeClass.Skills,
	'call_center/resources': ScopeClass.Resource,
	'call_center/resource_group': ScopeClass.ResourceGroup,
	'call_center/communication_type': ScopeClass.Dictionaries,
	'call_center/buckets': ScopeClass.Dictionaries,
	'call_center/pause_causes': ScopeClass.Dictionaries,
	'call_center/quick_replies': ScopeClass.Dictionaries,
	regions: ScopeClass.Dictionaries,
	'contacts/groups': ScopeClass.ContactGroups,
};

/** Nested type-registry paths, e.g. `cases/priorities`. */
const lookupPathPrefixToScopeClass: Array<{
	prefix: string;
	scopeClass: ScopeClass;
}> = [
	{
		prefix: 'cases/',
		scopeClass: ScopeClass.CaseLookups,
	},
	{
		prefix: 'dictionaries/',
		scopeClass: ScopeClass.Custom,
	},
];

export const getScopeClassByLookupPath = (path?: string) => {
	if (!path) return undefined;

	if (mapScopeClassToWtObjects[path as ScopeClass]) {
		return path as ScopeClass;
	}

	const exact = lookupPathToScopeClass[path];
	if (exact) return exact;

	return lookupPathPrefixToScopeClass.find(({ prefix }) =>
		path.startsWith(prefix),
	)?.scopeClass;
};

export const getWtObjectByScopeClass = (objectClass?: string) =>
	objectClass
		? mapScopeClassToWtObjects[objectClass as ScopeClass]?.[0]
		: undefined;

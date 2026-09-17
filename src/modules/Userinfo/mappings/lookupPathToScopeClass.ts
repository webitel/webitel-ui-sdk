import { ScopeClass } from '../enums';
import { mapScopeClassToWtObjects } from './mappings';

const lookupPathToScopeClass: Partial<Record<string, ScopeClass>> = {
	'call_center/queues': ScopeClass.Queue,
	'call_center/agents': ScopeClass.Agent,
	'call_center/list': ScopeClass.List,
	'call_center/teams': ScopeClass.Team,
	'call_center/skills': ScopeClass.Skills,
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

export const getWtObjectByScopeClass = (objclass?: string) =>
	objclass ? mapScopeClassToWtObjects[objclass as ScopeClass]?.[0] : undefined;

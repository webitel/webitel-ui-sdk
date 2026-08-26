import type { ApiParams } from '../../_shared/types';

/**
 * The members table, the "reset members" action and the "how many will this
 * affect?" counter all read the same filter set, but the three endpoints want
 * it in three different shapes.
 *
 * Filter names accept both the datalist names (`createdAt`, `stopCause`,
 * `memberPriority`) and the legacy flat ones (`from`/`to`, `cause`,
 * `priority`). `createdAt` and `memberPriority` arrive already resolved to
 * `{ from, to }` — relative values like "today" are resolved app-side, where
 * the user's timezone lives.
 */
export const range = (
	value: ApiParams | undefined,
	from?: number,
	to?: number,
) => ({
	from: value?.from ?? from,
	to: value?.to ?? to,
});

export const mapResetMembersFilters = (filters: ApiParams = {}) => {
	const createdAt = range(filters.createdAt, filters.from, filters.to);
	const priority = range(
		filters.memberPriority ?? filters.priority,
		filters.priorityFrom,
		filters.priorityTo,
	);

	return {
		agent_id: filters.agent,
		bucket_id: filters.bucket,
		created_at: createdAt,
		priority,
		q: filters.search,
		stop_cause: filters.stopCause ?? filters.cause,
	};
};

/**
 * The count endpoint is a GET, so the nested messages have to be spelled out
 * as dotted query keys. `qs` emits these unencoded, which is what the backend
 * expects — do NOT let `camelToSnake` near them.
 */
export const mapResetMembersQuantityFilters = (filters: ApiParams = {}) => {
	const { created_at, priority, ...rest } = mapResetMembersFilters(filters);

	return {
		...rest,
		'created_at.from': created_at.from,
		'created_at.to': created_at.to,
		'priority.from': priority.from,
		'priority.to': priority.to,
	};
};

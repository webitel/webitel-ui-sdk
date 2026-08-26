import { useRoute, useRouter } from 'vue-router';

import type { StorageLike } from './PersistedStorage.types.ts';

/*
 every write is a router.replace() built on top of the current query, and the
  query only changes once the navigation resolves – so concurrent writes would
  all start from the same snapshot and drop each other's keys. they are queued
  process-wide: a table store writes several properties at once (a new sort
  makes both `sort` and `fields` emit), and all of them target the same router
 */
let pendingWrite: Promise<unknown> = Promise.resolve();

const enqueueWrite = <T>(write: () => Promise<T>): Promise<T> => {
	const result = pendingWrite.then(write, write);

	pendingWrite = result.catch(() => {});

	return result;
};

export const useRoutePersistedStorage = (): StorageLike => {
	const router = useRouter();
	const route = useRoute();

	const getItem = async (key: string) => {
		return route.query[key];
	};

	const setItem = async (key: string, value: string | string[]) => {
		await enqueueWrite(() =>
			router.replace({
				name: route.name,
				params: route.params,
				hash: route.hash,
				query: {
					...route.query,
					[key]: value,
				},
			}),
		);
	};

	const removeItem = async (key: string) => {
		await enqueueWrite(() => {
			const query = {
				...route.query,
			};
			delete query[key];

			return router.replace({
				name: route.name,
				params: route.params,
				hash: route.hash,
				query,
			});
		});
	};

	return {
		getItem,
		setItem,
		removeItem,
	};
};

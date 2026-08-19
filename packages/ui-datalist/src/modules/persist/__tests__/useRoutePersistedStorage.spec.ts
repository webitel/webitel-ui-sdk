import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import {
	createMemoryHistory,
	createRouter,
	type Router,
	useRoute,
} from 'vue-router';

import type { StorageLike } from '../PersistedStorage.types';
import { useRoutePersistedStorage } from '../useRoutePersistedStorage';

const routes = [
	{
		path: '/',
		name: 'root',
		component: {
			template: '<div />',
		},
	},
	{
		path: '/cases/:id?',
		name: 'cases',
		component: {
			template: '<div />',
		},
	},
];

describe('useRoutePersistedStorage', () => {
	let router: Router;
	let storage: StorageLike;
	let currentQuery: () => Record<string, unknown>;

	beforeEach(async () => {
		router = createRouter({
			history: createMemoryHistory(),
			routes,
		});

		const app = createApp({});
		app.use(router);

		await router.push('/');
		await router.isReady();

		app.runWithContext(() => {
			storage = useRoutePersistedStorage();
			const route = useRoute();
			currentQuery = () => route.query;
		});
	});

	it('reads a value from the route query', async () => {
		await router.push({
			name: 'cases',
			query: {
				page: '3',
			},
		});

		expect(await storage.getItem('page')).toBe('3');
	});

	it('resolves undefined for a missing query param', async () => {
		expect(await storage.getItem('page')).toBeUndefined();
	});

	it('writes a value keeping the rest of the query', async () => {
		await router.push({
			name: 'cases',
			query: {
				filters: '{"name":"test"}',
			},
		});

		await storage.setItem('page', '3');

		expect(currentQuery()).toEqual({
			filters: '{"name":"test"}',
			page: '3',
		});
	});

	it('writes without leaving the current route', async () => {
		await router.push({
			name: 'cases',
			params: {
				id: '42',
			},
			hash: '#tab',
		});

		await storage.setItem('page', '3');

		expect(router.currentRoute.value.name).toBe('cases');
		expect(router.currentRoute.value.params.id).toBe('42');
		expect(router.currentRoute.value.hash).toBe('#tab');
	});

	it('does not add a history entry', async () => {
		await router.push({
			name: 'cases',
		});
		const positionBefore = window.history.length;

		await storage.setItem('page', '3');

		expect(window.history.length).toBe(positionBefore);
	});

	it('keeps every key when writes are issued concurrently', async () => {
		await router.push({
			name: 'cases',
		});

		await Promise.all([
			storage.setItem('page', '3'),
			storage.setItem('sort', '-createdAt'),
			storage.setItem('fields', 'name,subject'),
		]);

		expect(currentQuery()).toEqual({
			page: '3',
			sort: '-createdAt',
			fields: 'name,subject',
		});
	});

	it('removes a value keeping the rest of the query', async () => {
		await router.push({
			name: 'cases',
			query: {
				page: '3',
				size: '20',
			},
		});

		await storage.removeItem('page');

		expect(currentQuery()).toEqual({
			size: '20',
		});
	});
});

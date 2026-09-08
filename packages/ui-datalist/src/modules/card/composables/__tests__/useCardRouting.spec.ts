import { beforeEach, describe, expect, it, vi } from 'vitest';
import { effectScope, nextTick, type Ref, reactive, ref } from 'vue';

import type { CardItemId } from '../../types/CardStore.types';
import { useCardRouting } from '../useCardRouting';

const mocks = vi.hoisted(() => ({
	route: {
		params: {},
	} as {
		params: Record<string, string>;
	},
	replace: vi.fn(),
}));

vi.mock('vue-router', () => ({
	useRoute: () => mocks.route,
	useRouter: () => ({
		replace: mocks.replace,
	}),
}));

/**
 * A nested card lives inside its parent's card page, so the parent can be
 * created underneath it: `route.params.id` goes from `'new'` to a real id while
 * the popup is already mounted. A `parentId` captured as a plain string at
 * setup keeps addressing `'new'`, and every nested request goes to
 * `<entity>/new/<nested>`.
 *
 * [WTEL-10348](https://webitel.atlassian.net/browse/WTEL-10348)
 */
describe('useCardRouting', () => {
	const run = (options: {
		itemId: Ref<CardItemId>;
		routeParamName?: string;
		parentId?: (() => CardItemId) | string;
	}) => {
		const scope = effectScope(true);
		const routing = scope.run(() => useCardRouting(options));

		if (!routing) throw new Error('useCardRouting returned nothing');

		return routing;
	};

	beforeEach(() => {
		mocks.replace.mockReset();
		mocks.replace.mockResolvedValue(undefined);
		mocks.route = reactive({
			params: {},
		});
	});

	it('resolves a getter parent on read instead of capturing it', () => {
		mocks.route.params = {
			id: 'new',
		};

		const { parentId } = run({
			itemId: ref(null),
			routeParamName: 'bucketId',
			parentId: () => mocks.route.params.id,
		});

		expect(parentId.value).toBe('new');

		mocks.route.params = {
			id: '42',
		};

		expect(parentId.value).toBe('42');
	});

	it('keeps accepting a plain string parent', () => {
		const { parentId } = run({
			itemId: ref(null),
			routeParamName: 'bucketId',
			parentId: '42',
		});

		expect(parentId.value).toBe('42');
	});

	it('writes the server id into the route of a newly created nested item', async () => {
		mocks.route.params = {
			id: '42',
			bucketId: 'new',
		};
		const itemId = ref<CardItemId>(null);

		run({
			itemId,
			routeParamName: 'bucketId',
			parentId: () => mocks.route.params.id,
		});

		itemId.value = 7;
		await nextTick();

		expect(mocks.replace).toHaveBeenCalledWith({
			params: {
				id: '42',
				bucketId: 7,
			},
		});
	});

	it('leaves the route alone for a nested item that already had an id', async () => {
		mocks.route.params = {
			id: '42',
			bucketId: '7',
		};
		const itemId = ref<CardItemId>(null);

		run({
			itemId,
			routeParamName: 'bucketId',
			parentId: () => mocks.route.params.id,
		});

		itemId.value = 7;
		await nextTick();

		expect(mocks.replace).not.toHaveBeenCalled();
	});

	it('writes the server id into the route of a top-level card', async () => {
		mocks.route.params = {
			id: 'new',
		};
		const itemId = ref<CardItemId>(null);

		run({
			itemId,
		});

		itemId.value = 42;
		await nextTick();

		expect(mocks.replace).toHaveBeenCalledWith({
			params: {
				id: 42,
			},
		});
	});
});

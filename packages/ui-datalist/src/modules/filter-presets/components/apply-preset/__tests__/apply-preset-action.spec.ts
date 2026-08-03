import { createTestingPinia } from '@pinia/testing';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { defineStore } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

import { createFiltersManager } from '../../../../filters/classes/FiltersManager';
import PresetQueryAPI from '../../../api/PresetQuery';
import ApplyPresetAction from '../apply-preset-action.vue';

vi.mock('../../../api/PresetQuery', () => ({
	default: {
		get: vi.fn(),
		getList: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	},
}));

const SNAPSHOT = '{"createdAt_val":"today"}';
const CACHED_PRESET_ID = 7;
const STORE_ID = 'test/presets';

/*
Only what apply-preset-action reads from the presets store – createTestingPinia
stubs the actions, so none of them need bodies.
 */
const useTestPresetsStore = defineStore(STORE_ID, () => ({
	dataList: ref([]),
	error: ref(null),
	isLoading: ref(false),
	filtersManager: ref(createFiltersManager()),
	presetId: ref<number | null>(null),

	loadDataList: () => {},
	initialize: () => {},
	updateSize: () => {},
	deleteEls: () => {},
	setupPresetPersistence: () => {},
}));

const mountAction = ({
	hasAnyFilters = false,
	presetId = CACHED_PRESET_ID,
} = {}) => {
	const pinia = createTestingPinia({
		initialState: {
			[STORE_ID]: {
				presetId,
			},
		},
	});

	return shallowMount(ApplyPresetAction, {
		props: {
			namespace: 'test',
			presetsStore: useTestPresetsStore(pinia),
			filterConfigs: [],
			hasAnyFilters,
		},
		global: {
			plugins: [
				pinia,
			],
		},
	});
};

describe('ApplyPresetAction', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		vi.mocked(PresetQueryAPI.get).mockResolvedValue({
			id: CACHED_PRESET_ID,
			preset: {
				'filtersManager.toString': SNAPSHOT,
			},
		});
	});

	it('emits "restore" with the cached preset snapshot when no filters are applied', async () => {
		const wrapper = mountAction();
		await flushPromises();

		expect(wrapper.emitted('restore')).toEqual([
			[
				SNAPSHOT,
			],
		]);
	});

	it('does not emit "apply" for a cached preset, so filters are not reset', async () => {
		const wrapper = mountAction();
		await flushPromises();

		expect(wrapper.emitted('apply')).toBeUndefined();
	});

	it('skips restoring the cached preset when filters are already applied', async () => {
		const wrapper = mountAction({
			hasAnyFilters: true,
		});
		await flushPromises();

		expect(PresetQueryAPI.get).not.toHaveBeenCalled();
		expect(wrapper.emitted('restore')).toBeUndefined();
		expect(wrapper.emitted('apply')).toBeUndefined();
	});

	it('does nothing when no preset is cached', async () => {
		const wrapper = mountAction({
			presetId: null,
		});
		await flushPromises();

		expect(PresetQueryAPI.get).not.toHaveBeenCalled();
		expect(wrapper.emitted('restore')).toBeUndefined();
	});
});

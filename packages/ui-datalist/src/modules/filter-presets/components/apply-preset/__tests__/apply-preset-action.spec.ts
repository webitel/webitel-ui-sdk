import { flushPromises, shallowMount } from '@vue/test-utils';
import { createPinia, defineStore, setActivePinia } from 'pinia';
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

/*
Minimal stand-in for createFilterPresetsStore: apply-preset-action only needs
these refs/actions, and this avoids dragging in the whole table store.
 */
const useTestPresetsStore = defineStore('test/presets', () => ({
	dataList: ref([]),
	error: ref(null),
	isLoading: ref(false),
	filtersManager: ref(createFiltersManager()),
	presetId: ref<number | null>(CACHED_PRESET_ID),

	loadDataList: vi.fn(),
	initialize: vi.fn(),
	updateSize: vi.fn(),
	deleteEls: vi.fn(),
	setupPresetPersistence: vi.fn(),
}));

const mountAction = ({ hasAnyFilters = false } = {}) =>
	shallowMount(ApplyPresetAction, {
		props: {
			namespace: 'test',
			presetsStore: useTestPresetsStore(),
			filterConfigs: [],
			hasAnyFilters,
		},
	});

describe('ApplyPresetAction', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		setActivePinia(createPinia());

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
});

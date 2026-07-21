import { ref } from 'vue';
import type { EnginePresetQuery } from 'webitel-sdk';

import { createDatalistStore } from '../../_shared/createDatalistStore';
import { PersistedStorageType } from '../../persist/PersistedStorage.types';
import { usePersistedStorage } from '../../persist/usePersistedStorage';
import { tableStoreBody } from '../../table/createTableStore.store';
import type { PatchableStoreFactory } from '../../types/createDatalistStore.types';
import PresetQueryAPI from '../api/PresetQuery';
import { headers } from './headers/headers';

const presetsTableConfig = {
	/* PresetQueryAPI's add/update take preset-specific params, so only the
	   ApiModule-conforming methods the table store actually calls go in */
	apiModule: {
		getList: PresetQueryAPI.getList,
		get: PresetQueryAPI.get,
		delete: PresetQueryAPI.delete,
	},
	headers,
	disablePersistence: true as const,
};

export const filterPresetsStoreBody = (namespace = 'presets') => {
	const presetsNamespace = namespace.endsWith('presets')
		? namespace
		: `${namespace}/presets`;

	const presetId = ref(null);

	const setupPresetPersistence = async () => {
		const { restore: restorePreset, reset } = usePersistedStorage({
			name: 'preset',
			value: presetId,
			storages: [
				PersistedStorageType.LocalStorage,
			],
			storagePath: presetsNamespace,
			onStore: (save, { name }) => {
				const value = presetId.value;
				if (!value) {
					return reset();
				}
				return save({
					name,
					value,
				});
			},
			onRestore: async (restore, name) => {
				const value = await restore(name);
				presetId.value = Number(value);
			},
		});
		await restorePreset();
	};

	const tableStore = tableStoreBody<EnginePresetQuery>(
		presetsNamespace,
		presetsTableConfig,
	);

	const resetPreset = () => {
		presetId.value = null;
	};

	return {
		...tableStore,

		presetId,
		setupPresetPersistence,
		resetPreset,
	};
};

export type FilterPresetsStore = ReturnType<typeof filterPresetsStoreBody>;

/**
 * Pinia store factory (via createDatalistStore), same pattern as createTableStore.
 * Previously returned a plain object factory — that broke storeToRefs / props typed
 * as `() => StoreGeneric` and forced app-level asPiniaStoreFactory casts.
 */
export const createFilterPresetsStore = (
	namespace: string,
): PatchableStoreFactory<FilterPresetsStore> => {
	const presetsNamespace = namespace.endsWith('presets')
		? namespace
		: `${namespace}/presets`;

	return createDatalistStore<FilterPresetsStore, EnginePresetQuery>({
		namespace: presetsNamespace,
		config: presetsTableConfig,
		storeBody: () => filterPresetsStoreBody(namespace),
	});
};

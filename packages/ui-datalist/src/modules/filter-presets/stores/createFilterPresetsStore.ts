import { ref } from 'vue';
import { EnginePresetQuery } from 'webitel-sdk';

import { PersistedStorageType } from '../../persist/PersistedStorage.types';
import { usePersistedStorage } from '../../persist/usePersistedStorage';
import { tableStoreBody } from '../../table/createTableStore.store';
import PresetQueryAPI from '../api/PresetQuery';
import { headers } from './headers/headers';

export const filterPresetsStoreBody = (namespace = 'presets') => {
  const presetsNamespace = namespace.endsWith('presets')
    ? namespace
    : `${namespace}/presets`;

  const presetId = ref(null);

  const setupPresetPersistence = async () => {
    const { restore: restorePreset } = usePersistedStorage({
      name: 'preset',
      value: presetId,
      storages: [PersistedStorageType.LocalStorage],
      storagePath: presetsNamespace,
      onStore: (save, { name }) => {
        const value = presetId.value;
        return save({ name, value });
      },
      onRestore: async (restore, name) => {
        const value = await restore(name);
        presetId.value = Number(value);
      },
    });
    await restorePreset();
  };

  const tableStore = tableStoreBody<EnginePresetQuery>(presetsNamespace, {
    apiModule: PresetQueryAPI,
    headers,
    disablePersistence: true,
  });

  return {
    ...tableStore,

    presetId,
    setupPresetPersistence,
  };
};

export const createFilterPresetsStore = (namespace: string) => {
  return () => filterPresetsStoreBody(namespace);
};

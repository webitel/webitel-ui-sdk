import { EnginePresetQuery } from 'webitel-sdk';

import { createTableStore } from '../../table/createTableStore.store.ts';
import PresetQueryAPI from '../api/PresetQuery.ts';
import { headers } from './headers/headers.ts';

export const createFilterPresetsStore = (namespace = 'presets') => {
  const presetsNamespace = namespace.endsWith('presets')
    ? namespace
    : `${namespace}/presets`;

  return createTableStore<EnginePresetQuery>(presetsNamespace, {
    apiModule: PresetQueryAPI,
    headers,
    disablePersistence: true,
  });
};

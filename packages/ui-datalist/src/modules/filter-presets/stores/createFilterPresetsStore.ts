import { EnginePresetQuery } from 'webitel-sdk';

import { createTableStore } from '../../table/createTableStore';
import PresetQueryAPI from '../api/PresetQuery';
import { headers } from './headers/headers';

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

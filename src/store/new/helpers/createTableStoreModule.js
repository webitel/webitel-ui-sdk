import tableStoreModule from '../modules/tableStoreModule/tableStoreModule.js';
import { createBaseStoreModule } from './createBaseStoreModule.js';

export const createTableStoreModule = (modules = []) => {
  const modulesArr = Array.isArray(modules) ? modules : [modules];

  return createBaseStoreModule([tableStoreModule(), ...modulesArr]);
};

import tableStoreModule from '../modules/tableStoreModule/tableStoreModule';
import { createBaseStoreModule } from './createBaseStoreModule';

export const createTableStoreModule = (modules = []) => {
  const modulesArr = Array.isArray(modules) ? modules : [modules];

  return createBaseStoreModule([tableStoreModule(), ...modulesArr]);
};

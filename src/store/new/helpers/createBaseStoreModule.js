import baseStoreModule from '../modules/baseStoreModule/baseStoreModule.js';
import { createStoreModule } from './createStoreModule.js';

export const createBaseStoreModule = (modules = []) => {
  const modulesArr = Array.isArray(modules) ? modules : [modules];

  return createStoreModule([baseStoreModule(), ...modulesArr]);
};

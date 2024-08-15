import apiStoreModule from '../modules/apiStoreModule/apiStoreModule.js';
import { createBaseStoreModule } from './createBaseStoreModule.js';

export const createApiStoreModule = (modules = []) => {
  const modulesArr = Array.isArray(modules) ? modules : [modules];

  return createBaseStoreModule([apiStoreModule(), ...modulesArr]);
};

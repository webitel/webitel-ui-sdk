import cardStoreModule from '../modules/cardStoreModule/cardStoreModule.js';
import { createBaseStoreModule } from './createBaseStoreModule.js';

export const createCardStoreModule = (modules) => {
  const modulesArr = Array.isArray(modules) ? modules : [modules];

  return createBaseStoreModule([cardStoreModule(), ...modulesArr]);
};

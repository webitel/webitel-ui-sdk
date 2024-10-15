import { createBaseStoreModule } from '../../../../../store/new/index.js';
import tableStoreModule
  from '../../../../../store/new/modules/tableStoreModule/tableStoreModule.js';
import objectPermissionsStoreModule
  from '../modules/objectPermissionsStoreModule.js';

export const createObjectPermissionsStoreModule = (modules = []) => {
  const modulesArr = Array.isArray(modules) ? modules : [modules];

  return createBaseStoreModule([
    tableStoreModule(),
    objectPermissionsStoreModule(),
    ...modulesArr,
  ]);
};

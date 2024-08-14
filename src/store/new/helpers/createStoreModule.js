import deepmerge from 'deepmerge';
import isPlainObject from 'lodash/isPlainObject.js';

export const createStoreModule = (modules = []) => {
  const modulesArr = Array.isArray(modules) ? modules : [modules];

  const merged = deepmerge.all(modulesArr, {
    isMergeableObject: isPlainObject, // don't try to merge Maps!
  });
  return merged;
};

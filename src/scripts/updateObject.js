import cloneDeep from 'lodash/cloneDeep.js';
import set from 'lodash/set.js';

const updateObject = ({ obj, path, value }) => set(cloneDeep(obj), path, value);

export default updateObject;

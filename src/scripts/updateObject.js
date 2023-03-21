import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

const updateObject = ({ obj, path, value }) => set(cloneDeep(obj), path, value);

export default updateObject;

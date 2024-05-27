import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

const updateObject = ({ obj, path, value }) => set(cloneDeep(obj), path, value);

export default updateObject;

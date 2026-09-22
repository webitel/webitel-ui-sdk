import { cloneDeep, set } from 'lodash-es';

const updateObject = ({ obj, path, value }) => set(cloneDeep(obj), path, value);

export default updateObject;

import getDefaultInstance from '../../../../api/defaults/getDefaultInstance/getDefaultInstance';
import applyTransform, { notify, snakeToCamel, } from '../../../../api/transformers/index.js';
let instance = getDefaultInstance();
const setInstance = (newInstance) => {
    instance = newInstance;
};
const getSession = async () => {
    const url = '/userinfo';
    try {
        const response = await instance.get(url);
        return applyTransform(response.data, [snakeToCamel()]);
    }
    catch (err) {
        throw applyTransform(err, [notify]);
    }
};
const getUiVisibilityAccess = async () => {
    const url = 'role/metadata/access';
    try {
        const response = await instance.get(url);
        return applyTransform(response.data, [snakeToCamel()]);
    }
    catch (err) {
        throw applyTransform(err, [notify]);
    }
};
const logout = async () => {
    const url = '/logout';
    try {
        return await instance.post(url, {});
    }
    catch (err) {
        throw applyTransform(err, [notify]);
    }
};
export { getSession, getUiVisibilityAccess, logout, setInstance };

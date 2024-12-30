import applyTransform, {
  notify,
  snakeToCamel,
} from '../../../api/transformers/index.js';

const userinfo = (instance) => ({
  async getSession() {
    const url = '/userinfo';
    try {
      const response = await instance.get(url);
      return applyTransform(response.data, [snakeToCamel()]);
    } catch (err) {
      throw applyTransform(err, [notify]);
    }
  },

  async getApplicationsAccess() {
    const url = 'role/metadata/access';
    try {
      const response = await instance.get(url);
      return applyTransform(response.data, [snakeToCamel()]);
    } catch (err) {
      throw applyTransform(err, [notify]);
    }
  },

  async logout() {
    const url = '/logout';

    try {
      return await instance.post(url, {});
    } catch (err) {
      throw applyTransform(err, [notify]);
    }
  },
});

export default userinfo;

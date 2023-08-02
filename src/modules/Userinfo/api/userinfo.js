import applyTransform, {
  notify,
  snakeToCamel,
} from '../../../api/transformers';
import BaseAPIService from './BaseAPIService';

class UserinfoAPI extends BaseAPIService {
  // gets user by token from localstorage
// stores response username in vuex
  async getSession() {
    // const tokenCheck = localStorage.getItem('access-token');
    // if (typeof tokenCheck === 'string') { // if there is no token, localStorage returns object
    const url = '/userinfo';
    try {
      const response = await this._instance.get(url);
      return applyTransform(response.data, [
        snakeToCamel(),
      ]);
    } catch (err) {
      throw applyTransform(err, [
        notify,
      ]);
    }
    // }
  }

  async getApplicationsAccess() {
    const url = 'role/metadata/access';
    try {
      const response = await this._instance.get(url);
      return applyTransform(response.data, [
        snakeToCamel(),
      ]);
    } catch (err) {
      throw applyTransform(err, [
        notify,
      ]);
    }
  }
}

const userinfo = new UserinfoAPI();

export default userinfo;

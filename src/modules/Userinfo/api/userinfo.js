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
      return response;
    } catch (err) {
      throw err;
    }
    // }
  }

  async getApplicationsAccess() {
    const url = 'role/metadata/access';
    try {
      const response = await this._instance.get(url);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

const userinfo = new UserinfoAPI();

export default userinfo;

import BaseAPIService from './BaseAPIService';

class AuthAPI extends BaseAPIService {
  async setToken(token) {
    localStorage.setItem('access-token', token);
    this._instance.defaults.headers['X-Webitel-Access'] = localStorage.getItem('access-token');
  }

  removeToken() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('domain');
    this._instance.defaults.headers['X-Webitel-Access'] = '';
  }

  async logout() {
    const url = '/logout';

    try {
      await this._instance.post(url, {});
      this.removeToken();
    } catch (err) {
      throw err;
    }
  }
}

const auth = new AuthAPI();

export default auth;

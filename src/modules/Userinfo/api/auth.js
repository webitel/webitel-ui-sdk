import BaseAPIService from './BaseAPIService';
import applyTransform, {
  notify,
} from '../../../api/transformers';

class AuthAPI extends BaseAPIService {
  async setToken(token) {
    localStorage.setItem('access-token', token);
  }

  removeToken() {
    localStorage.removeItem('access-token');
  }

  async logout() {
    const url = '/logout';

    try {
      await this._instance.post(url, {});
      this.removeToken();
    } catch (err) {
      throw applyTransform(err, [
        notify,
      ]);
    }
  }
}

const auth = new AuthAPI();

export default auth;

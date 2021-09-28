export default class BaseAPIService {
  _instance = null

  setInstance(instance) {
    this._instance = instance;
  }
}

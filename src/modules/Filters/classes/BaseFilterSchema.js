export default class BaseFilterSchema {
  constructor({
                value = '',
                defaultValue = '',
                restore,
                localStorageKey,
              } = {}) {
    this.value = value;
    this.defaultValue = defaultValue;
    if (restore) this.restore = restore;
    if (localStorageKey) this.localStorageKey = localStorageKey;
  }
}

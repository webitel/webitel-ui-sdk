export default class BaseFilterSchema {
  constructor({ value = '', defaultValue = '' } = {}) {
    this.value = value;
    this.defaultValue = defaultValue;
  }
}

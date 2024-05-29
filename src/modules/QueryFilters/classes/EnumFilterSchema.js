import BaseFilterSchema from './BaseFilterSchema.js';

export default class EnumFilterSchema extends BaseFilterSchema {
  constructor(params = {}) {
    const {
      value = [],
      defaultValue = [],
    } = params;
    super({ value, defaultValue });
    const {
      locale = { label: 'filter' },
      storedProp = 'value',
      multiple = true,
      closeOnSelect = false,
      options = [],
    } = params;
    this.locale = locale;
    this.storedProp = storedProp;
    this.multiple = multiple;
    this.closeOnSelect = closeOnSelect;
    this.options = options;
  }
}

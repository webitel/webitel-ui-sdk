import BaseFilterSchema from './BaseFilterSchema';

export default class ApiFilterSchema extends BaseFilterSchema {
  constructor(params = {}) {
    const {
      value = [],
      defaultValue = [],
    } = params;
    super({ value, defaultValue });
    const {
      locale = { label: 'filter' },
      storedProp = 'id',
      multiple = true,
      closeOnSelect = false,
      API,
    } = params;
    this.locale = locale;
    this.storedProp = storedProp;
    this.multiple = multiple;
    this.closeOnSelect = closeOnSelect;
    this.API = API;
  }

  search(params) {
    return this.API(params);
  }

  fetchSelected(idsList) {
    const params = { size: idsList.length, id: idsList };
    return this.API(params);
  }
}

export default class BaseFilterSchema {
  constructor({
                name,
                value,
                get,
                set,
                restore,
                ...rest
              } = {}) {
    if (!name) throw new Error('Filter name is required');
    if (!value) throw new Error(`Filter value is required: ${name}`);

    if (!get) throw new Error(`Filter getter is required: ${name}`);
    if (!set) throw new Error(`Filter setter is required: ${name}`);
    if (!restore) throw new Error(`Filter restore is required: ${name}`);

    Object.assign(this, {
      name,
      value,
      get,
      set,
      restore,
    }, rest);
  }
}

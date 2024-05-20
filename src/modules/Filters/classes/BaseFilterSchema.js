import { valueSetter, querySetter, localStorageSetter } from '../scripts/setters';
import { queryRestore, localStorageRestore } from '../scripts/restores';
import { valueGetter, queryGetter, localStorageGetter } from '../scripts/getters';

const convertGetterArray = (context) => (router) => (getters) => {
  const availableGetters = ['value', 'query', 'localStorage'];

  getters.forEach((getter) => {
    if (!availableGetters.includes(getter)) throw new Error(`Unknown getter: ${getter}`);
  });

  const getter = () => {
    if (getters.includes('value')) {
      const value = valueGetter(context)();
      if (value) return value;
    }
    if (getters.includes('query')) {
      const value = queryGetter(context)(router)();
      if (value) return value;
    }
    if (getters.includes('localStorage')) {
      const value = localStorageGetter(context)();
      if (value) return value;
    }

    console.error(`No value found for ${context.name} filter!`);

    return undefined;
  };

  return getter;
};

const convertSetterArray = (context) => (router) => (setters) => {
  const availableSetters = ['value', 'query', 'localStorage'];
  setters.forEach((setter) => {
    if (!availableSetters.includes(setter)) throw new Error(`Unknown setter: ${setter}`);
  });

  const setter = async (value) => {
    if (setters.includes('value')) valueSetter(context)(value);
    if (setters.includes('query')) await querySetter(context)(router)(value);
    if (setters.includes('localStorage')) localStorageSetter(context)(value);

    return context;
  };

  return setter;
};

const convertRestoreArray = (context) => (router) => (restores) => {
  const availableRestores = ['query', 'localStorage'];

  restores.forEach((restore) => {
    if (!availableRestores.includes(restore)) throw new Error(`Unknown restore: ${restore}`);
  });

  const restore = () => {
    if (restores.includes('query')) {
      const restoredValue = queryRestore(context)(router)();
      if (restoredValue) return restoredValue;
    }

    if (restores.includes('localStorage')) {
      const restoredValue = localStorageRestore(context)();
      if (restoredValue) return restoredValue;
    }
  };

  return restore;
};

export default class BaseFilterSchema {
  constructor({
                name,
                value,
                get,
                set,
                restore,
                router, // is required for query get/set, if getters/setters are passed as strings
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

    this.setupGetters(get, { router });
    this.setupSetters(set, { router });
    this.setupRestores(restore, { router });

    return this;
  }

  setupGetters(getters, { router }) {
    let getter;

    if (Array.isArray(getters)) {
      getter = convertGetterArray(this)(router)(getters);
    } else if (typeof getters === 'function') {
      getter = getters(this);
    } else {
      throw new Error('Getter should be a function or an array of available getters');
    }

    this.get = getter;
  }

  setupSetters(setters, { router }) {
    let setter;

    if (Array.isArray(setters)) {
      setter = convertSetterArray(this)(router)(setters);
    } else if (typeof setters === 'function') {
      setter = setters(this);
    } else {
      throw new Error('Setter should be a function or an array of available setters');
    }

    this.set = setter;
  }

  setupRestores(restores, { router }) {
    let restore;

    if (Array.isArray(restores)) {
     restore = convertRestoreArray(this)(router)(restores);
    } else if (typeof restores === 'function') {
      restore = restores(this);
    } else {
      throw new Error('Restore should be a function or an array of available restores');
    }

    this.restore = restore;
  }
}

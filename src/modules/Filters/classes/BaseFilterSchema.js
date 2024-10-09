import {
  localStorageGetter,
  queryGetter,
  valueGetter,
} from '../scripts/getters/index.js';
import {
  localStorageRestore,
  queryRestore,
} from '../scripts/restores/index.js';
import {
  localStorageSetter,
  querySetter,
  valueSetter,
} from '../scripts/setters/index.js';

const convertGetterArray = (context) => (getters) => {
  const availableGetters = ['value', 'query', 'localStorage'];

  getters.forEach((getter) => {
    if (!availableGetters.includes(getter)) throw new Error(`Unknown getter: ${getter}`);
  });

  const getter = ({ router }) => {
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

    // console.info(`No value found for ${context.name} filter!`);

    return null;
  };

  return getter;
};

const convertSetterArray = (context) => (setters) => {
  const availableSetters = ['value', 'query', 'localStorage'];
  setters.forEach((setter) => {
    if (!availableSetters.includes(setter)) throw new Error(`Unknown setter: ${setter}`);
  });

  const setter = async (value, { router }) => {
    if (setters.includes('value')) valueSetter(context)(value);
    if (setters.includes('query')) await querySetter(context)(router)(value);
    if (setters.includes('localStorage')) localStorageSetter(context)(value);

    return context;
  };

  return setter;
};

const convertRestoreArray = (context) => (restores) => {
  const availableRestores = ['query', 'localStorage'];

  restores.forEach((restore) => {
    if (!availableRestores.includes(restore)) throw new Error(`Unknown restore: ${restore}`);
  });

  const restore = ({ router }) => {
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
    value = '',
    defaultValue = '',
    get = ['value', 'query'],
    set = ['value', 'query'],
    restore = ['query'],
    multiple = false,
    ...rest
  } = {}) {
    if (!name) throw new Error('Filter name is required');

    Object.assign(
      this,
      {
        name,
        value,
        multiple,
        defaultValue: defaultValue || value,
      },
      rest,
    );

    this.setupGetters(get);
    this.setupSetters(set);
    this.setupRestores(restore);
  }

  setupGetters(getters) {
    let getter;

    if (Array.isArray(getters)) {
      if (getters.includes('query')) this.requireRouter = true;

      getter = convertGetterArray(this)(getters);
    } else if (typeof getters === 'function') {
      getter = getters(this);
    } else {
      throw new Error('Getter should be a function or an array of available getters');
    }

    this.get = getter;
  }

  setupSetters(setters) {
    let setter;

    if (Array.isArray(setters)) {
      if (setters.includes('query')) this.requireRouter = true;

      setter = convertSetterArray(this)(setters);
    } else if (typeof setters === 'function') {
      setter = setters(this);
    } else {
      throw new Error('Setter should be a function or an array of available setters');
    }

    this.set = setter;
  }

  setupRestores(restores) {
    let restore;

    if (Array.isArray(restores)) {
      if (restores.includes('query')) this.requireRouter = true;

      restore = convertRestoreArray(this)(restores);
    } else if (typeof restores === 'function') {
      restore = restores(this);
    } else {
      throw new Error('Restore should be a function or an array of available restores');
    }

    this.restore = restore;
  }
}

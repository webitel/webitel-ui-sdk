import { valueSetter, querySetter, localStorageSetter } from '../scripts/setters';
import { queryRestore, localStorageRestore } from '../scripts/restores';
import { valueGetter, queryGetter, localStorageGetter } from '../scripts/getters';

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
    const availableGetters = ['value', 'query', 'localStorage'];

    let getter;

    if (Array.isArray(getters)) {
      getters.forEach((getter) => {
        if (!availableGetters.includes(getter)) throw new Error(`Unknown getter: ${getter}`);
      });

      getter = () => {
        if (getters.includes('value')) {
          const value = valueGetter(this)();
          if (value) return value;
        }
        if (getters.includes('query')) {
          const value = queryGetter(this)(router)();
          if (value) return value;
        }
        if (getters.includes('localStorage')) {
          const value = localStorageGetter(this)();
          if (value) return value;
        }

        console.error(`No value found for ${this.name} filter!`);

        return undefined;
      };
    } else if (typeof getters === 'function') {
      getter = getters;
    } else {
      throw new Error('Getter should be a function or an array of available getters');
    }

    this.get = getter;
  }

  setupSetters(setters, { router }) {
    const availableSetters = ['value', 'query', 'localStorage'];

    let setter;

    if (Array.isArray(setters)) {
      setters.forEach((setter) => {
        if (!availableSetters.includes(setter)) throw new Error(`Unknown setter: ${setter}`);
      });

      setter = async (value) => {
        if (setters.includes('value')) valueSetter(this)(value);
        if (setters.includes('query')) await querySetter(this)(router)(value);
        if (setters.includes('localStorage')) localStorageSetter(this)(value);

        return this;
      };
    } else if (typeof setters === 'function') {
      setter = setters;
    } else {
      throw new Error('Setter should be a function or an array of available setters');
    }

    this.set = setter;
  }

  setupRestores(restores, { router }) {
    const availableRestores = ['query', 'localStorage'];

    let restore;

    if (Array.isArray(restores)) {
      restores.forEach((restore) => {
        if (!availableRestores.includes(restore)) throw new Error(`Unknown restore: ${restore}`);
      });

      restore = () => {
        if (restores.includes('query')) {
          const restoredValue = queryRestore(this)(router)();
          if (restoredValue) return restoredValue;
        }

        if (restores.includes('localStorage')) {
          const restoredValue = localStorageRestore(this)();
          if (restoredValue) return restoredValue;
        }
      };
    } else if (typeof restores === 'function') {
      restore = restores;
    } else {
      throw new Error('Restore should be a function or an array of available restores');
    }

    this.restore = restore;
  }
}

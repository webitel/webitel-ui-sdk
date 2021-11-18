export const snakeToCamel = (str) => str.replace(
  /([a-z])([_])([a-z])/g,
  (group, p1, p2, p3) => [p1, p3.toUpperCase()].join(''),
);

export const camelToSnake = (str) => str.replace(
  /([a-z])([A-Z])/g,
  (group, p1, p2) => [p1, '_', p2.toLowerCase()].join(''),
);

export const kebabToCamel = (str) => str.replace(
  /([-_][a-z])/g,
  (group) => group.toUpperCase()
    .replace('-', ''),
);

export const camelToKebab = (str) => str.replace(
  /([A-Z])/g,
  (group) => group.toLowerCase()
    .replace('', '-'),
);

export const objSnakeToCamel = (obj, skipKeys = []) => {
  if (!obj) return obj;
  const newObj = {};
  if (Array.isArray(obj)) {
    return obj.map((value) => {
      if (typeof value === 'object') {
        return objSnakeToCamel(value, skipKeys);
      } if (typeof value === 'string') return snakeToCamel(value);
      return value; // number
    });
  }
  Object.keys(obj)
    .forEach((oldKey) => {
      if (skipKeys.includes(oldKey)) {
        newObj[oldKey] = obj[oldKey];
      } else {
        const newKey = snakeToCamel(oldKey);
        let value = obj[oldKey];
        if (Array.isArray(value) || (value !== null && value.constructor === Object)) {
          value = objSnakeToCamel(value, skipKeys);
        }
        newObj[newKey] = value;
      }
    });

  return newObj;
};

export const objCamelToSnake = (obj, skipKeys = []) => {
  if (!obj) return obj;
  const newObj = {};
  if (Array.isArray(obj)) {
    return obj.map((value) => {
      if (typeof value === 'object') {
        return objCamelToSnake(value, skipKeys);
      } if (typeof value === 'string') return camelToSnake(value);
      return value; // number
    });
  }
  Object.keys(obj)
    .forEach((oldKey) => {
      if (skipKeys.includes(oldKey)) {
        newObj[oldKey] = obj[oldKey];
      } else {
        const newKey = camelToSnake(oldKey);
        let value = obj[oldKey];
        if (Array.isArray(value) || (value !== null && value.constructor === Object)) {
          value = objCamelToSnake(value, skipKeys);
        }
        newObj[newKey] = value;
      }
    });

  return newObj;
};

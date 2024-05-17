import changeRouteQuery from '../changeRouteQuery';

const isObject = (value) => typeof value === 'object' &&
  !Array.isArray(value) && value !== null;

const handlePrimitive = ({ value }) => value;

const handleObject = ({ value, storedProp }) => value[storedProp];

const handleArray = ({ value, storedProp }) => {
  if (!value.length) return [];

  if (isObject(value[0])) {
    value.map((item) => item[storedProp]);
  } else {
    return value;
  }
};

function querySetter(router) {
  return function() {
    const { value: rawValue, name: filterQuery, storedProp } = this;

    let value = '';

    if (Array.isArray(rawValue)) {
      value = handleArray({ value: rawValue, storedProp });
    } else if (isObject(rawValue)) {
      value = handleObject({ value: rawValue, storedProp });
    } else {
      value = handlePrimitive({ value });
    }

    return changeRouteQuery(router)({
      filterQuery,
      value,
    });
  }
}

export default querySetter;

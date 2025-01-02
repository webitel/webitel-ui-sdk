import changeRouteQuery from '../utils/changeRouteQuery.js';

const isObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null;

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

const querySetter =
  (context) =>
  (router) =>
  async (rawValue = context.value) => {
    const { name: filterQuery, storedProp } = context;

    let value = '';

    if (Array.isArray(rawValue)) {
      value = handleArray({ value: rawValue, storedProp });
    } else if (isObject(rawValue)) {
      value = handleObject({ value: rawValue, storedProp });
    } else {
      value = handlePrimitive({ value: rawValue });
    }

    await changeRouteQuery(router)({
      filterQuery,
      value,
    });

    return context;
  };

export default querySetter;

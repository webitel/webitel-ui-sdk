const sanitizeTransformer = (fieldsToSend) => (item) => {
  return Object.keys(item).reduce((sanitizedItem, key) => {
    if (fieldsToSend.indexOf(key) === -1) return sanitizedItem;

    return {
      ...sanitizedItem,
      [key]: item[key],
    };
  }, {});
};

export default sanitizeTransformer;

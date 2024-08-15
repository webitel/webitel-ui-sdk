const applyTransform = (target, transformers, { debug = false, withContext = null } = {}) => {
  return transformers.reduce((result, transformer, index) => {
    if (debug) console.info(`applyTransform debug on step ${index}`, result);

    if (withContext) {
      return transformer(result, withContext);
    }

    return transformer(result);
  }, target);
};

export default applyTransform;

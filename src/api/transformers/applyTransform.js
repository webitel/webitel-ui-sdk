const applyTransform = (target, transformers, { debug = false } = {}) => {
  return transformers.reduce((result, transformer, index) => {
    if (debug) console.info(`applyTransform debug on step ${index}`, result);
    return transformer(result);
  }, target);
};

export default applyTransform;

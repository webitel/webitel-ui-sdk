import merge from 'deepmerge';

const mergeEachTransformer = (...args) => (main) => main.map((item) => merge.all([
  ...args,
  item,
]));

export default mergeEachTransformer;

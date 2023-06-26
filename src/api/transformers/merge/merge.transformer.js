import merge from 'deepmerge';

const mergeTransformer = (...args) => (main) => merge.all([...args, main]);

export default mergeTransformer;

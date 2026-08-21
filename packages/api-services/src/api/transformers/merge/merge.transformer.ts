import merge from 'deepmerge';

const mergeTransformer =
	(...args: object[]) =>
	(main: object) =>
		merge.all([
			...args,
			main,
		]);

export default mergeTransformer;

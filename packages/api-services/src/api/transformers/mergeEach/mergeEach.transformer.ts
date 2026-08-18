import merge from 'deepmerge';

const mergeEachTransformer =
	(...args: object[]) =>
	(main: object[]) =>
		main.map((item) =>
			merge.all([
				...args,
				item,
			]),
		);

export default mergeEachTransformer;

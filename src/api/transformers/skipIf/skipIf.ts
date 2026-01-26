export const skipIf =
	(
		transformer: (...payload: unknown[]) => unknown,
		ifFn: boolean | ((...payload: unknown[]) => boolean),
	) =>
	(payload: unknown) => {
		if (typeof ifFn === 'function' ? ifFn(payload) : ifFn) {
			return payload;
		}
		return transformer(payload);
	};

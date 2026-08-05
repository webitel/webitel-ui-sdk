/**
 * Renames camelCase caller params to the wire names the gateway matches.
 *
 * Both spellings come from the same OpenAPI document: src/gen carries the
 * camelised pass that apps consume, src/gen-wire the raw one. So the mapping is
 * derived, not guessed — pass the generated field list (see
 * getShallowFieldsToSendFromZodSchema on a src/gen-wire zod schema) and every
 * key in it gets its camel spelling collapsed the same way openapi-format
 * collapses it: `uploaded_at.from` <- `uploadedAtFrom`, `via.id` <- `viaId`,
 * `group[string]` <- `groupString`.
 *
 * Run it before sanitize(), which then drops whatever did not map.
 */
const toCamelSpelling = (wireKey: string) =>
	wireKey
		.split(/[^a-zA-Z0-9]+/)
		.filter(Boolean)
		.map((part, index) =>
			index === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`,
		)
		.join('');

const toWireParamsTransformer =
	(wireFields: string[]) => (params: Record<string, unknown>) => {
		if (!params) return params;

		const wireParams: Record<string, unknown> = {
			...params,
		};

		for (const wireKey of wireFields) {
			const camelKey = toCamelSpelling(wireKey);
			if (camelKey === wireKey) continue;
			if (!(camelKey in wireParams)) continue;

			wireParams[wireKey] = wireParams[camelKey];
			delete wireParams[camelKey];
		}

		return wireParams;
	};

export default toWireParamsTransformer;

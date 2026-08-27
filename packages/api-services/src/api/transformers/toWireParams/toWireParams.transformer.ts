/**
 * Renames caller params to the wire names the gateway matches, e.g.
 * `uploadedAtFrom` -> `uploaded_at.from`, `viaId` -> `via.id`.
 *
 * Both spellings come from the same OpenAPI document, so they differ only in
 * separators and letter case — matching on that is exact, where deriving the
 * camel spelling is not (`tls.PEM`, `input.userID.id`, `sha256sum`, `@type`).
 *
 * Takes a src/gen-wire field list; run it before sanitize().
 */
const normalize = (key: string) =>
	key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

const toWireParamsTransformer =
	(wireFields: string[]) => (params: Record<string, unknown>) => {
		if (!params) return params;

		const wireKeyByNormalized = new Map(
			wireFields.map((field) => [
				normalize(field),
				field,
			]),
		);

		return Object.entries(params).reduce<Record<string, unknown>>(
			(wireParams, [key, value]) => {
				wireParams[wireKeyByNormalized.get(normalize(key)) ?? key] = value;
				return wireParams;
			},
			{},
		);
	};

export default toWireParamsTransformer;

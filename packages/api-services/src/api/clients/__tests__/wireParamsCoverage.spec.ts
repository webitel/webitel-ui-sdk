import { describe, expect, it } from 'vitest';

/**
 * The companion to `wireParams.spec.ts`, which pins eleven clients by hand.
 * This one sweeps every `*API` the barrel exports, calls its `getList`, and
 * checks the params object that reaches the generated method against that
 * endpoint's generated zod schema under `.strict()`.
 *
 * Same reasoning as the hand-written spec: these clients pass an object now,
 * so the keys are the wire names, and tsc only checks the ones written as
 * literals. The point of doing it by sweep as well is that a client added
 * later is covered without anyone remembering to add a case.
 *
 * `.strict()` is what makes it work — a plain `safeParse` strips unknown keys
 * and reports success, so it would miss the exact bug this guards against.
 */
const captured: {
	method: string;
	args: unknown[];
}[] = [];

vi.mock('../../../gen-wire', async (importOriginal) => {
	const actual = await importOriginal<Record<string, unknown>>();

	const recorder = new Proxy(
		{},
		{
			get:
				(_target, method: string) =>
				(...args: unknown[]) => {
					captured.push({
						method,
						args,
					});
					return Promise.resolve({
						data: {},
					});
				},
		},
	);

	const mocked: Record<string, unknown> = {
		...actual,
	};
	for (const key of Object.keys(actual)) {
		if (typeof actual[key] === 'function' && /^get[A-Z]/.test(key)) {
			mocked[key] = () => recorder;
		}
	}
	return mocked;
});

const clients = await import('../index');
const gw = await import('../../../gen-wire');

/** What a datalist store sends: camelCase keys and a `search` term. */
const listParams = {
	page: 2,
	size: 25,
	search: 'acme',
	sort: '+name',
	fields: [
		'id',
		'name',
	],
	// harmless on flat clients, required by the nested ones
	parentId: '1',
};

const schemaFor = (method: string) => {
	const name = `${method[0].toUpperCase()}${method.slice(1)}QueryParams`;
	const schema = (gw as Record<string, unknown>)[name];
	return schema && typeof schema === 'object' && 'strict' in schema
		? (schema as {
				strict: () => {
					safeParse: (v: unknown) => {
						success: boolean;
						error?: {
							issues: {
								code: string;
								keys?: string[];
							}[];
						};
					};
				};
			})
		: undefined;
};

type ListClient = {
	getList: (params: unknown) => Promise<unknown>;
};

/**
 * `CallHistoryAPI.getList` is a deliberate thin passthrough: it forwards the
 * caller's object to the generated method untouched, so callers hand it wire
 * params directly (see `HistoryAPIRepository` in cc-workspaces, its only
 * caller). Feeding it the datalist store's shape would only prove that the
 * store's shape is not the wire's.
 */
const passthrough = new Set([
	'CallHistoryAPI',
]);

/**
 * Supplied by this sweep so nested clients have a parent to hang off; a client
 * consumes it rather than forwarding it, so it is not a wire key.
 */
const suppliedByTest = new Set([
	'parentId',
]);

/**
 * These endpoints declare `sort` as repeated (`string[]`), and the datalist
 * store sends the single string every other endpoint takes. `contacts.ts`
 * already wraps it — `sort: searchParams.sort ? [searchParams.sort] : ['+name']`
 * — so the shape does matter somewhere; whether the gateway coerces a bare
 * string for the rest is unconfirmed against a live backend.
 *
 * Listed rather than filtered out, so the set shrinks as clients are fixed and
 * nothing new hides behind it.
 */
const knownSortShape = new Set([
	'catalogGetDialogs',
	'listConditions',
	'listDynamicGroups',
	'listEmails',
	'listGroups',
	'listIMClients',
	'listPhones',
	'listVariables',
	'searchData',
	'searchOAuthService',
	'searchType',
	'searchTypes',
]);

const listables = Object.entries(clients)
	.filter(
		([name, api]) =>
			/API$/.test(name) &&
			!passthrough.has(name) &&
			api &&
			typeof (api as ListClient).getList === 'function',
	)
	.map(
		([name, api]) =>
			[
				name,
				api as ListClient,
			] as const,
	);

describe('every listable client sends declared wire params', () => {
	it('found clients to sweep', () => {
		expect(listables.length).toBeGreaterThan(40);
	});

	it.each(listables)('%s.getList', async (_name, api) => {
		// validated in full: unknown keys *and* value types
		captured.length = 0;

		try {
			await api.getList(listParams);
		} catch {
			// a client may reject on the empty mock response; the params it
			// already sent are still what we came to inspect
		}

		const unknownKeys = captured.flatMap(({ method, args }) => {
			const schema = schemaFor(method);
			if (!schema) return [];

			const params = args.find(
				(arg) => arg && typeof arg === 'object' && !Array.isArray(arg),
			);
			if (!params) return [];

			const result = schema.strict().safeParse(params);
			return result.success
				? []
				: (result.error?.issues ?? []).flatMap((issue) => {
						if (issue.code === 'unrecognized_keys') {
							return (issue.keys ?? [])
								.filter((key) => !suppliedByTest.has(key))
								.map((key) => `${method}.${key}`);
						}
						const path =
							(
								issue as {
									path?: unknown[];
								}
							).path ?? [];
						if (path[0] === 'sort' && knownSortShape.has(method)) return [];
						return [
							`${method}: ${issue.code} at ${path.join('.') || '(root)'}`,
						];
					});
		});

		expect(unknownKeys).toEqual([]);
	});
});

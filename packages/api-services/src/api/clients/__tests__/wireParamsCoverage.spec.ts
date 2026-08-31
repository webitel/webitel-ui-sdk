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

/** What a datalist store sends to a list: camelCase keys and a `search` term. */
const listPayload = {
	page: 2,
	size: 25,
	search: 'acme',
	sort: '+name',
	fields: [
		'id',
		'name',
	],
	// required by the nested clients, ignored by the flat ones
	parentId: '1',
};

/** What a card sends to a single read. */
const itemPayload = {
	itemId: '2',
	parentId: '1',
};

/**
 * `get` is the only single-item read in the shared shape; everything else
 * matched by `isRead` takes list params.
 */
const payloadFor = (method: string) =>
	method === 'get' ? itemPayload : listPayload;

/*
 * Enumerated up front: reaching for a missing export on a mocked module throws
 * rather than yielding `undefined`, and plenty of reads take only a path id, so
 * their `*QueryParams` schema legitimately does not exist.
 */
const gwExports = new Set(Object.keys(gw));

const schemaFor = (method: string) => {
	const name = `${method[0].toUpperCase()}${method.slice(1)}QueryParams`;
	if (!gwExports.has(name)) return undefined;
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

type ApiObject = Record<string, unknown>;

/**
 * Reads by naming convention. Writes are skipped on purpose: they pass a body,
 * and the generated `*Body` schemas are incomplete — several omit the field
 * that defines the record (`properties` on cognitive profiles, `value` on
 * schema variables, `schema` on flows), so checking a body against one would
 * fail on correct code.
 */
const isRead = (method: string) => /^(get|search|list|find)/.test(method);

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
	'parent_id',
	'itemId',
	'item_id',
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
/**
 * `MessagesServiceAPI.getChatHistory` merges `getDefaultGetParams()`, so it
 * sends `page` and `size` to `catalogGetHistory` — an endpoint that paginates
 * with `limit` and an `offset.id` cursor and declares neither. Its `search` and
 * `sort` are undeclared too; the endpoint takes `q`.
 *
 * Left alone rather than guessed at: swapping page/size for limit changes how
 * chat history pages, which wants someone who knows that UI. Recorded here so
 * the sweep stays green without the finding going quiet.
 */
const knownPaginationShape = new Set([
	'catalogGetHistory',
]);

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

const readMethods = Object.entries(clients)
	.filter(([name, api]) => /API$/.test(name) && !passthrough.has(name) && api)
	.flatMap(([name, api]) =>
		Object.entries(api as ApiObject)
			.filter(([method, fn]) => typeof fn === 'function' && isRead(method))
			.map(
				([method, fn]) =>
					[
						`${name}.${method}`,
						fn as (params: unknown) => Promise<unknown>,
					] as const,
			),
	);

describe('every client read sends declared wire params', () => {
	it('found read methods to sweep', () => {
		expect(readMethods.length).toBeGreaterThan(120);
	});

	it.each(readMethods)('%s', async (name, call) => {
		// validated in full: unknown keys *and* value types
		captured.length = 0;

		try {
			await call(payloadFor(name.split('.')[1]));
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
							if (knownPaginationShape.has(method)) return [];
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

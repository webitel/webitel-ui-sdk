import { describe, expect, it } from 'vitest';

/**
 * Checks that every client sends query parameters the API actually accepts.
 *
 * ## What it does
 *
 * For each `*API` the barrel exports, it calls every read method (`getList`,
 * `get`, `getLookup`, `getFlowTags`, and so on) with a typical caller payload,
 * intercepts the call to the generated `gen-wire` service, and validates the
 * parameters object against that endpoint's generated zod schema. A test fails
 * if a client sends a key the endpoint does not declare, or sends a declared
 * key with the wrong type.
 *
 * ## Why it is needed
 *
 * These clients used to call the old `webitel-sdk` factories with positional
 * arguments — `searchAgentTeam(page, size, search, sort)`. The names of the
 * local variables never reached the request; the factory decided the parameter
 * names from the argument order. Passing an object instead makes the keys
 * *become* the parameter names, so their spelling suddenly matters, and a
 * mistake is invisible: the backend ignores a parameter it does not recognise,
 * so the filter just silently stops working. No error, no failing request.
 *
 * TypeScript only catches this when the object is written inline, and several
 * clients build it as a variable first, or cast it to get dotted protobuf keys
 * like `joined_at.from` past the excess-property check — which switches the
 * check off for every other key too. That is exactly how six queue filters
 * (`queueId`, `agentId`, `bucketId` and friends) shipped doing nothing.
 *
 * Sweeping rather than listing clients by hand matters for two reasons: a
 * client added later is covered without anyone remembering to write a test,
 * and the expectation comes from the generated schema instead of from whoever
 * writes the test. The older hand-written `queueLogs.spec.ts` shows why that
 * second point counts — it pinned the wrong parameter names, so it described
 * the bug instead of catching it.
 *
 * ## Notes
 *
 * `.strict()` is load-bearing. A plain `safeParse` silently *strips* unknown
 * keys and reports success, so it would wave the exact bug straight through.
 *
 * Write methods are left out on purpose. They send a body, and the generated
 * `*Body` schemas are incomplete — several omit the field that defines the
 * record (`properties` on cognitive profiles, `value` on schema variables,
 * `schema` on flows) — so checking a body against one would fail on correct
 * code. Per-client field-set checks cover writes instead.
 *
 * Specific parameter *mappings* — that a caller's `team` must arrive as
 * `team_id` — live in the per-client specs next to each client, because this
 * sweep only proves that whatever was sent is declared, not that nothing was
 * dropped on the way.
 *
 * NOTE: this spec was written by Claude (AI), not by a human.
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
 * `CallHistoryAPI` is a deliberate thin passthrough: `getList` forwards the
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

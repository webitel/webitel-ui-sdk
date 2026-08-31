import { beforeEach, describe, expect, it, vi } from 'vitest';

const listPriorities = vi.fn(() =>
	Promise.resolve({
		data: {},
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getPriorities: () => ({
		listPriorities,
	}),
}));

const { ListPrioritiesQueryParams } = await import('../../../../gen-wire');
const { CasePrioritiesAPI } = await import('../casePriorities');

/**
 * `/cases/priorities` is one of eight endpoints out of 441 whose query params
 * are camelCase — `src/gen` and `src/gen-wire` agree on `notInSla` /
 * `inSlaCond`, where every other service is snake. crm passes both from
 * `opened-sla-condition-popup.vue`, so the client must not convert them.
 *
 * This used to run `camelToSnake()` and undo it in the destructure. That was
 * invisible while the call was positional, where argument names never reached
 * the wire; as object keys, deleting the redundant conversion would have made
 * both filters `undefined` with no type error and no failing test.
 */
describe('CasePrioritiesAPI.getList', () => {
	beforeEach(() => listPriorities.mockClear());

	it('leaves notInSla and inSlaCond in camelCase', async () => {
		await CasePrioritiesAPI.getList({
			page: 1,
			size: 10,
			notInSla: '7',
			inSlaCond: '3',
		});

		const [params] = listPriorities.mock.calls[0];
		expect(params).toMatchObject({
			notInSla: '7',
			inSlaCond: '3',
		});
		expect(ListPrioritiesQueryParams.strict().safeParse(params).success).toBe(
			true,
		);
	});
});

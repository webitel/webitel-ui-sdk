import { describe, expect, it, vi } from 'vitest';

const createLink = vi.fn(() =>
	Promise.resolve({
		data: {},
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getCaseLinks: () => ({
		createLink,
	}),
}));

const { CreateLinkQueryParams } = await import('../../../../gen-wire');
const { CaseLinksAPI } = await import('../caseLinks');

/**
 * [WTEL-10338](https://webitel.atlassian.net/browse/WTEL-10338)
 *
 * `addLink` derived its field allowlist from `CreateLinkParams` — the schema
 * for this endpoint's path param (`case_etag`) — instead of
 * `CreateLinkQueryParams` (`input.url`, `input.name`, ...). `sanitizeToWire`
 * then dropped every field, so the request always went out with no query
 * params and the backend rejected it with "url is required".
 */
describe('CaseLinksAPI.add', () => {
	it('sends url and name as query params', async () => {
		await CaseLinksAPI.add({
			parentId: '1354',
			input: {
				url: 'https://example.com',
				name: 'Example link',
			},
		});

		const [, params] = createLink.mock.calls[0];
		expect(params).toMatchObject({
			'input.url': 'https://example.com',
			'input.name': 'Example link',
		});
		expect(CreateLinkQueryParams.strict().safeParse(params).success).toBe(true);
	});
});

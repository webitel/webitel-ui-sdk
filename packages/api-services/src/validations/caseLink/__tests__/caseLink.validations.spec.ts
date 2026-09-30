import { describe, expect, it } from 'vitest';

import { caseLinkSchema } from '../caseLink.validations';

const getIssues = (url: string) =>
	caseLinkSchema.safeParse({
		url,
	}).error?.issues ?? [];

describe('caseLinkSchema', () => {
	it.each([
		'https://webitel.com',
		'http://webitel.com/path?query=1',
		'ftp://files.webitel.com',
	])('accepts %s', (url) => {
		expect(getIssues(url)).toEqual([]);
	});

	it('requires a url', () => {
		const issues = getIssues('');

		expect(issues).toHaveLength(1);
		expect(issues[0].code).toBe('too_small');
		expect(issues[0].path).toEqual([
			'url',
		]);
	});

	it.each([
		'webitel',
		'webitel.com',
		'mailto:support@webitel.com',
		'javascript:alert(1)',
	])('rejects %s as not a url', (url) => {
		const issues = getIssues(url);

		expect(issues).toHaveLength(1);
		expect(issues[0].code).toBe('custom');
		expect(issues[0].params).toEqual({
			i18nKey: 'url',
		});
	});

	it('keeps the link text optional', () => {
		expect(
			caseLinkSchema.safeParse({
				url: 'https://webitel.com',
				name: 'Webitel',
			}).success,
		).toBe(true);
	});
});

import type { AxiosAdapter, InternalAxiosRequestConfig } from 'axios';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import axios from '../../../axios/genClient';

import { CaseLinksAPI } from '../caseLinks';

const captured: InternalAxiosRequestConfig[] = [];
let originalAdapter: AxiosAdapter | undefined;

beforeEach(() => {
	captured.length = 0;
	originalAdapter = axios.defaults.adapter as AxiosAdapter | undefined;
	axios.defaults.adapter = (config) => {
		captured.push(config);
		return Promise.resolve({
			data: {},
			status: 200,
			statusText: 'OK',
			headers: {},
			config,
		});
	};
});

afterEach(() => {
	axios.defaults.adapter = originalAdapter;
});

const sentParams = () => captured[0].params as Record<string, unknown>;
const sentQuery = () =>
	axios.getUri({
		url: captured[0].url,
		params: captured[0].params,
	});

describe('CaseLinksAPI.add', () => {
	// [WTEL-10338] the link travels as query params under protobuf dotted keys
	it('sends url and name under their dotted wire names', async () => {
		await CaseLinksAPI.add({
			parentId: '1353',
			input: {
				url: 'https://example.com',
				name: 'Example',
			},
		});

		expect(captured[0].method).toBe('post');
		expect(captured[0].url).toBe('/cases/1353/links');
		expect(sentParams()).toEqual({
			'input.url': 'https://example.com',
			'input.name': 'Example',
		});
		expect(sentQuery()).toContain('input.url=https');
		expect(sentQuery()).toContain('input.name=Example');
	});
});

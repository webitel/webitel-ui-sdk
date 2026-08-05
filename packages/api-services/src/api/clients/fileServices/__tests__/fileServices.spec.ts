import axios from '@aliasedDeps/api-services/axios';
import type { AxiosAdapter, InternalAxiosRequestConfig } from 'axios';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { FileServicesAPI } from '../fileServices';

/*
  Request-level tests: the generated client is typed against src/gen-wire, so
  these assert the literal names that leave the process. camelCase spellings
  reaching the gateway are silently ignored, which no type check can catch.
*/
const captured: InternalAxiosRequestConfig[] = [];
let originalAdapter: AxiosAdapter | undefined;

beforeEach(() => {
	captured.length = 0;
	originalAdapter = axios.defaults.adapter as AxiosAdapter | undefined;
	axios.defaults.adapter = (config) => {
		captured.push(config);
		return Promise.resolve({
			data: {
				items: [],
				next: false,
			},
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

describe('FileServicesAPI.getList', () => {
	it('sends range filters under their dotted wire names', async () => {
		await FileServicesAPI.getList({
			page: 2,
			size: 20,
			uploadedAtFrom: '1700000000000',
			uploadedAtTo: '1700000009999',
			retentionUntilFrom: '1700000000000',
			retentionUntilTo: '1700000009999',
		});

		expect(sentParams()).toMatchObject({
			page: 2,
			size: 20,
			'uploaded_at.from': '1700000000000',
			'uploaded_at.to': '1700000009999',
			'retention_until.from': '1700000000000',
			'retention_until.to': '1700000009999',
		});
		expect(sentQuery()).toContain('uploaded_at.from=1700000000000');
		expect(sentQuery()).toContain('retention_until.to=1700000009999');
	});

	it('does not leak the flat spellings the gateway ignores', async () => {
		await FileServicesAPI.getList({
			uploadedAtFrom: '1700000000000',
		});

		const keys = Object.keys(sentParams());
		expect(keys).not.toContain('uploadedAtFrom');
		expect(keys).not.toContain('uploaded_at_from');
		expect(keys).not.toContain('uploadedAt.from');
	});

	it('snake_cases flat params and drops unknown ones', async () => {
		await FileServicesAPI.getList({
			uploadedBy: [
				'5',
			],
			referenceId: [
				'7',
			],
			search: 'contract',
		});

		expect(sentParams()).toMatchObject({
			uploaded_by: [
				'5',
			],
			reference_id: [
				'7',
			],
			q: 'contract',
		});
		expect(Object.keys(sentParams())).not.toContain('search');
	});
});

describe('FileServicesAPI.getScreenRecordingsByUser', () => {
	it('keeps the dotted range filters and prepends id to fields', async () => {
		await FileServicesAPI.getScreenRecordingsByUser({
			userId: 42,
			uploadedAtFrom: '1700000000000',
			fields: [
				'name',
			],
		});

		expect(captured[0].url).toBe('/storage/users/42');
		expect(sentParams()).toMatchObject({
			'uploaded_at.from': '1700000000000',
			fields: [
				'id',
				'name',
			],
		});
	});
});

describe('FileServicesAPI.getListByCall', () => {
	it('sends the dotted range filters for the by-call endpoint too', async () => {
		await FileServicesAPI.getListByCall({
			callId: 'call-1',
			uploadedAtFrom: '1700000000000',
			retentionUntilTo: '1700000009999',
		});

		expect(sentParams()).toMatchObject({
			'uploaded_at.from': '1700000000000',
			'retention_until.to': '1700000009999',
		});
	});
});

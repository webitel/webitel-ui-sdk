import type { AxiosAdapter, InternalAxiosRequestConfig } from 'axios';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import axios from '../../../axios/genClient';

import { ChatDialogsAPI } from '../chatDialogs';

const captured: InternalAxiosRequestConfig[] = [];
let originalAdapter: AxiosAdapter | undefined;

beforeEach(() => {
	captured.length = 0;
	originalAdapter = axios.defaults.adapter as AxiosAdapter | undefined;
	axios.defaults.adapter = (config) => {
		captured.push(config);
		return Promise.resolve({
			data: {
				data: [],
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

describe('ChatDialogsAPI.getList', () => {
	it('renames nested params to their dotted wire names', async () => {
		await ChatDialogsAPI.getList({
			viaId: 'via-1',
			viaType: 'telegram',
			peerName: 'John',
			dateSince: '1700000000000',
		});

		expect(captured[0].params).toMatchObject({
			'via.id': 'via-1',
			'via.type': 'telegram',
			'peer.name': 'John',
			'date.since': '1700000000000',
		});
		const keys = Object.keys(captured[0].params as Record<string, unknown>);
		expect(keys).not.toContain('viaId');
		expect(keys).not.toContain('peerName');
	});

	it('drops params the endpoint does not declare', async () => {
		await ChatDialogsAPI.getList({
			viaId: 'via-1',
			somethingUnknown: 'x',
		});

		expect(
			Object.keys(captured[0].params as Record<string, unknown>),
		).not.toContain('somethingUnknown');
	});
});

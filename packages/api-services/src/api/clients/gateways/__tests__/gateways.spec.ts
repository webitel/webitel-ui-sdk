import { beforeEach, describe, expect, it, vi } from 'vitest';

const instance = vi.hoisted(() => ({
	get: vi.fn(),
	post: vi.fn(),
	put: vi.fn(),
	patch: vi.fn(),
	delete: vi.fn(),
}));

vi.mock('../../../defaults', async (importOriginal) => ({
	...(await importOriginal<typeof import('../../../defaults')>()),
	getDefaultInstance: () => instance,
}));

import { GatewaysAPI } from '../gateways';

const common = {
	name: 'gw',
	proxy: 'sip.example.com',
	schema: {
		id: '1',
		name: 'flow',
	},
	usage: '',
	enable: true,
};

describe('GatewaysAPI', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		for (const method of Object.values(instance)) {
			method.mockResolvedValue({
				data: {},
			});
		}
	});

	it('sends only registration fields for a register gateway', async () => {
		await GatewaysAPI.add({
			itemInstance: {
				...common,
				register: true,
				account: 'user',
				username: 'auth',
				password: 'secret',
				expires: 600,
				host: 'leftover',
				ipacl: [],
				rState: 3,
			},
		});

		expect(instance.post).toHaveBeenCalledWith('/sip/gateways', {
			...common,
			register: true,
			account: 'user',
			username: 'auth',
			password: 'secret',
			expires: 600,
		});
	});

	it('sends only trunking fields for a trunking gateway', async () => {
		await GatewaysAPI.update({
			itemId: '5',
			itemInstance: {
				...common,
				register: false,
				host: '10.0.0.2',
				ipacl: [
					{
						ip: '10.0.0.3',
						proto: 'any',
						port: null,
					},
				],
				account: 'leftover',
				expires: 600,
			},
		});

		expect(instance.put).toHaveBeenCalledWith('/sip/gateways/5', {
			...common,
			register: false,
			host: '10.0.0.2',
			ipacl: [
				{
					ip: '10.0.0.3',
					proto: 'any',
					port: null,
				},
			],
		});
	});

	it('patches the changed field only', async () => {
		await GatewaysAPI.patch({
			id: '5',
			changes: {
				enable: false,
			},
		});

		expect(instance.patch).toHaveBeenCalledWith('/sip/gateways/5', {
			enable: false,
		});
	});

	it('fills trunking defaults on get', async () => {
		instance.get.mockResolvedValue({
			data: {
				id: '5',
				register: false,
				ipacl: [
					{
						ip: '10.0.0.3',
					},
				],
			},
		});

		expect(
			await GatewaysAPI.get({
				itemId: '5',
			}),
		).toMatchObject({
			host: '',
			ipacl: [
				{
					ip: '10.0.0.3',
					proto: 'any',
					port: null,
				},
			],
		});
	});
});

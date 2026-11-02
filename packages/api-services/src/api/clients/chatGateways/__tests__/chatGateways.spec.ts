import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ChatGatewayProvider } from '../../../../enums';

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

const { ChatGatewaysAPI } = await import('../chatGateways');

describe('ChatGatewaysAPI', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('get seeds the provider defaults and clears an empty flow', async () => {
		instance.get.mockResolvedValue({
			data: {
				id: '1',
				name: 'bot',
				provider: ChatGatewayProvider.TELEGRAM_BOT,
				flow: {},
			},
		});

		const item = await ChatGatewaysAPI.get({
			itemId: '1',
		});

		expect(item.flow).toBeUndefined();
		expect(item.metadata).toEqual({
			token: '',
		});
		expect(item.updates.filePolicyFail).toBe('');
	});

	it('get parses webchat metadata over the webchat defaults', async () => {
		instance.get.mockResolvedValue({
			data: {
				id: '2',
				provider: ChatGatewayProvider.WEBCHAT,
				metadata: {
					allow_origin: 'a.com,b.com',
					read_timeout: '60s',
					_btn_code_dirty: 'true',
					view: JSON.stringify({
						lang: 'uk',
					}),
				},
			},
		});

		const item = await ChatGatewaysAPI.get({
			itemId: '2',
		});

		expect(item.metadata).toMatchObject({
			allowOrigin: [
				'a.com',
				'b.com',
			],
			readTimeout: 60,
			_btnCodeDirty: true,
			view: {
				lang: 'uk',
				position: '',
			},
			chat: {
				enabled: true,
			},
		});
	});

	it('add returns the saved item in the card shape', async () => {
		instance.post.mockResolvedValue({
			data: {
				id: '3',
				provider: ChatGatewayProvider.MESSENGER,
				metadata: {
					instagram_comments: 'true',
				},
			},
		});

		const item = await ChatGatewaysAPI.add({
			itemInstance: {
				name: 'meta',
				provider: ChatGatewayProvider.MESSENGER,
				metadata: {
					clientId: 'id',
					clientSecret: 'secret',
					version: '',
					instagramComments: true,
					instagramMentions: false,
				},
			},
		});

		const [, body] = instance.post.mock.calls[0];
		expect(body.metadata).not.toHaveProperty('version');
		expect(item.metadata).toMatchObject({
			instagramComments: true,
			instagramMentions: false,
		});
	});
});

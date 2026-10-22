import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ChatGatewayChannelSetup } from '../../../../enums';

const instance = vi.hoisted(() => ({
	get: vi.fn(),
	post: vi.fn(),
}));

vi.mock('../../../defaults', async (importOriginal) => ({
	...(await importOriginal<typeof import('../../../defaults')>()),
	getDefaultInstance: () => instance,
}));

const { ChatGatewayChannelsAPI } = await import('../chatGatewayChannels');

const params = {
	uri: '/bot',
	appUrls: {
		chatUrl: 'https://example.com/chat',
	},
};

describe('ChatGatewayChannelsAPI', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('requests the chat service at the app chat url', async () => {
		instance.get.mockResolvedValue({
			data: [
				{
					id: '1',
					subscribed_fields: [
						'messages',
					],
				},
			],
		});

		const pages = await ChatGatewayChannelsAPI.getFacebookPages(params);

		expect(instance.get).toHaveBeenCalledWith(
			'https://example.com/chat/bot?pages=',
		);
		expect(pages).toEqual([
			{
				id: '1',
				subscribedFields: [
					'messages',
				],
				accounts: [],
			},
		]);
	});

	it('builds subscription and removal requests', async () => {
		instance.get.mockResolvedValue({});

		await ChatGatewayChannelsAPI.updateWhatsappSubscription({
			...params,
			id: '7',
			value: false,
		});
		await ChatGatewayChannelsAPI.deleteWhatsappAccount({
			...params,
			id: '7',
		});

		expect(instance.get.mock.calls.map(([url]) => url)).toEqual([
			'https://example.com/chat/bot?whatsapp=unsubscribe&id=7',
			'https://example.com/chat/bot?whatsapp=remove&id=7&ack=true',
		]);
	});

	it('builds the setup page url', () => {
		expect(
			ChatGatewayChannelsAPI.getSetupUrl({
				...params,
				setup: ChatGatewayChannelSetup.TelegramApp,
			}),
		).toBe('https://example.com/chat/bot?auth');
	});
});

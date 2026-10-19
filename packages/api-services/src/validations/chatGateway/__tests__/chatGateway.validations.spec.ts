import { describe, expect, it } from 'vitest';

import { getChatGatewayDefaults } from '../../../api/clients/chatGateways/defaults/chatGatewayProviderDefaults';
import { ChatGatewayProvider } from '../../../enums';
import { chatGatewaySchema } from '../chatGateway.validations';

const issuePaths = (value: unknown) => {
	const result = chatGatewaySchema.safeParse(value);
	return result.success
		? []
		: result.error.issues.map(({ path }) => path.join('.'));
};

const flow = {
	id: 1,
	name: 'flow',
};

describe('chatGatewaySchema', () => {
	it('keeps metadata keys it does not list', () => {
		const parsed = chatGatewaySchema.parse({
			name: 'bot',
			uri: '/bot',
			flow,
			provider: ChatGatewayProvider.TELEGRAM_BOT,
			metadata: {
				token: 'token',
				unknownKey: 'kept',
			},
		});
		expect(parsed.metadata).toMatchObject({
			unknownKey: 'kept',
		});
	});

	it('requires name, uri, flow and the provider fields', () => {
		expect(
			issuePaths({
				...getChatGatewayDefaults(ChatGatewayProvider.TELEGRAM_BOT),
				uri: '',
			}),
		).toEqual([
			'name',
			'uri',
			'flow',
			'metadata.token',
		]);
	});

	it('reports a cleared lookup on its id', () => {
		expect(
			issuePaths({
				name: 'bot',
				uri: '/bot',
				flow: {},
				provider: ChatGatewayProvider.VIBER,
				metadata: {
					token: 'token',
				},
			}),
		).toEqual([
			'flow.id',
		]);
	});

	it('checks the uri length', () => {
		expect(
			issuePaths({
				name: 'bot',
				uri: '/b',
				flow,
				provider: ChatGatewayProvider.CUSTOM,
				metadata: {
					webhook: 'hook',
					secret: 'secret',
				},
			}),
		).toEqual([
			'uri',
		]);
	});

	it('checks the infobip url and telegram app id format', () => {
		expect(
			issuePaths({
				name: 'infobip',
				uri: '/infobip',
				flow,
				provider: ChatGatewayProvider.INFOBIP,
				metadata: {
					apiKey: 'key',
					url: 'not a url',
				},
			}),
		).toEqual([
			'metadata.url',
		]);
		expect(
			issuePaths({
				name: 'app',
				uri: '/app',
				flow,
				provider: ChatGatewayProvider.TELEGRAM_APP,
				metadata: {
					apiId: '12a',
					apiHash: 'hash',
				},
			}),
		).toEqual([
			'metadata.apiId',
		]);
	});

	it('checks the meta api version only when it is set', () => {
		const messenger = {
			name: 'meta',
			uri: '/meta',
			flow,
			provider: ChatGatewayProvider.MESSENGER,
			metadata: {
				clientId: 'id',
				clientSecret: 'secret',
				version: '',
			},
		};
		expect(issuePaths(messenger)).toEqual([]);
		expect(
			issuePaths({
				...messenger,
				metadata: {
					...messenger.metadata,
					version: '24',
				},
			}),
		).toEqual([
			'metadata.version',
		]);
	});

	describe('webchat', () => {
		const webchat = () => ({
			...getChatGatewayDefaults(ChatGatewayProvider.WEBCHAT),
			name: 'webchat',
			flow,
		});

		it('accepts the defaults', () => {
			expect(issuePaths(webchat())).toEqual([]);
		});

		it('needs a flow only while the chat is enabled', () => {
			const gateway = webchat();
			gateway.flow = undefined;
			expect(issuePaths(gateway)).toEqual([
				'flow',
			]);
			gateway.metadata.chat.enabled = false;
			expect(issuePaths(gateway)).toEqual([]);
		});

		it('checks timeout ranges', () => {
			const gateway = webchat();
			gateway.metadata.readTimeout = '10';
			gateway.metadata.writeTimeout = '61';
			expect(issuePaths(gateway)).toEqual([
				'metadata.readTimeout',
				'metadata.writeTimeout',
			]);
		});

		it('validates enabled sections only', () => {
			const gateway = webchat();
			gateway.metadata.captcha.enabled = true;
			gateway.metadata.captcha.threshold = 2;
			gateway.metadata.appointment.enabled = true;
			gateway.metadata.call.enabled = true;
			gateway.metadata.call.url = 'https://example.com';
			expect(issuePaths(gateway)).toEqual([
				'metadata.captcha.sitekey',
				'metadata.captcha.secret',
				'metadata.appointment.queue',
				'metadata.appointment.communicationType',
				'metadata.call.flow',
				'metadata.call.url',
				'metadata.captcha.threshold',
			]);
		});
	});
});

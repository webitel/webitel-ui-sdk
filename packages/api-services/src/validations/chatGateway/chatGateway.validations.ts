import { get, isPlainObject } from 'lodash-es';
import { z } from 'zod';

import { ChatGatewayProvider } from '../../enums';
import { i18nIssue } from '../_shared/i18nIssue';
import { isFilled } from '../_shared/isFilled';
import { flexibleLookupSchema } from '../_shared/lookup.validations';

/** [Claude] timeouts and counters come as strings from the defaults and as numbers from number inputs */
const numberLikeSchema = z
	.union([
		z.string(),
		z.number(),
	])
	.nullish();

const optionalLookupSchema = flexibleLookupSchema.nullish();

/** [Claude] vuelidate's `numeric`: an empty value passes, otherwise a non-negative decimal */
const isNumeric = (value: unknown) =>
	!isFilled(value) || /^\d*(\.\d+)?$/.test(String(value));

const hasProtocol = (value: string, protocol: RegExp) => {
	try {
		return protocol.test(new URL(value).protocol);
	} catch {
		return false;
	}
};

const isUrl = (value: unknown) =>
	!isFilled(value) || hasProtocol(String(value), /^(https?|ftp):$/i);

const isWebsocketUrl = (value: unknown) =>
	!isFilled(value) || hasProtocol(String(value), /^wss?:$/i);

/** [Claude] Meta Graph API version: v1.0, v19.0, v24.0 ([WTEL-7923](https://webitel.atlassian.net/browse/WTEL-7923)) */
const isMetaApiVersion = (value: unknown) =>
	!isFilled(value) || /^v([1-9]\d*)(\.(0|[1-9]\d*))$/.test(String(value));

/**
 * [Claude] Every provider keeps its settings in `metadata`, so it is one loose
 * object with all known keys optional: `.passthrough()` keeps the keys this
 * schema does not list (regle syncs the parsed value back into the form).
 * Which keys a provider requires is checked in `superRefine` below.
 */
const chatGatewayMetadataSchema = z
	.object({
		// [Claude] telegram bot, viber
		token: z.string().optional(),
		// [Claude] telegram app
		apiId: numberLikeSchema,
		apiHash: z.string().optional(),
		// [Claude] messenger (meta)
		clientId: z.string().optional(),
		clientSecret: z.string().optional(),
		version: z.string().optional(),
		instagramComments: z.boolean().optional(),
		instagramMentions: z.boolean().optional(),
		whatsappToken: z.string().optional(),
		// [Claude] infobip
		apiKey: z.string().optional(),
		url: z.string().optional(),
		// [Claude] viber
		botName: z.string().optional(),
		btnBackColor: z.string().optional(),
		btnFontColor: z.string().optional(),
		// [Claude] custom
		secret: z.string().optional(),
		webhook: z.string().optional(),
		// [Claude] webchat
		allowOrigin: z.array(z.string()).optional(),
		readTimeout: numberLikeSchema,
		writeTimeout: numberLikeSchema,
		handshakeTimeout: numberLikeSchema,
		mediaMaxSize: numberLikeSchema,
		_btnCodeDirty: z.boolean().optional(),
		view: z
			.object({
				logoUrl: z.string().optional(),
			})
			.passthrough()
			.optional(),
		captcha: z
			.object({
				enabled: z.boolean().optional(),
				sitekey: z.string().optional(),
				secret: z.string().optional(),
				threshold: numberLikeSchema,
				// [Claude] stored as 1/0 by older versions of the form
				showFlag: z
					.union([
						z.boolean(),
						z.number(),
					])
					.optional(),
			})
			.passthrough()
			.optional(),
		chat: z
			.object({
				enabled: z.boolean().optional(),
				timeoutIsActive: z.boolean().optional(),
				openTimeout: numberLikeSchema,
			})
			.passthrough()
			.optional(),
		appointment: z
			.object({
				enabled: z.boolean().optional(),
				queue: optionalLookupSchema,
				communicationType: optionalLookupSchema,
				duration: z.string().optional(),
				days: numberLikeSchema,
				availableAgents: numberLikeSchema,
			})
			.passthrough()
			.optional(),
		call: z
			.object({
				enabled: z.boolean().optional(),
				url: z.string().optional(),
				flow: optionalLookupSchema,
			})
			.passthrough()
			.optional(),
		alternativeChannels: z
			.record(
				z.string(),
				z
					.object({
						url: z.string().optional(),
						enabled: z.boolean().optional(),
					})
					.passthrough(),
			)
			.optional(),
	})
	.passthrough();

const chatGatewayUpdatesSchema = z
	.object({
		title: z.string().optional(),
		close: z.string().optional(),
		join: z.string().optional(),
		left: z.string().optional(),
		filePolicyFail: z.string().optional(),
	})
	.passthrough();

interface NumberRange {
	min?: number;
	max?: number;
}

interface ProviderRules {
	required?: string[];
	numeric?: string[];
	url?: string[];
	websocketUrl?: string[];
	metaApiVersion?: string[];
	range?: Record<string, NumberRange>;
}

const sharedRules: ProviderRules = {
	required: [
		'name',
		'uri',
	],
};

/**
 * [Claude] Webchat's nested sections only validate when they are enabled,
 * so its rules are built from the item itself.
 */
const webchatRules = (
	metadata: z.infer<typeof chatGatewayMetadataSchema>,
): ProviderRules => {
	const required: string[] = [];
	const numeric = [
		'metadata.readTimeout',
		'metadata.writeTimeout',
		'metadata.handshakeTimeout',
		'metadata.chat.openTimeout',
	];
	const range: Record<string, NumberRange> = {
		'metadata.readTimeout': {
			min: 30,
			max: 300,
		},
		'metadata.writeTimeout': {
			min: 1,
			max: 60,
		},
		'metadata.handshakeTimeout': {
			min: 10,
			max: 60,
		},
		'metadata.chat.openTimeout': {
			min: 0,
		},
	};
	const websocketUrl: string[] = [];

	// [Claude] the flow serves the chat only, so a widget without chat needs none
	if (metadata.chat?.enabled) required.push('flow');

	if (metadata.captcha?.enabled) {
		required.push(
			'metadata.captcha.sitekey',
			'metadata.captcha.secret',
			'metadata.captcha.threshold',
		);
		numeric.push('metadata.captcha.threshold');
		range['metadata.captcha.threshold'] = {
			min: 0,
			max: 1,
		};
	}

	if (metadata.appointment?.enabled) {
		required.push(
			'metadata.appointment.queue',
			'metadata.appointment.communicationType',
			'metadata.appointment.duration',
			'metadata.appointment.days',
			'metadata.appointment.availableAgents',
		);
		range['metadata.appointment.days'] = {
			min: 1,
			max: 7,
		};
		range['metadata.appointment.availableAgents'] = {
			min: 1,
		};
	}

	if (metadata.call?.enabled) {
		required.push('metadata.call.url', 'metadata.call.flow');
		websocketUrl.push('metadata.call.url');
	}

	return {
		required,
		numeric,
		range,
		url: [
			'metadata.view.logoUrl',
		],
		websocketUrl,
	};
};

const providerRules = (
	provider: string,
	metadata: z.infer<typeof chatGatewayMetadataSchema>,
): ProviderRules => {
	switch (provider) {
		case ChatGatewayProvider.TELEGRAM_BOT:
		case ChatGatewayProvider.VIBER:
			return {
				required: [
					'flow',
					'metadata.token',
				],
			};
		case ChatGatewayProvider.TELEGRAM_APP:
			return {
				required: [
					'flow',
					'metadata.apiId',
					'metadata.apiHash',
				],
				numeric: [
					'metadata.apiId',
				],
			};
		case ChatGatewayProvider.MESSENGER:
			return {
				required: [
					'flow',
					'metadata.clientId',
					'metadata.clientSecret',
				],
				metaApiVersion: [
					'metadata.version',
				],
			};
		case ChatGatewayProvider.INFOBIP:
			return {
				required: [
					'flow',
					'metadata.apiKey',
					'metadata.url',
				],
				url: [
					'metadata.url',
				],
			};
		case ChatGatewayProvider.CUSTOM:
			return {
				required: [
					'flow',
					'metadata.webhook',
					'metadata.secret',
				],
			};
		case ChatGatewayProvider.WEBCHAT:
			return webchatRules(metadata);
		default:
			return {
				required: [
					'flow',
				],
			};
	}
};

const URI_MIN_LENGTH = 3;

/**
 * [Claude] One flat schema for all providers rather than a union on `provider`:
 * a union would make regle's `validationFields` a union too, and every tab would
 * have to narrow it first. The per-provider rules live in `superRefine`, with
 * dotted paths, so `metadata.token` lands on `validationFields.metadata.$fields.token`.
 */
export const chatGatewaySchema = z
	.object({
		id: z
			.union([
				z.string(),
				z.number(),
			])
			.optional(),
		name: z.string().default(''),
		uri: z.string().default(''),
		flow: optionalLookupSchema,
		enabled: z.boolean().default(false),
		provider: z.string().default(''),
		metadata: chatGatewayMetadataSchema.default({}),
		updates: chatGatewayUpdatesSchema.optional(),
	})
	.passthrough()
	.superRefine((gateway, ctx) => {
		const rules = [
			sharedRules,
			providerRules(gateway.provider, gateway.metadata),
		];

		const addIssue = (
			path: string,
			issue: Record<string, unknown>,
			value = get(gateway, path),
		) =>
			ctx.addIssue({
				code: 'custom',
				...issue,
				// [Claude] an object field gets a nested status in regle, so its issue goes on `id`
				path: isPlainObject(value)
					? [
							...path.split('.'),
							'id',
						]
					: path.split('.'),
			} as Parameters<typeof ctx.addIssue>[0]);

		for (const rule of rules) {
			for (const path of rule.required ?? []) {
				if (!isFilled(get(gateway, path))) {
					addIssue(path, i18nIssue('required'));
				}
			}

			const formatRules: [
				string[] | undefined,
				(value: unknown) => boolean,
				string,
			][] = [
				[
					rule.numeric,
					isNumeric,
					'numeric',
				],
				[
					rule.url,
					isUrl,
					'url',
				],
				[
					rule.websocketUrl,
					isWebsocketUrl,
					'websocketValidator',
				],
				[
					rule.metaApiVersion,
					isMetaApiVersion,
					'metaApiVersion',
				],
			];

			for (const [paths, isValid, i18nKey] of formatRules) {
				for (const path of paths ?? []) {
					if (!isValid(get(gateway, path))) {
						addIssue(path, i18nIssue(i18nKey));
					}
				}
			}

			for (const [path, { min, max }] of Object.entries(rule.range ?? {})) {
				const value = get(gateway, path);
				// [Claude] an empty field is the required rule's business, a non-number the numeric one's
				if (!isFilled(value) || !isNumeric(value)) continue;
				const number = Number(value);
				/**
				 * [Claude] `too_small`/`too_big`, not a message: a message wins over the
				 * app's error map, the only thing that translates. WTEL-10294
				 */
				if (min !== undefined && number < min) {
					addIssue(path, {
						code: 'too_small',
						origin: 'number',
						minimum: min,
						inclusive: true,
						input: value,
					});
				}
				if (max !== undefined && number > max) {
					addIssue(path, {
						code: 'too_big',
						origin: 'number',
						maximum: max,
						inclusive: true,
						input: value,
					});
				}
			}
		}

		if (gateway.uri && gateway.uri.length < URI_MIN_LENGTH) {
			addIssue('uri', {
				code: 'too_small',
				origin: 'string',
				minimum: URI_MIN_LENGTH,
				inclusive: true,
				input: gateway.uri,
			});
		}
	});

export type ChatGatewayFormShape = z.input<typeof chatGatewaySchema>;
export type ChatGatewayCard = ChatGatewayFormShape;
export type ChatGatewayMetadata = z.input<typeof chatGatewayMetadataSchema>;

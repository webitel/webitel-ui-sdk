import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';

import ChatGatewayProvider from '../../../enums/ChatGatewayProvider/ChatGatewayProvider.enum';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import { webChatGateway } from './defaults/webChatGateway';

const instance = getDefaultInstance();

const baseUrl = '/chat/bots';
const fieldsToSend = [
	'name',
	'uri',
	'flow',
	'enabled',
	'provider',
	'metadata',
	'updates',
];

const convertWebchatSeconds = (num) => `${num}s`;

const parseTimeoutSeconds = (item) =>
	item.includes('s') ? Number.parseInt(item.replace('/s', '/'), 10) : +item;

const webchatRequestConverter = (data) => {
	const copy = deepCopy(data);
	if (data.metadata.readTimeout) {
		copy.metadata.readTimeout = convertWebchatSeconds(
			data.metadata.readTimeout,
		);
	}
	if (data.metadata.writeTimeout) {
		copy.metadata.writeTimeout = convertWebchatSeconds(
			data.metadata.writeTimeout,
		);
	}
	if (data.metadata.handshakeTimeout) {
		copy.metadata.handshakeTimeout = convertWebchatSeconds(
			data.metadata.handshakeTimeout,
		);
	}
	if (data.metadata.allowOrigin) {
		copy.metadata.allowOrigin = data.metadata.allowOrigin.join();
	}

	copy.metadata.view = JSON.stringify(data.metadata.view);
	copy.metadata.chat = JSON.stringify(data.metadata.chat);
	copy.metadata.appointment = JSON.stringify(data.metadata.appointment);
	copy.metadata.alternativeChannels = JSON.stringify(
		data.metadata.alternativeChannels,
	);
	copy.metadata.call = JSON.stringify(data.metadata.call);

	if (copy.metadata.captcha.enabled) {
		copy.metadata.captcha = JSON.stringify(data.metadata.captcha);
	} else {
		copy.metadata.captcha = undefined;
	}
	copy.metadata._btnCodeDirty = data.metadata._btnCodeDirty.toString();
	return copy;
};

const messengerRequestConverter = (data) => {
	const copy = deepCopy(data);
	copy.metadata.instagramComments = data.metadata.instagramComments.toString();
	copy.metadata.instagramMentions = data.metadata.instagramMentions.toString();
	return copy;
};

const viberRequestConverter = (item) => {
	const copy = deepCopy(item);
	copy.metadata['btn.back.color'] = item.metadata.btnBackColor;
	copy.metadata.btnBackColor = undefined;
	copy.metadata['btn.font.color'] = item.metadata.btnFontColor;
	copy.metadata.btnFontColor = undefined;
	return copy;
};

const webChatResponseConverter = (data) => {
	const copy = deepCopy(data);
	copy.metadata.allowOrigin = data.metadata.allowOrigin
		? data.metadata.allowOrigin.split(',')
		: [];
	if (data.metadata.readTimeout) {
		copy.metadata.readTimeout = parseTimeoutSeconds(data.metadata.readTimeout);
	}
	if (data.metadata.writeTimeout) {
		copy.metadata.writeTimeout = parseTimeoutSeconds(
			data.metadata.writeTimeout,
		);
	}
	if (data.metadata.handshakeTimeout) {
		copy.metadata.handshakeTimeout = parseTimeoutSeconds(
			data.metadata.handshakeTimeout,
		);
	}
	if (data.metadata.view) {
		copy.metadata.view = JSON.parse(data.metadata.view);
	}
	if (data.metadata.chat) {
		copy.metadata.chat = JSON.parse(data.metadata.chat);
	}
	if (data.metadata.appointment) {
		copy.metadata.appointment = JSON.parse(data.metadata.appointment);
	}
	if (data.metadata.alternativeChannels) {
		copy.metadata.alternativeChannels = JSON.parse(
			data.metadata.alternativeChannels,
		);
	}
	if (data.metadata.call) {
		copy.metadata.call = JSON.parse(data.metadata.call);
	}
	if (data.metadata.captcha) {
		copy.metadata.captcha = JSON.parse(data.metadata.captcha);
	}
	copy.metadata._btnCodeDirty = data.metadata._btnCodeDirty === 'true';

	return deepmerge(webChatGateway(), copy);
};

const messengerResponseConverter = (item) => {
	const copy = deepCopy(item);
	copy.metadata.instagramComments = item.metadata.instagramComments === 'true';
	copy.metadata.instagramMentions = item.metadata.instagramMentions === 'true';
	return copy;
};

const viberResponseConverter = (item) => {
	const copy = deepCopy(item);
	if (item.metadata['btn.back.color'])
		copy.metadata.btnBackColor = item.metadata['btn.back.color'];
	if (item.metadata['btn.font.color'])
		copy.metadata.btnFontColor = item.metadata['btn.font.color'];
	return copy;
};

const preRequestHandler = (item) => {
	switch (item.provider) {
		case ChatGatewayProvider.WEBCHAT:
			return webchatRequestConverter(item);
		case ChatGatewayProvider.MESSENGER:
			return messengerRequestConverter(item);
		case ChatGatewayProvider.VIBER:
			return viberRequestConverter(item);
		default:
			return item;
	}
};

const getChatGatewayList = async (params) => {
	const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

	const defaultObject = {
		// default object prototype, to merge response with it to get all fields
		enabled: false,
		name: '',
		uri: '',
		flow: {},
		provider: '',
		metadata: {},
		updates: {
			title: '',
			close: '',
			join: '',
			left: '',
		},
	};

	const url = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({ ...params, q: params.search }),
		sanitize(fieldsToSend),
		camelToSnake(),
		generateUrl(baseUrl),
	]);
	try {
		const response = await instance.get(url);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [mergeEach(defaultObject)]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getChatGateway = async ({ itemId: id }) => {
	const itemResponseHandler = (response) => {
		switch (response.provider) {
			case ChatGatewayProvider.WEBCHAT:
				return webChatResponseConverter(response);
			case ChatGatewayProvider.MESSENGER:
				return messengerResponseConverter(response);
			case ChatGatewayProvider.VIBER:
				return viberResponseConverter(response);
			default:
				return response;
		}
	};

	const url = `${baseUrl}/${id}`;

	try {
		const response = await instance.get(url);
		return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const addChatGateway = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await instance.post(baseUrl, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updateChatGateway = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.put(url, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const patchChatGateway = async ({ changes, id }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.patch(url, body);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteChatGateway = async ({ id }) => {
	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.delete(url);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getLookup = (params) =>
	getChatGatewayList({
		...params,
		fields: params.fields || ['id', 'name'],
	});

/**
 * Chat Gateways API for managing chat gateway configurations
 */
export const ChatGatewaysAPI = {
	getList: getChatGatewayList,
	get: getChatGateway,
	add: addChatGateway,
	patch: patchChatGateway,
	update: updateChatGateway,
	delete: deleteChatGateway,
	getLookup,
};

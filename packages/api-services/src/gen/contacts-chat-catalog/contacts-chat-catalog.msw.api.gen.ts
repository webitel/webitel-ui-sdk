/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';
import type { WebitelChatGetContactChatHistoryResponse } from '.././_models';
import { WebitelChatMessageButtonRequest } from '.././_models';

export const getContactsChatCatalogGetContactChatHistory2ResponseMock = (
	overrideResponse: Partial<WebitelChatGetContactChatHistoryResponse> = {},
): WebitelChatGetContactChatHistoryResponse => ({
	chats: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			context: faker.helpers.arrayElement([
				{
					[faker.string.alphanumeric(5)]: faker.string.alpha({
						length: { min: 10, max: 20 },
					}),
				},
				undefined,
			]),
			dc: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			invite: faker.helpers.arrayElement([
				{
					date: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					from: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			join: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			left: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			peer: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					type: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			title: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			via: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					type: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
		})),
		undefined,
	]),
	messages: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			chat: faker.helpers.arrayElement([
				{
					context: faker.helpers.arrayElement([
						{
							[faker.string.alphanumeric(5)]: faker.string.alpha({
								length: { min: 10, max: 20 },
							}),
						},
						undefined,
					]),
					dc: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					invite: faker.helpers.arrayElement([
						{
							date: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							from: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
					join: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					left: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					peer: faker.helpers.arrayElement([
						{
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							name: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							type: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
					title: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					via: faker.helpers.arrayElement([
						{
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							name: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							type: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
				},
				undefined,
			]),
			context: faker.helpers.arrayElement([
				{
					[faker.string.alphanumeric(5)]: faker.string.alpha({
						length: { min: 10, max: 20 },
					}),
				},
				undefined,
			]),
			date: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			edit: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			file: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					size: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					type: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					url: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			from: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					type: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			keyboard: faker.helpers.arrayElement([
				{
					buttons: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => ({
							row: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() => ({
									code: faker.helpers.arrayElement([
										faker.string.alpha({ length: { min: 10, max: 20 } }),
										undefined,
									]),
									share: faker.helpers.arrayElement([
										faker.helpers.arrayElement(
											Object.values(WebitelChatMessageButtonRequest),
										),
										undefined,
									]),
									text: faker.helpers.arrayElement([
										faker.string.alpha({ length: { min: 10, max: 20 } }),
										undefined,
									]),
									url: faker.helpers.arrayElement([
										faker.string.alpha({ length: { min: 10, max: 20 } }),
										undefined,
									]),
								})),
								undefined,
							]),
						})),
						undefined,
					]),
					noInput: faker.helpers.arrayElement([
						faker.datatype.boolean(),
						undefined,
					]),
				},
				undefined,
			]),
			postback: faker.helpers.arrayElement([
				{
					code: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					mid: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					text: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			sender: faker.helpers.arrayElement([
				{
					context: faker.helpers.arrayElement([
						{
							[faker.string.alphanumeric(5)]: faker.string.alpha({
								length: { min: 10, max: 20 },
							}),
						},
						undefined,
					]),
					dc: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					invite: faker.helpers.arrayElement([
						{
							date: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							from: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
					join: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					left: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					peer: faker.helpers.arrayElement([
						{
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							name: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							type: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
					title: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					via: faker.helpers.arrayElement([
						{
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							name: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							type: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
				},
				undefined,
			]),
			text: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		})),
		undefined,
	]),
	next: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	page: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	peers: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			type: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		})),
		undefined,
	]),
	...overrideResponse,
});

export const getContactsChatCatalogGetContactChatHistoryResponseMock = (
	overrideResponse: Partial<WebitelChatGetContactChatHistoryResponse> = {},
): WebitelChatGetContactChatHistoryResponse => ({
	chats: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			context: faker.helpers.arrayElement([
				{
					[faker.string.alphanumeric(5)]: faker.string.alpha({
						length: { min: 10, max: 20 },
					}),
				},
				undefined,
			]),
			dc: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			invite: faker.helpers.arrayElement([
				{
					date: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					from: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			join: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			left: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			peer: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					type: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			title: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			via: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					type: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
		})),
		undefined,
	]),
	messages: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			chat: faker.helpers.arrayElement([
				{
					context: faker.helpers.arrayElement([
						{
							[faker.string.alphanumeric(5)]: faker.string.alpha({
								length: { min: 10, max: 20 },
							}),
						},
						undefined,
					]),
					dc: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					invite: faker.helpers.arrayElement([
						{
							date: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							from: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
					join: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					left: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					peer: faker.helpers.arrayElement([
						{
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							name: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							type: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
					title: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					via: faker.helpers.arrayElement([
						{
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							name: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							type: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
				},
				undefined,
			]),
			context: faker.helpers.arrayElement([
				{
					[faker.string.alphanumeric(5)]: faker.string.alpha({
						length: { min: 10, max: 20 },
					}),
				},
				undefined,
			]),
			date: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			edit: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			file: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					size: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					type: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					url: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			from: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					type: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			keyboard: faker.helpers.arrayElement([
				{
					buttons: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => ({
							row: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() => ({
									code: faker.helpers.arrayElement([
										faker.string.alpha({ length: { min: 10, max: 20 } }),
										undefined,
									]),
									share: faker.helpers.arrayElement([
										faker.helpers.arrayElement(
											Object.values(WebitelChatMessageButtonRequest),
										),
										undefined,
									]),
									text: faker.helpers.arrayElement([
										faker.string.alpha({ length: { min: 10, max: 20 } }),
										undefined,
									]),
									url: faker.helpers.arrayElement([
										faker.string.alpha({ length: { min: 10, max: 20 } }),
										undefined,
									]),
								})),
								undefined,
							]),
						})),
						undefined,
					]),
					noInput: faker.helpers.arrayElement([
						faker.datatype.boolean(),
						undefined,
					]),
				},
				undefined,
			]),
			postback: faker.helpers.arrayElement([
				{
					code: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					mid: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					text: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			sender: faker.helpers.arrayElement([
				{
					context: faker.helpers.arrayElement([
						{
							[faker.string.alphanumeric(5)]: faker.string.alpha({
								length: { min: 10, max: 20 },
							}),
						},
						undefined,
					]),
					dc: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					invite: faker.helpers.arrayElement([
						{
							date: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							from: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
					join: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					left: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					peer: faker.helpers.arrayElement([
						{
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							name: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							type: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
					title: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					via: faker.helpers.arrayElement([
						{
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							name: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							type: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
						},
						undefined,
					]),
				},
				undefined,
			]),
			text: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		})),
		undefined,
	]),
	next: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	page: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	peers: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			type: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		})),
		undefined,
	]),
	...overrideResponse,
});

export const getContactsChatCatalogGetContactChatHistory2MockHandler = (
	overrideResponse?:
		| WebitelChatGetContactChatHistoryResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) =>
				| Promise<WebitelChatGetContactChatHistoryResponse>
				| WebitelChatGetContactChatHistoryResponse),
) => {
	return http.get('*/contacts/:contactId/chat/messages', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getContactsChatCatalogGetContactChatHistory2ResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getContactsChatCatalogGetContactChatHistoryMockHandler = (
	overrideResponse?:
		| WebitelChatGetContactChatHistoryResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) =>
				| Promise<WebitelChatGetContactChatHistoryResponse>
				| WebitelChatGetContactChatHistoryResponse),
) => {
	return http.get(
		'*/contacts/:contactId/chat/:chatId/messages',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getContactsChatCatalogGetContactChatHistoryResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};
export const getContactsChatCatalogMock = () => [
	getContactsChatCatalogGetContactChatHistory2MockHandler(),
	getContactsChatCatalogGetContactChatHistoryMockHandler(),
];

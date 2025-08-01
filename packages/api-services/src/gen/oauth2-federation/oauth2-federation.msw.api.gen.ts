/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';

import type {
	ApiDeleteOAuthServiceResponse,
	ApiOAuthService,
	ApiSearchOAuthServiceResponse,
} from '.././_models';

export const getOAuth2FederationDeleteOAuthServiceResponseMock =
	(): ApiDeleteOAuthServiceResponse => ({});

export const getOAuth2FederationSearchOAuthServiceResponseMock = (
	overrideResponse: Partial<ApiSearchOAuthServiceResponse> = {},
): ApiSearchOAuthServiceResponse => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			authUrl: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			claims: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => ({
					type: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					value: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				})),
				undefined,
			]),
			clientId: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			clientSecret: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			createdAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			createdBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			discoveryUrl: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			domain: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			enabled: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			logo: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			metadata: faker.helpers.arrayElement([{}, undefined]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			scopes: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
				undefined,
			]),
			tokenUrl: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			type: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			updatedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			updatedBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			userinfoUrl: faker.helpers.arrayElement([
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
	...overrideResponse,
});

export const getOAuth2FederationCreateOAuthServiceResponseMock = (
	overrideResponse: Partial<ApiOAuthService> = {},
): ApiOAuthService => ({
	authUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	claims: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			type: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			value: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		})),
		undefined,
	]),
	clientId: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	clientSecret: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	discoveryUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	domain: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	logo: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	metadata: faker.helpers.arrayElement([{}, undefined]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	scopes: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	tokenUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	type: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	userinfoUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	...overrideResponse,
});

export const getOAuth2FederationUpdateOAuthService2ResponseMock = (
	overrideResponse: Partial<ApiOAuthService> = {},
): ApiOAuthService => ({
	authUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	claims: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			type: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			value: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		})),
		undefined,
	]),
	clientId: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	clientSecret: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	discoveryUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	domain: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	logo: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	metadata: faker.helpers.arrayElement([{}, undefined]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	scopes: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	tokenUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	type: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	userinfoUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	...overrideResponse,
});

export const getOAuth2FederationUpdateOAuthServiceResponseMock = (
	overrideResponse: Partial<ApiOAuthService> = {},
): ApiOAuthService => ({
	authUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	claims: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			type: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			value: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		})),
		undefined,
	]),
	clientId: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	clientSecret: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	discoveryUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	domain: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	logo: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	metadata: faker.helpers.arrayElement([{}, undefined]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	scopes: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	tokenUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	type: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	userinfoUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	...overrideResponse,
});

export const getOAuth2FederationDeleteOAuthService2ResponseMock =
	(): ApiDeleteOAuthServiceResponse => ({});

export const getOAuth2FederationLocateOAuthServiceResponseMock = (
	overrideResponse: Partial<ApiOAuthService> = {},
): ApiOAuthService => ({
	authUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	claims: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			type: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			value: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		})),
		undefined,
	]),
	clientId: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	clientSecret: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	discoveryUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	domain: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	logo: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	metadata: faker.helpers.arrayElement([{}, undefined]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	scopes: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	tokenUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	type: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	userinfoUrl: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	...overrideResponse,
});

export const getOAuth2FederationDeleteOAuthServiceMockHandler = (
	overrideResponse?:
		| ApiDeleteOAuthServiceResponse
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) =>
				| Promise<ApiDeleteOAuthServiceResponse>
				| ApiDeleteOAuthServiceResponse),
) => {
	return http.delete('*/oauth/apps', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getOAuth2FederationDeleteOAuthServiceResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getOAuth2FederationSearchOAuthServiceMockHandler = (
	overrideResponse?:
		| ApiSearchOAuthServiceResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) =>
				| Promise<ApiSearchOAuthServiceResponse>
				| ApiSearchOAuthServiceResponse),
) => {
	return http.get('*/oauth/apps', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getOAuth2FederationSearchOAuthServiceResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getOAuth2FederationCreateOAuthServiceMockHandler = (
	overrideResponse?:
		| ApiOAuthService
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) => Promise<ApiOAuthService> | ApiOAuthService),
) => {
	return http.post('*/oauth/apps', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getOAuth2FederationCreateOAuthServiceResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getOAuth2FederationUpdateOAuthService2MockHandler = (
	overrideResponse?:
		| ApiOAuthService
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) => Promise<ApiOAuthService> | ApiOAuthService),
) => {
	return http.patch('*/oauth/apps/changes.id}', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getOAuth2FederationUpdateOAuthService2ResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getOAuth2FederationUpdateOAuthServiceMockHandler = (
	overrideResponse?:
		| ApiOAuthService
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<ApiOAuthService> | ApiOAuthService),
) => {
	return http.put('*/oauth/apps/changes.id}', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getOAuth2FederationUpdateOAuthServiceResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getOAuth2FederationDeleteOAuthService2MockHandler = (
	overrideResponse?:
		| ApiDeleteOAuthServiceResponse
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) =>
				| Promise<ApiDeleteOAuthServiceResponse>
				| ApiDeleteOAuthServiceResponse),
) => {
	return http.delete('*/oauth/apps/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getOAuth2FederationDeleteOAuthService2ResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getOAuth2FederationLocateOAuthServiceMockHandler = (
	overrideResponse?:
		| ApiOAuthService
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<ApiOAuthService> | ApiOAuthService),
) => {
	return http.get('*/oauth/apps/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getOAuth2FederationLocateOAuthServiceResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getOauth2FederationMock = () => [
	getOAuth2FederationDeleteOAuthServiceMockHandler(),
	getOAuth2FederationSearchOAuthServiceMockHandler(),
	getOAuth2FederationCreateOAuthServiceMockHandler(),
	getOAuth2FederationUpdateOAuthService2MockHandler(),
	getOAuth2FederationUpdateOAuthServiceMockHandler(),
	getOAuth2FederationDeleteOAuthService2MockHandler(),
	getOAuth2FederationLocateOAuthServiceMockHandler(),
];

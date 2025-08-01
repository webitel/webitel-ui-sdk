/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';

import type {
	ApiGetCustomerResponse,
	ApiLicenseUsageResponse,
	ApiLicenseUsersResponse,
	ApiServerInfoResponse,
	ApiUpdateCustomerResponse,
} from '.././_models';

export const getCustomersGetCustomerResponseMock = (
	overrideResponse: Partial<ApiGetCustomerResponse> = {},
): ApiGetCustomerResponse => ({
	customer: faker.helpers.arrayElement([
		{
			createdAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			dnsrv: faker.helpers.arrayElement([
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
				})),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			issuedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			license: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => ({
					competitive: faker.helpers.arrayElement([
						faker.datatype.boolean(),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					limit: faker.helpers.arrayElement([
						faker.number.int({
							min: undefined,
							max: undefined,
							multipleOf: undefined,
						}),
						undefined,
					]),
					notAfter: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					notBefore: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					product: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					remain: faker.helpers.arrayElement([
						faker.number.int({
							min: undefined,
							max: undefined,
							multipleOf: undefined,
						}),
						undefined,
					]),
					scope: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					status: faker.helpers.arrayElement([
						{
							errors: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() =>
									faker.string.alpha({ length: { min: 10, max: 20 } }),
								),
								undefined,
							]),
							notify: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() =>
									faker.string.alpha({ length: { min: 10, max: 20 } }),
								),
								undefined,
							]),
						},
						undefined,
					]),
					users: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => ({
							expiresAt: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							issuedAt: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							prod: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							scope: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() =>
									faker.string.alpha({ length: { min: 10, max: 20 } }),
								),
								undefined,
							]),
							user: faker.helpers.arrayElement([
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
						})),
						undefined,
					]),
				})),
				undefined,
			]),
			limit: faker.helpers.arrayElement([
				{
					[faker.string.alphanumeric(5)]: faker.number.int({
						min: undefined,
						max: undefined,
						multipleOf: undefined,
					}),
				},
				undefined,
			]),
			nextUpdate: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			notAfter: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			notBefore: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			organization: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			revokedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			thisUpdate: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			updatedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			verify: faker.helpers.arrayElement([
				{
					errors: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					notify: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
				},
				undefined,
			]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getCustomersUpdateCustomerResponseMock = (
	overrideResponse: Partial<ApiUpdateCustomerResponse> = {},
): ApiUpdateCustomerResponse => ({
	customer: faker.helpers.arrayElement([
		{
			createdAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			dnsrv: faker.helpers.arrayElement([
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
				})),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			issuedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			license: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => ({
					competitive: faker.helpers.arrayElement([
						faker.datatype.boolean(),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					limit: faker.helpers.arrayElement([
						faker.number.int({
							min: undefined,
							max: undefined,
							multipleOf: undefined,
						}),
						undefined,
					]),
					notAfter: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					notBefore: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					product: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					remain: faker.helpers.arrayElement([
						faker.number.int({
							min: undefined,
							max: undefined,
							multipleOf: undefined,
						}),
						undefined,
					]),
					scope: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					status: faker.helpers.arrayElement([
						{
							errors: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() =>
									faker.string.alpha({ length: { min: 10, max: 20 } }),
								),
								undefined,
							]),
							notify: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() =>
									faker.string.alpha({ length: { min: 10, max: 20 } }),
								),
								undefined,
							]),
						},
						undefined,
					]),
					users: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => ({
							expiresAt: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							issuedAt: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							prod: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							scope: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() =>
									faker.string.alpha({ length: { min: 10, max: 20 } }),
								),
								undefined,
							]),
							user: faker.helpers.arrayElement([
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
						})),
						undefined,
					]),
				})),
				undefined,
			]),
			limit: faker.helpers.arrayElement([
				{
					[faker.string.alphanumeric(5)]: faker.number.int({
						min: undefined,
						max: undefined,
						multipleOf: undefined,
					}),
				},
				undefined,
			]),
			nextUpdate: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			notAfter: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			notBefore: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			organization: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			revokedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			thisUpdate: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			updatedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			verify: faker.helpers.arrayElement([
				{
					errors: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					notify: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
				},
				undefined,
			]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getCustomersLicenseUsageResponseMock = (
	overrideResponse: Partial<ApiLicenseUsageResponse> = {},
): ApiLicenseUsageResponse => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			competitive: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			limit: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			notAfter: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			notBefore: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			product: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			remain: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			scope: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
				undefined,
			]),
			status: faker.helpers.arrayElement([
				{
					errors: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					notify: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
				},
				undefined,
			]),
			users: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => ({
					expiresAt: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					issuedAt: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					prod: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					scope: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					user: faker.helpers.arrayElement([
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
				})),
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

export const getCustomersGetCustomer2ResponseMock = (
	overrideResponse: Partial<ApiGetCustomerResponse> = {},
): ApiGetCustomerResponse => ({
	customer: faker.helpers.arrayElement([
		{
			createdAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			dnsrv: faker.helpers.arrayElement([
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
				})),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			issuedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			license: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => ({
					competitive: faker.helpers.arrayElement([
						faker.datatype.boolean(),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					limit: faker.helpers.arrayElement([
						faker.number.int({
							min: undefined,
							max: undefined,
							multipleOf: undefined,
						}),
						undefined,
					]),
					notAfter: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					notBefore: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					product: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					remain: faker.helpers.arrayElement([
						faker.number.int({
							min: undefined,
							max: undefined,
							multipleOf: undefined,
						}),
						undefined,
					]),
					scope: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					status: faker.helpers.arrayElement([
						{
							errors: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() =>
									faker.string.alpha({ length: { min: 10, max: 20 } }),
								),
								undefined,
							]),
							notify: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() =>
									faker.string.alpha({ length: { min: 10, max: 20 } }),
								),
								undefined,
							]),
						},
						undefined,
					]),
					users: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => ({
							expiresAt: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							id: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							issuedAt: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							prod: faker.helpers.arrayElement([
								faker.string.alpha({ length: { min: 10, max: 20 } }),
								undefined,
							]),
							scope: faker.helpers.arrayElement([
								Array.from(
									{ length: faker.number.int({ min: 1, max: 10 }) },
									(_, i) => i + 1,
								).map(() =>
									faker.string.alpha({ length: { min: 10, max: 20 } }),
								),
								undefined,
							]),
							user: faker.helpers.arrayElement([
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
						})),
						undefined,
					]),
				})),
				undefined,
			]),
			limit: faker.helpers.arrayElement([
				{
					[faker.string.alphanumeric(5)]: faker.number.int({
						min: undefined,
						max: undefined,
						multipleOf: undefined,
					}),
				},
				undefined,
			]),
			nextUpdate: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			notAfter: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			notBefore: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			organization: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			revokedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			thisUpdate: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			updatedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			verify: faker.helpers.arrayElement([
				{
					errors: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					notify: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
				},
				undefined,
			]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getCustomersLicenseUsage2ResponseMock = (
	overrideResponse: Partial<ApiLicenseUsageResponse> = {},
): ApiLicenseUsageResponse => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			competitive: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			limit: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			notAfter: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			notBefore: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			product: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			remain: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			scope: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
				undefined,
			]),
			status: faker.helpers.arrayElement([
				{
					errors: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					notify: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
				},
				undefined,
			]),
			users: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => ({
					expiresAt: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					issuedAt: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					prod: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					scope: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					user: faker.helpers.arrayElement([
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
				})),
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

export const getCustomersLicenseUsage3ResponseMock = (
	overrideResponse: Partial<ApiLicenseUsageResponse> = {},
): ApiLicenseUsageResponse => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			competitive: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			limit: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			notAfter: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			notBefore: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			product: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			remain: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			scope: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
				undefined,
			]),
			status: faker.helpers.arrayElement([
				{
					errors: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					notify: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
				},
				undefined,
			]),
			users: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => ({
					expiresAt: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					issuedAt: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					prod: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					scope: faker.helpers.arrayElement([
						Array.from(
							{ length: faker.number.int({ min: 1, max: 10 }) },
							(_, i) => i + 1,
						).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
						undefined,
					]),
					user: faker.helpers.arrayElement([
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
				})),
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

export const getCustomersLicenseUsersResponseMock = (
	overrideResponse: Partial<ApiLicenseUsersResponse> = {},
): ApiLicenseUsersResponse => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
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
			expiresAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			issuedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			sessions: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			user: faker.helpers.arrayElement([
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

export const getCustomersServerInfoResponseMock = (
	overrideResponse: Partial<ApiServerInfoResponse> = {},
): ApiServerInfoResponse => ({
	key: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	...overrideResponse,
});

export const getCustomersGetCustomerMockHandler = (
	overrideResponse?:
		| ApiGetCustomerResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<ApiGetCustomerResponse> | ApiGetCustomerResponse),
) => {
	return http.get('*/customer', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCustomersGetCustomerResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCustomersUpdateCustomerMockHandler = (
	overrideResponse?:
		| ApiUpdateCustomerResponse
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<ApiUpdateCustomerResponse> | ApiUpdateCustomerResponse),
) => {
	return http.put('*/customer', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCustomersUpdateCustomerResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCustomersLicenseUsageMockHandler = (
	overrideResponse?:
		| ApiLicenseUsageResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<ApiLicenseUsageResponse> | ApiLicenseUsageResponse),
) => {
	return http.get('*/customer/:customerId/license', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCustomersLicenseUsageResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCustomersGetCustomer2MockHandler = (
	overrideResponse?:
		| ApiGetCustomerResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<ApiGetCustomerResponse> | ApiGetCustomerResponse),
) => {
	return http.get('*/customer/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCustomersGetCustomer2ResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCustomersLicenseUsage2MockHandler = (
	overrideResponse?:
		| ApiLicenseUsageResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<ApiLicenseUsageResponse> | ApiLicenseUsageResponse),
) => {
	return http.get('*/license', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCustomersLicenseUsage2ResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCustomersLicenseUsage3MockHandler = (
	overrideResponse?:
		| ApiLicenseUsageResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<ApiLicenseUsageResponse> | ApiLicenseUsageResponse),
) => {
	return http.get('*/products', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCustomersLicenseUsage3ResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCustomersLicenseUsersMockHandler = (
	overrideResponse?:
		| ApiLicenseUsersResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<ApiLicenseUsersResponse> | ApiLicenseUsersResponse),
) => {
	return http.get('*/products/:id/users', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCustomersLicenseUsersResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCustomersServerInfoMockHandler = (
	overrideResponse?:
		| ApiServerInfoResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<ApiServerInfoResponse> | ApiServerInfoResponse),
) => {
	return http.get('*/srvinfo', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCustomersServerInfoResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getCustomersMock = () => [
	getCustomersGetCustomerMockHandler(),
	getCustomersUpdateCustomerMockHandler(),
	getCustomersLicenseUsageMockHandler(),
	getCustomersGetCustomer2MockHandler(),
	getCustomersLicenseUsage2MockHandler(),
	getCustomersLicenseUsage3MockHandler(),
	getCustomersLicenseUsersMockHandler(),
	getCustomersServerInfoMockHandler(),
];

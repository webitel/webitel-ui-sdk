/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { z as zod } from 'zod/v4';

/**
 * @summary default: TODO: indicate objclass=default as a default rights repo
 */
export const accessStoreListDefaultAccessParams = zod.object({
	'object.name': zod.string().describe('display name'),
	'object.id': zod.string().describe('identifier'),
});

export const accessStoreListDefaultAccessQueryParams = zod.object({
	grantor: zod
		.array(zod.string())
		.optional()
		.describe(
			'--- filters ---\n\n[optional] [FROM] each rule owner is any of role(s) id; user -or- role',
		),
	grantee: zod
		.array(zod.string())
		.optional()
		.describe('[optional] [TO] subject role(s) id; user -or- role'),
	granted: zod
		.array(zod.string())
		.optional()
		.describe('[xrwdxrwd] [R]ecord-[b]ased-[A]ccess-[C]ontrol level check(!)'),
	q: zod
		.string()
		.optional()
		.describe('[optional] [TO] subject.name ILIKE ?q=; user -or- role'),
	fields: zod
		.array(zod.string())
		.optional()
		.describe(
			'----- Select Options -------------------------\n\nattributes list',
		),
	sort: zod
		.array(zod.string())
		.optional()
		.describe('e.g.: \"updated_at\" - ASC; \"!updated_at\" - DESC;'),
	size: zod.number().optional().describe('pagedResultsControl\n\ndefault: 16'),
	page: zod.number().optional().describe('default: 1'),
});

export const accessStoreListDefaultAccessResponse = zod.object({
	items: zod
		.array(
			zod.object({
				granted: zod.string().optional(),
				grantee: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
						user: zod.boolean().optional(),
					})
					.optional()
					.describe('RoleId lookup value.'),
				grantor: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
						user: zod.boolean().optional(),
					})
					.optional()
					.describe('RoleId lookup value.'),
			}),
		)
		.optional(),
	next: zod.boolean().optional(),
	page: zod.number().optional(),
});

/**
 * @summary Same as UpdateAccess except for DEFAULT access control system
 */
export const accessStoreToggleDefaultAccessParams = zod.object({
	'object.name': zod.string().describe('display name'),
	'object.id': zod.string().describe('identifier'),
	grantor: zod.string().describe('[FOR] creator user/role'),
});

export const accessStoreToggleDefaultAccessBody = zod.object({
	list: zod
		.array(
			zod.object({
				grantee: zod.string().optional(),
				grants: zod.string().optional(),
				object: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
			}),
		)
		.optional()
		.describe('list of changes ...\n\n[TO] (GRANT/REVOKE)'),
	object: zod.object({}).optional(),
});

export const accessStoreToggleDefaultAccessResponse = zod.object({
	granted: zod
		.array(
			zod.object({
				granted: zod.string().optional(),
				grantee: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
						user: zod.boolean().optional(),
					})
					.optional()
					.describe('RoleId lookup value.'),
				grantor: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
						user: zod.boolean().optional(),
					})
					.optional()
					.describe('RoleId lookup value.'),
			}),
		)
		.optional(),
	revoked: zod
		.array(
			zod.object({
				granted: zod.string().optional(),
				grantee: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
						user: zod.boolean().optional(),
					})
					.optional()
					.describe('RoleId lookup value.'),
				grantor: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
						user: zod.boolean().optional(),
					})
					.optional()
					.describe('RoleId lookup value.'),
			}),
		)
		.optional(),
});

export const accessStoreListObjectAccessParams = zod.object({
	'object.name': zod.string().describe('display name'),
	'object.id': zod.string().describe('identifier'),
});

export const accessStoreListObjectAccessQueryParams = zod.object({
	grantor: zod
		.array(zod.string())
		.optional()
		.describe(
			'--- filters ---\n\n[optional] [FROM] each rule owner is any of role(s) id; user -or- role',
		),
	grantee: zod
		.array(zod.string())
		.optional()
		.describe('[optional] [TO] subject role(s) id; user -or- role'),
	granted: zod
		.array(zod.string())
		.optional()
		.describe('[xrwdxrwd] [R]ecord-[b]ased-[A]ccess-[C]ontrol level check(!)'),
	q: zod
		.string()
		.optional()
		.describe('[optional] [TO] subject.name ILIKE ?q=; user -or- role'),
	fields: zod
		.array(zod.string())
		.optional()
		.describe(
			'----- Select Options -------------------------\n\nattributes list',
		),
	sort: zod
		.array(zod.string())
		.optional()
		.describe('e.g.: \"updated_at\" - ASC; \"!updated_at\" - DESC;'),
	size: zod.number().optional().describe('pagedResultsControl\n\ndefault: 16'),
	page: zod.number().optional().describe('default: 1'),
});

export const accessStoreListObjectAccessResponse = zod.object({
	items: zod
		.array(
			zod.object({
				granted: zod.string().optional(),
				grantee: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
						user: zod.boolean().optional(),
					})
					.optional()
					.describe('RoleId lookup value.'),
				grantor: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
						user: zod.boolean().optional(),
					})
					.optional()
					.describe('RoleId lookup value.'),
			}),
		)
		.optional(),
	next: zod.boolean().optional(),
	page: zod.number().optional(),
});

/**
 * @summary TODO: replace with GrantAccess API, to become command like GRANT REVOKE ... with empty access rights string
 */
export const accessStoreToggleObjectAccessParams = zod.object({
	'object.name': zod.string().describe('display name'),
	'object.id': zod.string().describe('identifier'),
});

export const accessStoreToggleObjectAccessBodyItem = zod.object({
	grantee: zod.string().optional(),
	grants: zod.string().optional(),
	object: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});
export const accessStoreToggleObjectAccessBody = zod.array(
	accessStoreToggleObjectAccessBodyItem,
);

export const accessStoreToggleObjectAccessResponse = zod.object({
	granted: zod.string().optional(),
	revoked: zod.string().optional(),
});

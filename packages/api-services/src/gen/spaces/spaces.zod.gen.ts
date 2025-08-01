/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { z as zod } from 'zod/v4';

/**
 * | Field       | Type 
| ----------- | ---- 
| **----------- READ-ONLY -----------** | 
| `id`        | int64 
| `ver`       | int32 
| `etag`      | string 
| **---------- OPERATIONAL ----------** | 
| `created_at` | int64(epoch:milli) 
| `created_by` | lookup(user) 
| `updated_at` | int64(epoch:milli) 
| `updated_by` | lookup(user) 
| **---------- ATTRIBUTES -----------** | 
| `name`      | name! 
| `home_page`   | string (home_page) 
| `state`       | bool 
| `has_children`| bool 

 */
export const spacesListSpacesQuerySortItemDefault = 'id';
export const spacesListSpacesQuerySortItemRegExp = /^[+|-|!]?\w+$/;
export const spacesListSpacesQueryFieldsItemDefault = '*';

export const spacesListSpacesQueryParams = zod.object({
	page: zod.number().optional(),
	size: zod
		.number()
		.optional()
		.describe(
			'Limit of result page records count.   _default(16); limit=(size<=0?-1:size+1);_\n\n```javascript\nconst\n    default = 16\n  , maximum = 32\n;\n\n```',
		),
	q: zod
		.string()
		.optional()
		.describe(
			'Search term:\n`?` - matches any character\n`*` - matches 0 or more characters\nUsed to query records within a set of `qin` fields, eg: name, etc...',
		),
	sort: zod
		.array(zod.string().regex(spacesListSpacesQuerySortItemRegExp))
		.optional()
		.describe(
			'Sort result dataset of records by fields.\n```\nsort ::= *( ORDER name )\n\nORDER  = ASC / DESC\nDESC   = \"-\" / \"!\"\nASC    = [ \"+\" ]   ; Default\n```\n\nFields available\n\n- `id`(seq)\n- `domain`{name}\n- `state`',
		),
	fields: zod.array(zod.string()).optional(),
	id: zod
		.array(zod.string())
		.optional()
		.describe('Records with unique IDentifier(s).\nAccept: `id` -or- `etag`.'),
});

export const spacesListSpacesResponse = zod.object({
	data: zod
		.array(
			zod.object({
				createdAt: zod
					.string()
					.optional()
					.describe('The timestamp when the space was created (in Unix time).'),
				createdBy: zod
					.object({
						id: zod.string().optional().describe('Reference Object unique ID.'),
						name: zod
							.string()
							.optional()
							.describe('Reference Object display name.'),
						type: zod
							.string()
							.optional()
							.describe('Reference Object well-known type.'),
					})
					.optional()
					.describe(
						'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
					),
				domain: zod
					.object({
						id: zod.string().optional().describe('Reference Object unique ID.'),
						name: zod
							.string()
							.optional()
							.describe('Reference Object display name.'),
						type: zod
							.string()
							.optional()
							.describe('Reference Object well-known type.'),
					})
					.optional()
					.describe(
						'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
					),
				etag: zod
					.string()
					.optional()
					.describe(
						'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
					),
				hasChildren: zod
					.boolean()
					.optional()
					.describe('Indicates if the space has children.'),
				homePage: zod
					.string()
					.optional()
					.describe('BIO. Short description about the space.'),
				id: zod
					.string()
					.optional()
					.describe('The unique ID of the association. Never changes.'),
				mode: zod
					.string()
					.optional()
					.describe('[R]ecord[b]ased[A]ccess[C]ontrol mode granted.'),
				name: zod.string().optional().describe('The name of the space.'),
				state: zod.boolean().optional().describe('The state of the space.'),
				updatedAt: zod
					.string()
					.optional()
					.describe(
						'The timestamp when the space was last updated (in Unix time).',
					),
				updatedBy: zod
					.object({
						id: zod.string().optional().describe('Reference Object unique ID.'),
						name: zod
							.string()
							.optional()
							.describe('Reference Object display name.'),
						type: zod
							.string()
							.optional()
							.describe('Reference Object well-known type.'),
					})
					.optional()
					.describe(
						'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
					),
				ver: zod
					.number()
					.optional()
					.describe(
						'READONLY. Operational attributes\nVersion of the latest update. Numeric sequence.',
					),
			}),
		)
		.optional()
		.describe('Space(s) dataset page.'),
	next: zod.boolean().optional(),
	page: zod
		.number()
		.optional()
		.describe('The page number of the partial result.'),
});

/**
 * @summary Create NEW Space
 */
export const spacesCreateSpaceQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Source Fields to return into result.'),
});

export const spacesCreateSpaceBodyItem = zod
	.object({
		etag: zod
			.string()
			.optional()
			.describe('Unique ID of the latest version of an existing resorce.'),
		homePage: zod
			.string()
			.optional()
			.describe(
				'BIO. Short description about the space.\nOPTIONAL. Multi-lined text.',
			),
		name: zod
			.string()
			.optional()
			.describe('Represents the name of the knowledge base space.'),
		state: zod.boolean().optional().describe('The state of the space.'),
	})
	.describe('The Space principal input.');
export const spacesCreateSpaceBody = zod.array(spacesCreateSpaceBodyItem);

export const spacesCreateSpaceResponse = zod.object({
	createdAt: zod
		.string()
		.optional()
		.describe('The timestamp when the space was created (in Unix time).'),
	createdBy: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	domain: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	etag: zod
		.string()
		.optional()
		.describe(
			'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
		),
	hasChildren: zod
		.boolean()
		.optional()
		.describe('Indicates if the space has children.'),
	homePage: zod
		.string()
		.optional()
		.describe('BIO. Short description about the space.'),
	id: zod
		.string()
		.optional()
		.describe('The unique ID of the association. Never changes.'),
	mode: zod
		.string()
		.optional()
		.describe('[R]ecord[b]ased[A]ccess[C]ontrol mode granted.'),
	name: zod.string().optional().describe('The name of the space.'),
	state: zod.boolean().optional().describe('The state of the space.'),
	updatedAt: zod
		.string()
		.optional()
		.describe('The timestamp when the space was last updated (in Unix time).'),
	updatedBy: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	ver: zod
		.number()
		.optional()
		.describe(
			'READONLY. Operational attributes\nVersion of the latest update. Numeric sequence.',
		),
});

/**
 * @summary Remove Space source
 */
export const spacesDeleteSpaceParams = zod.object({
	etag: zod.string().describe('Unique ID of the latest version of a resource.'),
});

export const spacesDeleteSpaceQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Fields to be retrieved into result of changes.'),
});

export const spacesDeleteSpaceResponse = zod.object({
	createdAt: zod
		.string()
		.optional()
		.describe('The timestamp when the space was created (in Unix time).'),
	createdBy: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	domain: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	etag: zod
		.string()
		.optional()
		.describe(
			'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
		),
	hasChildren: zod
		.boolean()
		.optional()
		.describe('Indicates if the space has children.'),
	homePage: zod
		.string()
		.optional()
		.describe('BIO. Short description about the space.'),
	id: zod
		.string()
		.optional()
		.describe('The unique ID of the association. Never changes.'),
	mode: zod
		.string()
		.optional()
		.describe('[R]ecord[b]ased[A]ccess[C]ontrol mode granted.'),
	name: zod.string().optional().describe('The name of the space.'),
	state: zod.boolean().optional().describe('The state of the space.'),
	updatedAt: zod
		.string()
		.optional()
		.describe('The timestamp when the space was last updated (in Unix time).'),
	updatedBy: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	ver: zod
		.number()
		.optional()
		.describe(
			'READONLY. Operational attributes\nVersion of the latest update. Numeric sequence.',
		),
});

/**
 * @summary Locate spaces source
 */
export const spacesLocateSpaceParams = zod.object({
	etag: zod
		.string()
		.describe(
			'The Space source IDentifier.\nAccept: `etag` (obsolete+) or `id`.',
		),
});

export const spacesLocateSpaceQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Source Fields to return into result.'),
});

export const spacesLocateSpaceResponse = zod.object({
	createdAt: zod
		.string()
		.optional()
		.describe('The timestamp when the space was created (in Unix time).'),
	createdBy: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	domain: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	etag: zod
		.string()
		.optional()
		.describe(
			'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
		),
	hasChildren: zod
		.boolean()
		.optional()
		.describe('Indicates if the space has children.'),
	homePage: zod
		.string()
		.optional()
		.describe('BIO. Short description about the space.'),
	id: zod
		.string()
		.optional()
		.describe('The unique ID of the association. Never changes.'),
	mode: zod
		.string()
		.optional()
		.describe('[R]ecord[b]ased[A]ccess[C]ontrol mode granted.'),
	name: zod.string().optional().describe('The name of the space.'),
	state: zod.boolean().optional().describe('The state of the space.'),
	updatedAt: zod
		.string()
		.optional()
		.describe('The timestamp when the space was last updated (in Unix time).'),
	updatedBy: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	ver: zod
		.number()
		.optional()
		.describe(
			'READONLY. Operational attributes\nVersion of the latest update. Numeric sequence.',
		),
});

/**
 * @summary NEW Update of the Space source
 */
export const spacesUpdateSpaceParams = zod.object({
	etag: zod
		.string()
		.describe('Unique ID of the latest version of an existing resorce.'),
});

export const spacesUpdateSpaceQueryParams = zod.object({
	fields: zod
		.array(zod.string())
		.optional()
		.describe('Source Fields to return into result.'),
});

export const spacesUpdateSpaceBody = zod.object({
	homePage: zod
		.string()
		.optional()
		.describe(
			'BIO. Short description about the space.\nOPTIONAL. Multi-lined text.',
		),
	name: zod
		.string()
		.optional()
		.describe('Represents the name of the knowledge base space.'),
	state: zod.boolean().optional().describe('The state of the space.'),
});

export const spacesUpdateSpaceResponse = zod.object({
	createdAt: zod
		.string()
		.optional()
		.describe('The timestamp when the space was created (in Unix time).'),
	createdBy: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	domain: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	etag: zod
		.string()
		.optional()
		.describe(
			'Unique ID of the latest version of the update.\nThis ID changes after any update to the underlying value(s).',
		),
	hasChildren: zod
		.boolean()
		.optional()
		.describe('Indicates if the space has children.'),
	homePage: zod
		.string()
		.optional()
		.describe('BIO. Short description about the space.'),
	id: zod
		.string()
		.optional()
		.describe('The unique ID of the association. Never changes.'),
	mode: zod
		.string()
		.optional()
		.describe('[R]ecord[b]ased[A]ccess[C]ontrol mode granted.'),
	name: zod.string().optional().describe('The name of the space.'),
	state: zod.boolean().optional().describe('The state of the space.'),
	updatedAt: zod
		.string()
		.optional()
		.describe('The timestamp when the space was last updated (in Unix time).'),
	updatedBy: zod
		.object({
			id: zod.string().optional().describe('Reference Object unique ID.'),
			name: zod.string().optional().describe('Reference Object display name.'),
			type: zod
				.string()
				.optional()
				.describe('Reference Object well-known type.'),
		})
		.optional()
		.describe(
			'Lookup reference information.\nSimplified search filter to uniquely identify related object.',
		),
	ver: zod
		.number()
		.optional()
		.describe(
			'READONLY. Operational attributes\nVersion of the latest update. Numeric sequence.',
		),
});

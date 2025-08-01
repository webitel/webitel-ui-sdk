/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { z as zod } from 'zod/v4';

export const importTemplateServiceSearchImportTemplateQueryParams = zod.object({
	page: zod.number().optional(),
	size: zod.number().optional(),
	q: zod.string().optional(),
	sort: zod.string().optional(),
	fields: zod.array(zod.string()).optional(),
	id: zod.array(zod.number()).optional(),
});

export const importTemplateServiceSearchImportTemplateResponseItemsItemSourceTypeDefault =
	'DefaultSourceType';

export const importTemplateServiceSearchImportTemplateResponse = zod.object({
	items: zod
		.array(
			zod.object({
				parameters: zod.object({}).optional(),
				description: zod.string().optional(),
				id: zod.number().optional(),
				name: zod.string().optional(),
				source: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				sourceId: zod.string().optional(),
				sourceType: zod
					.enum(['DefaultSourceType', 'Dialer'])
					.default(
						importTemplateServiceSearchImportTemplateResponseItemsItemSourceTypeDefault,
					),
			}),
		)
		.optional(),
	next: zod.boolean().optional(),
});

export const importTemplateServiceCreateImportTemplateBodySourceTypeDefault =
	'DefaultSourceType';

export const importTemplateServiceCreateImportTemplateBody = zod
	.object({
		parameters: zod.object({}),
		description: zod.string().optional(),
		name: zod.string(),
		source: zod
			.object({
				id: zod.string().optional(),
				name: zod.string().optional(),
			})
			.optional(),
		sourceId: zod.string(),
		sourceType: zod
			.enum(['DefaultSourceType', 'Dialer'])
			.default(importTemplateServiceCreateImportTemplateBodySourceTypeDefault),
	})
	.describe('Create import template for CSV');

export const importTemplateServiceCreateImportTemplateResponseSourceTypeDefault =
	'DefaultSourceType';

export const importTemplateServiceCreateImportTemplateResponse = zod.object({
	parameters: zod.object({}).optional(),
	description: zod.string().optional(),
	id: zod.number().optional(),
	name: zod.string().optional(),
	source: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	sourceId: zod.string().optional(),
	sourceType: zod
		.enum(['DefaultSourceType', 'Dialer'])
		.default(
			importTemplateServiceCreateImportTemplateResponseSourceTypeDefault,
		),
});

export const importTemplateServiceDeleteImportTemplateParams = zod.object({
	id: zod.number(),
});

export const importTemplateServiceDeleteImportTemplateResponseSourceTypeDefault =
	'DefaultSourceType';

export const importTemplateServiceDeleteImportTemplateResponse = zod.object({
	parameters: zod.object({}).optional(),
	description: zod.string().optional(),
	id: zod.number().optional(),
	name: zod.string().optional(),
	source: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	sourceId: zod.string().optional(),
	sourceType: zod
		.enum(['DefaultSourceType', 'Dialer'])
		.default(
			importTemplateServiceDeleteImportTemplateResponseSourceTypeDefault,
		),
});

export const importTemplateServiceReadImportTemplateParams = zod.object({
	id: zod.number(),
});

export const importTemplateServiceReadImportTemplateResponseSourceTypeDefault =
	'DefaultSourceType';

export const importTemplateServiceReadImportTemplateResponse = zod.object({
	parameters: zod.object({}).optional(),
	description: zod.string().optional(),
	id: zod.number().optional(),
	name: zod.string().optional(),
	source: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	sourceId: zod.string().optional(),
	sourceType: zod
		.enum(['DefaultSourceType', 'Dialer'])
		.default(importTemplateServiceReadImportTemplateResponseSourceTypeDefault),
});

export const importTemplateServicePatchImportTemplateParams = zod.object({
	id: zod.number(),
});

export const importTemplateServicePatchImportTemplateBody = zod
	.object({
		parameters: zod.object({}).optional(),
		description: zod.string().optional(),
		fields: zod.array(zod.string()).optional(),
		id: zod.number(),
		name: zod.string().optional(),
	})
	.describe('Patch import template for CSV');

export const importTemplateServicePatchImportTemplateResponseSourceTypeDefault =
	'DefaultSourceType';

export const importTemplateServicePatchImportTemplateResponse = zod.object({
	parameters: zod.object({}).optional(),
	description: zod.string().optional(),
	id: zod.number().optional(),
	name: zod.string().optional(),
	source: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	sourceId: zod.string().optional(),
	sourceType: zod
		.enum(['DefaultSourceType', 'Dialer'])
		.default(importTemplateServicePatchImportTemplateResponseSourceTypeDefault),
});

export const importTemplateServiceUpdateImportTemplateParams = zod.object({
	id: zod.number(),
});

export const importTemplateServiceUpdateImportTemplateBody = zod
	.object({
		parameters: zod.object({}).optional(),
		description: zod.string().optional(),
		id: zod.number(),
		name: zod.string(),
		source: zod
			.object({
				id: zod.string().optional(),
				name: zod.string().optional(),
			})
			.optional(),
	})
	.describe('Update import template for CSV');

export const importTemplateServiceUpdateImportTemplateResponseSourceTypeDefault =
	'DefaultSourceType';

export const importTemplateServiceUpdateImportTemplateResponse = zod.object({
	parameters: zod.object({}).optional(),
	description: zod.string().optional(),
	id: zod.number().optional(),
	name: zod.string().optional(),
	source: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	sourceId: zod.string().optional(),
	sourceType: zod
		.enum(['DefaultSourceType', 'Dialer'])
		.default(
			importTemplateServiceUpdateImportTemplateResponseSourceTypeDefault,
		),
});

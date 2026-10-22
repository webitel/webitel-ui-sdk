import { z } from 'zod';

import { ApplicationsAccess } from '../../scripts';

/** [Claude] a global action granted to the role, e.g. `playback_record_file` */
const rolePermissionSchema = z.looseObject({
	id: z.string(),
	name: z.string().optional(),
});

/**
 * [Claude] The role's access to each app and its sections, as the tree built
 * by `ApplicationsAccess`; a new role starts with everything allowed.
 */
const roleMetadataSchema = z.looseObject({
	access: z
		.record(z.string(), z.unknown())
		.default(() => new ApplicationsAccess().getAccess()),
});

export type RolePermission = z.infer<typeof rolePermissionSchema>;

export type RoleCard = {
	id?: string | number;
	name?: string;
	description?: string;
	permissions?: RolePermission[];
	metadata?: z.infer<typeof roleMetadataSchema>;
};

export const roleSchema = z.object({
	id: z
		.union([
			z.string(),
			z.number(),
		])
		.optional(),
	name: z.string().min(1).default(''),
	description: z.string().optional().default(''),
	permissions: z.array(rolePermissionSchema).default([]),
	metadata: roleMetadataSchema.prefault({}),
});

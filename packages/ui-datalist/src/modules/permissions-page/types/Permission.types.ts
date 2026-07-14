import type { AccessRuleName } from '@webitel/ui-sdk/modules/ObjectPermissions/enums';
import type { ApiModule, Id } from '@webitel/ui-sdk/src/api/types/ApiModule';

export interface PermissionGrantee {
	id: Id;
	name?: string;
	user?: boolean;
}

export interface PermissionAccessRule {
	id: number;
	rule: string;
}

export interface PermissionEntity {
	id: string;
	etag?: string;
	grantee: PermissionGrantee;
	access: Record<AccessRuleName, PermissionAccessRule>;
}

export interface PermissionsChange {
	grantee: number;
	grants: string;
}

/**
 * Permissions API shape, as produced by generatePermissionsApi (ui-sdk / api-services),
 * spread into every card API module (e.g. `...generatePermissionsApi(baseUrl)`).
 */
export interface RawPermissionsApiModule {
	getPermissionsList: ApiModule<PermissionEntity>['getList'];
	patchPermissions: (payload: {
		id: Id;
		changes: PermissionsChange[];
	}) => Promise<unknown>;
}

export interface ChangeAccessModePayload {
	item: PermissionEntity;
	ruleName: AccessRuleName;
	mode:
		| {
				id: number;
		  }
		| number;
}

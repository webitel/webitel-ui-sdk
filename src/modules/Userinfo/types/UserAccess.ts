import type {
	RouteLocationNormalized,
	RouteLocationResolved,
} from 'vue-router';

import type {
	AdminSections,
	AuditorSections,
	CrmSections,
	CrudAction,
	SupervisorSections,
	WfmSections,
	WtApplication,
	WtObject,
} from '../../../enums';
import type { ApplicationsAccessSchema } from '../classes/ApplicationsAccess';
import type {
	CrudGlobalAction,
	ScopeClass,
	SpecialGlobalAction,
	WebitelLicense,
} from '../enums';

/**
 * @description
 * Represents union of all Webitel web client applications/sections
 * */
export type UiSection =
	| AdminSections
	| AuditorSections
	| SupervisorSections
	| CrmSections
	| WfmSections;

export type FullUiSectionName = `${WtApplication}/${UiSection}`;

/**
 * @internal
 * @description Received from backend
 * */
export type GlobalAction = CrudGlobalAction | SpecialGlobalAction;

/**
 * @internal
 * */
export interface GlobalAccessApiResponseItem {
	id: GlobalAction;
	name: string;
	usage: string;
}

/**
 * @internal
 * */
export interface ScopeAccessApiResponseItem {
	class: ScopeClass;
	access: string;
}

/**
 * @internal
 * @description
 * Represents admin->permissions->roles->access.
 * */
export type VisibilityAccess = ApplicationsAccessSchema;

/**
 * @internal
 * @description
 * Represents raw access data, received from backend.
 * */
export interface CreateUserAccessStoreRawAccess {
	permissions: GlobalAccessApiResponseItem[];
	scope: ScopeAccessApiResponseItem[];
	access: VisibilityAccess;
	license: WebitelLicenseInfo[];
}

/**
 * @internal
 */
export interface CreateUserAccessStoreConfig {
	/**
	 * @default 'userinfo'
	 * */
	namespace?: string;
}

/**
 * @description
 * Map is used for quick access to user permissions
 * */
export type GlobalActionAccessMap = Map<
	CrudAction | SpecialGlobalAction,
	boolean
>;

/**
 * @description
 * Map is used for quick access to user permissions
 * */
export type ScopeAccessMap = Map<WtObject, Map<CrudAction, boolean>>;

/**
 * @description
 * Map is used for quick access to user permissions
 * */
export type AppVisibilityMap = Map<WtApplication, boolean>;

/**
 * @description
 * Map is used for quick access to user permissions
 * */
export type SectionVisibilityMap = Map<FullUiSectionName, boolean>;

/**
 * [Claude] Route that access is checked for: a navigation target or a result of
 * [Claude] `router.resolve()` (its `name` may be `null`).
 */
export type AccessGuardRoute = RouteLocationNormalized | RouteLocationResolved;

/**
 * [Claude] Checks route access by `to` only, so it can be called directly to get
 * [Claude] a verdict (`=== true`) and still be passed to `router.beforeEach`.
 */
export type RouteAccessGuard = (to: AccessGuardRoute) =>
	| true
	| {
			path: string;
	  };

export interface UserAccessStore {
	initialize: (rawAccess: CreateUserAccessStoreRawAccess) => void;

	hasReadAccess: (object?: WtObject) => boolean;
	hasCreateAccess: (object?: WtObject) => boolean;
	hasUpdateAccess: (object?: WtObject) => boolean;
	hasDeleteAccess: (object?: WtObject) => boolean;

	routeAccessGuard: RouteAccessGuard;

	hasSpecialGlobalActionAccess: (id: SpecialGlobalAction) => boolean;
	hasGlobalCrudActionAccess: (action: CrudAction) => boolean;
	hasLicense: (license: WebitelLicense) => boolean;

	hasApplicationVisibility: (app: WtApplication) => boolean;
	hasSectionVisibility: (params: {
		section: UiSection;
		object: WtObject;
		app: WtApplication;
	}) => boolean;

	/**
	 * @internal
	 * for pinia devtools debug
	 */
	globalAccess: GlobalActionAccessMap;

	/**
	 * @internal
	 * for pinia devtools debug
	 */
	scopeAccess: ScopeAccessMap;

	/**
	 * @internal
	 * for pinia devtools debug
	 */
	appVisibilityAccess: AppVisibilityMap;

	/**
	 * @internal
	 * for pinia devtools debug
	 */
	sectionVisibilityAccess: SectionVisibilityMap;

	/**
	 * @internal
	 * for pinia devtools debug
	 */
	licenseAccess: LicenseAccessMap;
}

export type WebitelLicenseInfo = {
	prod: WebitelLicense;
	scope: ScopeClass[];
	id: string;
	expiresAt: string; // timestamp
	issuedAt: string; // timestamp
};

export type LicenseAccessMap = Map<WebitelLicense, WebitelLicenseInfo[]>;

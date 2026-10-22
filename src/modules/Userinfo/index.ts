// [Claude] moved to api-services, where the roles api restores the access with it
export { ApplicationsAccess } from '@webitel/api-services/scripts';
export { createUserAccessControlComposable } from './composables/createUserAccessControl';
export {
	hasLookupFieldReadAccess,
	useLookupFieldReadAccess,
} from './composables/useLookupFieldReadAccess';

export {
	CrudGlobalAction,
	ScopeClass,
	SpecialGlobalAction,
	WebitelLicense,
} from './enums';
export {
	type FilterHasReadAccess,
	FilterReadAccessKey,
	injectFilterReadAccess,
	provideFilterReadAccess,
} from './injection/filterReadAccess';
export { createUserinfoStore } from './stores/userinfoStore';

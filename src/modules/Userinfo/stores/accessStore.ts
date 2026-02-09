import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { NavigationGuard } from 'vue-router';

import { CrudAction, type WtApplication, type WtObject } from '../../../enums';
import type { SpecialGlobalAction, WebitelLicense } from '../enums';
import { wtObjectsWithGlobalSpecialActionAccessAsChecksSource } from '../mappings/mappings';
import {
	getWtAppByUiSection,
	makeAppVisibilityMap,
	makeGlobalAccessMap,
	makeLicenseAccessMap,
	makeScopeAccessMap,
	makeSectionVisibilityMap,
	shouldUseGlobalCrudActionAccessAsChecksSource,
	shouldUseGlobalSpecialActionAccessAsChecksSource,
} from '../scripts/utils';
import type {
	AppVisibilityMap,
	CreateUserAccessStoreConfig,
	CreateUserAccessStoreRawAccess,
	GlobalActionAccessMap,
	ScopeAccessMap,
	SectionVisibilityMap,
	UiSection,
	UserAccessStore,
	WebitelLicenseInfo,
} from '../types/UserAccess.d';

export const createUserAccessStore = ({
	namespace = 'userinfo',
}: CreateUserAccessStoreConfig = {}) => {
	return defineStore(`${namespace}/access`, (): UserAccessStore => {
		const globalAccess = ref<GlobalActionAccessMap>(new Map());

		const scopeAccess = ref<ScopeAccessMap>(new Map());

		const appVisibilityAccess = ref<AppVisibilityMap>(new Map());

		const sectionVisibilityAccess = ref<SectionVisibilityMap>(new Map());

		const licenseAccess = ref<Map<WebitelLicense, WebitelLicenseInfo[]>>(
			new Map(),
		);

		// Bypass mode for when no access data exists (new projects)
		const bypassMode = ref<boolean>(false);

		const hasAccess = (
			action: CrudAction | SpecialGlobalAction,
			object: WtObject,
		) => {
			/* scope exceptions handling */

			if (shouldUseGlobalSpecialActionAccessAsChecksSource(object)) {
				return hasSpecialGlobalActionAccess(
					wtObjectsWithGlobalSpecialActionAccessAsChecksSource[object],
				);
			}

			if (shouldUseGlobalCrudActionAccessAsChecksSource(object)) {
				return hasGlobalCrudActionAccess(action as CrudAction);
			}

			const allowScopeAccess = scopeAccess.value
				.get(object)
				?.get(action as CrudAction);
			return !!allowScopeAccess;
		};

		const hasReadAccess = (object?: WtObject) => {
			return hasAccess(CrudAction.Read, object);
		};

		const hasCreateAccess = (object?: WtObject) => {
			return hasAccess(CrudAction.Create, object);
		};

		const hasUpdateAccess = (object?: WtObject) => {
			return hasAccess(CrudAction.Update, object);
		};

		const hasDeleteAccess = (object?: WtObject) => {
			return hasAccess(CrudAction.Delete, object);
		};

		const hasApplicationVisibility = (app: WtApplication) => {
			return appVisibilityAccess.value.get(app);
		};

		const hasSectionVisibility = (section: UiSection, object: WtObject) => {
			if (bypassMode.value) return true;

			const appOfSection = getWtAppByUiSection(section);
			const objectOfSection = object; /*castUiSectionToWtObject(section)*/
			const hasSectionVisibilityAccess = (section: UiSection) => {
				return sectionVisibilityAccess.value.get(section);
			};

			const allowAppVisibility = hasApplicationVisibility(appOfSection);
			const allowObjectAccess = hasReadAccess(objectOfSection);
			const allowSectionVisibility = hasSectionVisibilityAccess(section);

			return allowAppVisibility && allowObjectAccess && allowSectionVisibility;
		};

		const routeAccessGuard: NavigationGuard = (to) => {
			let wtApplication = to.matched
				.toReversed()
				.find(({ meta }) => meta.WtApplication)?.meta?.WtApplication as
				| WtApplication
				| ((RouteLocationNormalized) => WtApplication);

			/* find last because "matched" has top=>bottom routes order */
			let uiSection = to.matched.toReversed().find(({ meta }) => meta.UiSection)
				?.meta?.UiSection as
				| UiSection
				| ((RouteLocationNormalized) => UiSection);
			/* find last because "matched" has top=>bottom routes order */
			let wtObject = to.matched.toReversed().find(({ meta }) => meta.UiSection)
				?.meta?.WtObject as WtObject | ((RouteLocationNormalized) => WtObject);

			// if, then compute fn
			if (typeof wtApplication === 'function') {
				wtApplication = wtApplication(to);
			}

			// if, then compute fn
			if (typeof uiSection === 'function') {
				uiSection = uiSection(to);
			}
			// if, then compute fn
			if (typeof wtObject === 'function') {
				wtObject = wtObject(to);
			}

			if (wtApplication && !hasApplicationVisibility(wtApplication)) {
				return {
					path: '/access-denied',
				};
			}

			if (uiSection && !hasSectionVisibility(uiSection, wtObject)) {
				return {
					path: '/access-denied',
				};
			}

			return true;
		};

		const hasGlobalCrudActionAccess = (action: CrudAction): boolean => {
			return !!globalAccess.value.get(action);
		};

		const hasSpecialGlobalActionAccess = (id: SpecialGlobalAction): boolean => {
			return !!globalAccess.value.get(id);
		};

		const hasLicense = (license: WebitelLicense): boolean => {
			return !!globalAccess.value.get(license);
		};

		const initialize = ({
			permissions: rawGlobalAccess,
			scope: rawScopeAccess,
			access: rawVisibilityAccess,
			license: rawLicenseAccess,
		}: CreateUserAccessStoreRawAccess) => {
			// Enable bypass mode if access data is null/undefined
			bypassMode.value = rawVisibilityAccess === null;

			globalAccess.value = makeGlobalAccessMap(rawGlobalAccess);
			scopeAccess.value = makeScopeAccessMap(rawScopeAccess);
			appVisibilityAccess.value = makeAppVisibilityMap(rawVisibilityAccess);
			sectionVisibilityAccess.value =
				makeSectionVisibilityMap(rawVisibilityAccess);
			licenseAccess.value = makeLicenseAccessMap(rawLicenseAccess);
		};

		return {
			initialize,

			hasReadAccess,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,
			hasSectionVisibility,

			routeAccessGuard,
			hasGlobalCrudActionAccess,
			hasSpecialGlobalActionAccess,
			hasApplicationVisibility,
			hasLicense,

			/**
			 * @internal
			 * for pinia devtools debug
			 */
			// @ts-expect-error
			globalAccess,
			// @ts-expect-error
			scopeAccess,
			// @ts-expect-error
			appVisibilityAccess,
			// @ts-expect-error
			sectionVisibilityAccess,
			// @ts-expect-error
			licenseAccess,
		};
	});
};

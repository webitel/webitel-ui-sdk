import pick from 'lodash/pick';
import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';

import { getSession, getUiVisibilityAccess, logout } from '../api/UserinfoAPI';
import { createUserAccessStore } from './accessStore';
import { createSettingsStore } from './settingsStore';

export const createUserinfoStore = () => {
	const namespace = 'userinfo';
	const useAccessStore = createUserAccessStore({
		namespace,
	});
	const useSettingsStore = createSettingsStore({
		namespace,
	});

	const store = defineStore(namespace, () => {
		const accessStore = useAccessStore();
		const {
			hasReadAccess,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,
			hasLicense,
			initialize: initializeAccessStore,
			routeAccessGuard,
			hasGlobalCrudActionAccess,
			hasSpecialGlobalActionAccess,
			hasSectionVisibility,
			hasApplicationVisibility,
		} = accessStore;

		const settingsStore = useSettingsStore();
		const { initialize: initializeSettingsStore } = settingsStore;
		const { timezone } = storeToRefs(settingsStore);

		const userId = ref();
		const userInfo = ref();

		const initialize = async () => {
			const session = await getSession();
			const access = await getUiVisibilityAccess();

			userId.value = session.userId;
			userInfo.value = pick(session, [
				'domainId',
				'username',
				'permissions',
				'userId',
				'preferredUsername',
				'scope',
				'roles',
			]);

			initializeAccessStore({
				scope: session.scope,
				permissions: session.permissions,
				license: session.license,
				access,
			});

			await initializeSettingsStore();
		};

		const logoutUser = async () => {
			const authUrl = import.meta.env.VITE_AUTH_URL;
			if (!authUrl) throw new Error('No authUrl for LOGOUT provided');
			await logout();
			window.location.href = authUrl;
		};

		return {
			userId,
			userInfo,
			timezone,
			initialize,

			hasReadAccess,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,
			hasLicense,

			hasSectionVisibility,
			routeAccessGuard,
			hasGlobalCrudActionAccess,
			hasSpecialGlobalActionAccess,
			hasApplicationVisibility,
			logoutUser,
		};
	});

	// @ts-expect-error
	window._userinfoStore = store;

	return store;
};

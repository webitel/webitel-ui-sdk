import pick from 'lodash/pick';
import { defineStore } from 'pinia';
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
			initialize: initializeAccessStore,
			routeAccessGuard,
			hasSpecialGlobalActionAccess,
			hasSectionVisibility,
			hasApplicationVisibility,
		} = accessStore;
		const { initialize: initializeSettingsStore, timezone } =
			useSettingsStore();

		const userId = ref();
		const userInfo = ref(null);

		const initialize = async () => {
			const session = await getSession();
			const access = await getUiVisibilityAccess();

			userId.value = session.userId;
			userInfo.value = pick(session, [
				'domainId',
				'username',
				'permissions',
				'userId',
				'scope',
				'roles',
				'license',
			]);

			initializeAccessStore({
				scope: session.scope,
				permissions: session.permissions,
				access,
			});

			await initializeSettingsStore();
		};

		const logoutUser = async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
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

			hasSectionVisibility,
			routeAccessGuard,
			hasSpecialGlobalActionAccess,
			hasApplicationVisibility,
			logoutUser,
		};
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	window._userinfoStore = store;

	return store;
};

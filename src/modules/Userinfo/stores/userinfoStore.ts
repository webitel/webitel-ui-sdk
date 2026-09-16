import { pick } from 'lodash-es';
import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { createUserNotificationsStore } from '../../UserNotifications/stores/userNotificationsStore';
import { getSession, getUiVisibilityAccess, logout } from '../api/UserinfoAPI';
import type { UserAccessStore } from '../types/UserAccess';
import { createUserAccessStore } from './accessStore';
import { createSettingsStore } from './settingsStore';

let createdUserinfoStore: ReturnType<typeof createUserinfoStore> | undefined;

export const getUserinfoStore = () => {
	if (!createdUserinfoStore) {
		throw new Error(
			'Userinfo store is not created. Call createUserinfoStore() during app init.',
		);
	}

	return createdUserinfoStore() as unknown as Pick<
		UserAccessStore,
		'hasReadAccess'
	>;
};

export const createUserinfoStore = () => {
	const namespace = 'userinfo';
	const useAccessStore = createUserAccessStore({
		namespace,
	});
	const useSettingsStore = createSettingsStore({
		namespace,
	});

	const useUserNotificationsStore = createUserNotificationsStore();

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
		const userNotificationsStore = useUserNotificationsStore();
		const { showNotifications, clearShownUserNotifications } =
			userNotificationsStore;

		const userId = ref();
		const userInfo = ref();

		const initialize = async () => {
			const session = await getSession();
			const access = await getUiVisibilityAccess();

			userId.value = session.userId;
			userInfo.value = pick(session, [
				'domain',
				'username',
				'permissions',
				'userId',
				'preferredUsername',
				'scope',
				'roles',
				'name',
				'chatName',
			]);

			initializeAccessStore({
				scope: session.scope,
				permissions: session.permissions,
				license: session.license,
				access,
			});

			await initializeSettingsStore();
		};

		const showUserNotifications = () => showNotifications(userId.value);

		const clearStorageNotifications = (ids?: string | string[]): void =>
			clearShownUserNotifications(ids ?? userId.value);

		const logoutUser = async () => {
			const authUrl = import.meta.env.VITE_AUTH_URL;
			if (!authUrl) throw new Error('No authUrl for LOGOUT provided');
			await logout();
			clearStorageNotifications();
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
			showUserNotifications,
			clearStorageNotifications,
		};
	});

	createdUserinfoStore = store;

	return store;
};

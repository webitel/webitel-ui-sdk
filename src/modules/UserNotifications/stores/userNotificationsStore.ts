import type { ApiUserWarning } from '@webitel/api-services/gen/models';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import i18n from '../../../locale/i18n';
import eventBus from '../../../scripts/eventBus';
import { getUserWarnings } from '../api/UserNotifications';
import { USER_NOTIFICATION_CONFIGS_MAP } from '../maps/userNotificationConfigsMap';
import type { NotificationsType } from '../types/UserNotifications';

const STORAGE_KEY = 'usersWithShownNotifications';

export const createUserNotificationsStore = () => {
	const namespace = 'userNotifications';

	const store = defineStore(namespace, () => {
		const notifications = ref<NotificationsType[]>([]);

		const getStoredUsers = (): string[] => {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		};

		const isShownUserNotifications = (userId: string): boolean =>
			getStoredUsers().includes(userId);

		const setShownUserNotifications = (userId: string) => {
			const shown = getStoredUsers();
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify([
					...new Set([
						...shown,
						userId,
					]),
				]),
			);
		};

		const clearShownUserNotifications = (userId: string) => {
			const shown = getStoredUsers().filter((id: string) => id !== userId);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(shown));
		};

		const fetchNotifications = async (): Promise<ApiUserWarning[]> => {
			const response = await getUserWarnings();
			return (response?.warnings as ApiUserWarning[]) ?? [];
		};

		const mapNotifications = (array: ApiUserWarning[]) => {
			return array
				.map((warning) => {
					const map = USER_NOTIFICATION_CONFIGS_MAP.get(warning.id);
					if (!map) return null;
					return map(warning);
				})
				.filter(Boolean) as NotificationsType[];
		};

		const emitNotification = ({
			type,
			localeKey,
			params,
		}: NotificationsType) => {
			const locale = localStorage.getItem('lang') || i18n.global.locale.value;
			setTimeout(
				() =>
					eventBus.$emit('notification', {
						type,
						text: i18n.global.t(
							`systemNotifications.warnings.${localeKey}`,
							{
								...params,
							},
							{
								locale,
							},
						),
					}),
				100,
			);
		};

		const showNotifications = async (userId: string) => {
			try {
				if (isShownUserNotifications(userId)) return;

				const apiNotifications = await fetchNotifications();
				notifications.value = mapNotifications(apiNotifications);

				if (!notifications.value?.length) return;

				notifications.value.forEach((notification) => {
					emitNotification(notification);
				});

				setShownUserNotifications(userId);
			} catch (err) {
				throw err;
			}
		};

		return {
			showNotifications,
			clearShownUserNotifications,
		};
	});

	return store;
};

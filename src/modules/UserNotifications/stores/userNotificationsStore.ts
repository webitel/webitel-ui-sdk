import type { ApiUserWarning } from '@webitel/api-services/gen/models';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import i18n from '../../../locale/i18n';
import eventBus from '../../../scripts/eventBus';
import isEmpty from '../../../scripts/isEmpty';
import { getUserWarnings } from '../api/UserNotifications';
import { USER_NOTIFICATION_CONFIGS_MAP } from '../classes/UserNotifications';
import type { NotificationsType } from '../types/UserNotifications';

export const createUserNotificationsStore = () => {
	const namespace = 'userNotifications';

	const store = defineStore(namespace, () => {
		const notifications = ref<NotificationsType[]>([]);

		const getStorageKey = (userId: string) =>
			`userNotifications/${userId}/shown`;

		const getShownMap = (userId: string): Record<string, boolean> =>
			JSON.parse(localStorage.getItem(getStorageKey(userId))) || {};

		const setShownMap = (userId: string, map: Record<string, boolean>) => {
			localStorage.setItem(getStorageKey(userId), JSON.stringify(map));
		};

		const clearShownMap = (userId: string) => {
			localStorage.removeItem(getStorageKey(userId));
		};

		const fetchNotifications = async (): Promise<ApiUserWarning[]> => {
			const response = await getUserWarnings();
			return (response?.warnings as ApiUserWarning[]) ?? [];
		};

		const mapNotifications = (array: ApiUserWarning[]) => {
			return array
				.map(({ id, warningData: data }) => {
					const NotificationConfig = USER_NOTIFICATION_CONFIGS_MAP.get(id);
					if (!NotificationConfig) return null;
					return new NotificationConfig({
						id,
						warningData: data,
					});
				})
				.filter(Boolean) as NotificationsType[];
		};

		const emitNotification = ({
			type,
			localeKey,
			params,
		}: NotificationsType) => {
			const locale = localStorage.getItem('lang') || i18n.global.locale.value;
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
			});
		};

		const deferSendNotification = (notification: NotificationsType) => {
			// @author @Lera24
			// Defer notification emit to ensure the app is fully initialized
			// and UI is rendered before showing the notification
			setTimeout(() => {
				emitNotification(notification);
			}, 100);
		};

		const loadingCurrentNotifications = async (
			map: Record<string, boolean>,
		) => {
			if (!isEmpty(map)) return map;

			const apiNotifications = await fetchNotifications();
			notifications.value = mapNotifications(apiNotifications);
		};

		const filterUnshownNotifications = (
			notificationsToFilter: NotificationsType[],
			map: Record<string, boolean>,
		): NotificationsType[] => {
			return notificationsToFilter.filter(
				(notification) => !map[notification.id],
			);
		};

		const displayUnshownNotificaions = (
			unshown: NotificationsType[],
			map: Record<string, boolean>,
		) => {
			unshown.forEach((notification) => {
				try {
					deferSendNotification(notification);
					map[notification.id] = true;
					notification.shown = true; // TODO: saving shown state for future
				} catch (err) {
					console.error('Error sending notification', notification.id, err);
				}
			});
		};

		const showNotifications = async (userId: string) => {
			try {
				const shownMap = getShownMap(userId);

				await loadingCurrentNotifications(shownMap);
				if (!notifications.value?.length) return;

				const unshown = filterUnshownNotifications(
					notifications.value,
					shownMap,
				);
				if (!unshown.length) return;

				displayUnshownNotificaions(unshown, shownMap);
				setShownMap(userId, shownMap);
			} catch (err) {
				throw err;
			}
		};

		return {
			showNotifications,
			clearShownMap,
		};
	});

	return store;
};

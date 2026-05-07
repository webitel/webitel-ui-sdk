import type { ApiUserWarning } from '@webitel/api-services/gen/models';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import i18n from '../../../locale/i18n';
import eventBus from '../../../scripts/eventBus';
import isEmpty from '../../../scripts/isEmpty';
import { getUserWarnings } from '../api/UserNotifications';
import { USER_NOTIFICATION_CONFIGS_MAP } from '../maps/userNotificationConfigsMap';
import type {
	NotificationsType,
	UserNotificationsConfigs,
} from '../types/UserNotifications';

export const createUserNotificationsStore = () => {
	const namespace = 'userNotifications';

	const store = defineStore(namespace, () => {
		const notifications = ref<NotificationsType[]>([]);

		const getStorageKey = (userId: string) =>
			`userNotifications/${userId}/shown`;

		const getShownMap = (userId: string): Record<string, boolean> =>
			JSON.parse(localStorage.getItem(getStorageKey(userId))) || {};

		const setShownMap = (
			userId: string,
			map: Record<string, boolean>,
		): void => {
			localStorage.setItem(getStorageKey(userId), JSON.stringify(map));
		};

		const clearShownMap = (userId: string): void => {
			localStorage.removeItem(getStorageKey(userId));
		};

		const fetchNotifications = async (): Promise<ApiUserWarning[]> => {
			const response = await getUserWarnings();
			return (response?.warnings as ApiUserWarning[]) ?? [];
		};

		const mapNotifications = (array: ApiUserWarning[]) => {
			notifications.value = array
				.map(({ id, warningData: data }) => {
					const config: UserNotificationsConfigs =
						USER_NOTIFICATION_CONFIGS_MAP.get(id);
					if (!config) return null;

					return {
						id: config.getId(data),
						type: config.type,
						localeKey: config.getLocaleKey(data),
						params: config.getParams(data),
					};
				})
				.filter(Boolean) as NotificationsType[];
		};

		const sendNotification = ({
			type,
			localeKey,
			params,
		}: NotificationsType): void => {
			const locale = localStorage.getItem('lang');
			setTimeout(() => {
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
			}, 100);
		};

		const showNotifications = async (userId: string) => {
			try {
				const shownMap = getShownMap(userId);

				if (isEmpty(shownMap)) {
					const apiNotifications = await fetchNotifications();
					mapNotifications(apiNotifications);
				}

				if (!notifications.value?.length) return;

				const unshown = notifications.value.filter(
					(notification) => !shownMap[notification.id],
				);

				if (!unshown.length) return;

				unshown.forEach((notification) => {
					try {
						sendNotification(notification);
						shownMap[notification.id] = true;
						notification.shown = true; // TODO: saving shown state for future
					} catch (err) {
						console.error('Error sending notification', notification.id, err);
					}
				});

				setShownMap(userId, shownMap);
			} catch (err) {
				console.error('Error showing notifications', err);
			}
		};

		return {
			showNotifications,
			clearShownMap,
		};
	});

	return store;
};

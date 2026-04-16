import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ApiUserWarning } from '@webitel/api-services/gen/models';
import i18n from '../../../locale/i18n';
import eventBus from '../../../scripts/eventBus';
import { getUserWarnings } from '../api/UserNotifications';
import { USER_NOTIFICATION_CONFIGS_MAP } from '../maps/userNotificationConfigsMap';
import type {
	NotificationsType,
	UserNotificationsConfigsMap,
} from '../types/UserNotifications';

export const createUserNotificationsStore = () => {
	const namespace = 'userNotifications';

	const store = defineStore(namespace, () => {
		const rawNotifications = ref<ApiUserWarning[]>([]);
		const isShown = ref(false);

		const initialize = async () => {
			await fetch();
		};

		const fetch = async () => {
			const response = await getUserWarnings();
			rawNotifications.value =
				(response && (response.warnings as ApiUserWarning[])) ?? [];
		};

		const notifications = computed<NotificationsType[]>(() => {
			return rawNotifications.value
				.map((notification) => {
					const config: UserNotificationsConfigsMap =
						USER_NOTIFICATION_CONFIGS_MAP.get(notification.id);
					if (!config) return null;

					return {
						type: config.type,
						localeKey: config.localeKey,
						days: config.getDays(notification.warningData),
					};
				})
				.filter(Boolean) as NotificationsType[];
		});

		const show = () => {
			if (isShown.value) return;
			notifications.value.forEach((notification) => {
				eventBus.$emit('notification', {
					type: notification.type,
					text: i18n.global.t(
						`systemNotifications.warnings.${notification.localeKey}`,
						{
							days: notification.days,
						},
					),
				});
			});
			isShown.value = true;
		};

		return {
			initialize,
			show,

			/** internal for devtools/debug */
			rawNotifications,
			isShown,
			notifications,
		};
	});

	return store;
};

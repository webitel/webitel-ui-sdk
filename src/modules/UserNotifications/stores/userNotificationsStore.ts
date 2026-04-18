import type { ApiUserWarning } from '@webitel/api-services/gen/models';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
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
						shown: false,
					};
				})
				.filter(Boolean) as NotificationsType[];
		});

		const show = () => {
			notifications.value.forEach((notification) => {
				// @author @Lera24
				//notification should only be displayed the first time you visit the page
				if (notification.shown) return;

				eventBus.$emit('notification', {
					type: notification.type,
					text: i18n.global.t(
						`systemNotifications.warnings.${notification.localeKey}`,
						{
							days: notification.days,
						},
					),
				});
				notification.shown = true;
			});
		};

		return {
			initialize,
			show,

			/** internal for devtools/debug */
			rawNotifications,
			notifications,
		};
	});

	return store;
};

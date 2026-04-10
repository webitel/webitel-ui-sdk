import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import i18n from '../../../locale/i18n';
import eventBus from '../../../scripts/eventBus';
import { getUserWarnings } from '../api/UserNotifications';
import { USER_NOTIFICATIONS_MAP } from '../maps/userNotificationsMap';
import type {
	MappedUserNotificationsType,
	RawUserNotification,
	UserNotificationsMapConfig,
} from '../types/UserNotifications';

export const createUserNotificationsStore = () => {
	const namespace = 'userNotifications';

	const useStore = defineStore(namespace, () => {
		const notifications = ref<RawUserNotification[]>([]);
		const isShown = ref(false);

		const initialize = async (): Promise<void> => {
			await fetch();
		};

		const fetch = async (): Promise<void> => {
			const response = await getUserWarnings();
			notifications.value =
				(response && (response.warnings as RawUserNotification[])) ?? [];
		};

		const mappedNotifications = computed<MappedUserNotificationsType[]>(() => {
			return notifications.value
				.map((notification) => {
					const config: UserNotificationsMapConfig = USER_NOTIFICATIONS_MAP.get(
						notification.id,
					);
					if (!config) return null;

					return {
						type: config.type,
						localeKey: config.localeKey,
						days: config.getDays(notification.warningData),
					};
				})
				.filter(Boolean) as MappedUserNotificationsType[];
		});

		const show = () => {
			if (isShown.value) return;
			mappedNotifications.value.forEach((notification) => {
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
			notifications,
			isShown,
			mappedNotifications,
		};
	});

	// Immediately return a store instance to preserve the previous API: userNotificationsStore()
	// will return an object with fetch/show methods.
	return useStore();
};

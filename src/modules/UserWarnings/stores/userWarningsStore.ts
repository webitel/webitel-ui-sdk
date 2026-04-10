import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import i18n from '../../../locale/i18n';
import eventBus from '../../../scripts/eventBus';
import { getUserWarnings } from '../api/UserWarnings';
import { USER_WARNINGS_MAP } from '../maps/userWarningsMap';
import type {
	MappedUserWarningsType,
	UserWarningsMapConfig,
	WarningRaw,
} from '../types/UserWarnings';

export const createUserWarningsStore = () => {
	const namespace = 'userWarnings';

	const useStore = defineStore(namespace, () => {
		const warningsList = ref<WarningRaw[]>([]);
		const isShown = ref(false);

		const fetch = async (): Promise<void> => {
			const response = await getUserWarnings();
			warningsList.value =
				(response && (response.warnings as WarningRaw[])) ?? [];
		};

		const mappedWarnings = computed<MappedUserWarningsType[]>(() => {
			return warningsList.value
				.map((warning) => {
					const config: UserWarningsMapConfig = USER_WARNINGS_MAP.get(
						warning.id,
					);
					if (!config) return null;

					return {
						type: config.type,
						localeKey: config.localeKey,
						days: config.getDays(warning.warningData),
					};
				})
				.filter(Boolean) as MappedUserWarningsType[];
		});

		const show = () => {
			if (isShown.value) return;
			mappedWarnings.value.forEach((warning) => {
				eventBus.$emit('notification', {
					type: warning.type,
					text: i18n.global.t(
						`systemNotifications.warnings.${warning.localeKey}`,
						{
							days: warning.days,
						},
					),
				});
			});
			isShown.value = true;
		};

		return {
			fetch,
			show,

			/** internal for devtools/debug */
			warningsList,
			isShown,
			mappedWarnings,
		};
	});

	// Immediately return a store instance to preserve the previous API: userWarningsStore()
	// will return an object with fetch/show methods.
	return useStore();
};

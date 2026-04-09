import { computed, ref } from 'vue';
import { getUserWarnings } from '../api/UserWarnings';
import { USER_WARNINGS_MAP } from '../maps/userWarningsMap';
import i18n from '../../../locale/i18n';
import eventBus from '../../../scripts/eventBus';
import type {
	UserWarningsMapConfig,
	MappedUserWarningsType,
} from '../types/UserWarnings';

export const useUserWarnings = () => {
	const warningsList = ref([]);
	const isShown = ref(false);

	const fetch = async (): Promise<{
		warnings?: any[];
	}> => {
		const { warnings } = await getUserWarnings();
		warningsList.value = warnings ?? [];
	};

	const mappedWarnings = computed<MappedUserWarningsType[]>(() => {
		return warningsList.value
			.map((warning) => {
				const config: UserWarningsMapConfig = USER_WARNINGS_MAP.get(warning.id);
				if (!config) return null;

				return {
					type: config.type,
					localeKey: config.localeKey,
					days: config.getDays(warning.warningData),
				};
			})
			.filter(Boolean);
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
	};
};

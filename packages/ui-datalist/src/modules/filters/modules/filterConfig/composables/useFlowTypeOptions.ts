import { EngineRoutingSchemaType } from '@webitel/api-services/gen/models';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

/** [Claude] every flow type but "default" — the flows API adds it to any type filter itself */
export function useFlowTypeOptions() {
	const { t } = useI18n();

	const options = computed(() =>
		Object.values(EngineRoutingSchemaType)
			.filter((value) => value !== EngineRoutingSchemaType.Default)
			.map((value) => ({
				value,
				label: t(`objects.flow.type.${value}`),
			})),
	);

	return {
		options,
	};
}

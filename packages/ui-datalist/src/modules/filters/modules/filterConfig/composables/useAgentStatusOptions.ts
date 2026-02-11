import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { AgentStatus } from 'webitel-sdk';

export function useAgentStatusOptions() {
	const { t } = useI18n();

	const mapAgentStatusToLabel = (value: string) => {
		return t(
			`objects.agent.status.${value === AgentStatus.BreakOut ? 'breakOut' : value}`,
		);
	};

	const options = computed(() => {
		return Object.values(AgentStatus).map((value) => ({
			value,
			label: mapAgentStatusToLabel(value),
		}));
	});

	return {
		options,
	};
}

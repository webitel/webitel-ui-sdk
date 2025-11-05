import { AgentStatus } from 'webitel-sdk';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useAgentStatusOptions() {
  const { t } = useI18n();

  const mapAgentStatusToLabel = (value: string) => {
    return t(`objects.agent.status.${value === 'BreakOut' ? 'breakOut' : value.toLowerCase()}`)
  }

  const options = computed(() =>{
      return Object.keys(AgentStatus).map((value) => ({
        value,
        label: mapAgentStatusToLabel(value),
      }))
  }
  );

  return {
    options,
  };
}

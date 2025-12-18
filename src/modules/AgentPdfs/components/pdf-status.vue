<template>
  <span :class="[`pdf-status--${statusConfig.color}`]">
    {{ statusConfig.text }}
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { WebitelMediaExporterExportStatus } from '@webitel/api-services/gen/models';

export type PdfExportStatusType = typeof WebitelMediaExporterExportStatus[keyof typeof WebitelMediaExporterExportStatus];

interface Props {
  status: PdfExportStatusType;
}

const props = defineProps<Props>();
const { t } = useI18n();

const STATUS_MAP = {
  [WebitelMediaExporterExportStatus.Pending]: {
    text: 'objects.agentPdfs.status.pending',
    color: 'main',
  },
  [WebitelMediaExporterExportStatus.Processing]: {
    text: 'objects.agentPdfs.status.processing',
    color: 'warning',
  },
  [WebitelMediaExporterExportStatus.Done]: {
    text: 'objects.agentPdfs.status.completed',
    color: 'success',
  },
  [WebitelMediaExporterExportStatus.Failed]: {
    text: 'objects.agentPdfs.status.failed',
    color: 'error',
  },
} as const;

const statusConfig = computed(() => {
  const config = STATUS_MAP[props.status as keyof typeof STATUS_MAP];
  return config
    ? { text: t(config.text), color: config.color }
    : { text: props.status, color: 'main' };
});
</script>

<style lang="scss" scoped>
.pdf-status {
  &--main {
    color: var(--main-color);
  }

  &--warning {
    color: var(--warning-color);
  }

  &--success {
    color: var(--success-color);
  }

  &--error {
    color: var(--error-color);
  }
}
</style>


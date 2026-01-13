<template>
  <span :class="[`pdf-status--${statusConfig.color}`]">
    {{ statusConfig.text }}
  </span>
</template>

<script lang="ts" setup>
import { WebitelMediaExporterExportStatus } from '@webitel/api-services/gen/models';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export type PdfExportStatusType =
	(typeof WebitelMediaExporterExportStatus)[keyof typeof WebitelMediaExporterExportStatus];

interface Props {
	status: PdfExportStatusType;
}

const props = defineProps<Props>();
const { t } = useI18n();

const STATUS_MAP = {
	[WebitelMediaExporterExportStatus.Pending]: {
		text: `objects.agentPdfs.status.${WebitelMediaExporterExportStatus.Pending}`,
		color: 'main',
	},
	[WebitelMediaExporterExportStatus.Processing]: {
		text: `objects.agentPdfs.status.${WebitelMediaExporterExportStatus.Processing}`,
		color: 'warning',
	},
	[WebitelMediaExporterExportStatus.Done]: {
		text: `objects.agentPdfs.status.${WebitelMediaExporterExportStatus.Done}`,
		color: 'success',
	},
	[WebitelMediaExporterExportStatus.Failed]: {
		text: `objects.agentPdfs.status.${WebitelMediaExporterExportStatus.Failed}`,
		color: 'error',
	},
} as const;

const statusConfig = computed(() => {
	const config = STATUS_MAP[props.status as keyof typeof STATUS_MAP];
	return config
		? {
				text: t(config.text),
				color: config.color,
			}
		: {
				text: props.status,
				color: 'main',
			};
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


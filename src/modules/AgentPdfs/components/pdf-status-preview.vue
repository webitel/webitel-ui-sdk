<template>
  <wt-image
    :src="statusImage"
    :alt="status"
    width="48"
    :overlay-icon="overlayIcon"
    @click="handleClick"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { WebitelMediaExporterPdfExportStatus } from '@webitel/api-services/gen/models';

import pendingImage from '../assets/pdf-pending.png';
import processingImage from '../assets/pdf-processing.png';
import doneImage from '../assets/pdf-done.png';
import errorImage from '../assets/pdf-error.png';

export type PdfExportStatusType = typeof WebitelMediaExporterPdfExportStatus[keyof typeof WebitelMediaExporterPdfExportStatus];

const props = defineProps<{
  status: PdfExportStatusType | string;
  clickable?: boolean;
}>();

const emit = defineEmits<{
  click: () => void;
}>();

const statusImageMap: Record<string, string> = {
  [WebitelMediaExporterPdfExportStatus.PdfExportStatusPending]: pendingImage,
  [WebitelMediaExporterPdfExportStatus.PdfExportStatusProcessing]: processingImage,
  [WebitelMediaExporterPdfExportStatus.PdfExportStatusDone]: doneImage,
  [WebitelMediaExporterPdfExportStatus.PdfExportStatusFailed]: errorImage,
};

const statusImage = computed(() =>
  statusImageMap[props.status] || pendingImage,
);

const overlayIcon = computed(() => {
  return props.status === WebitelMediaExporterPdfExportStatus.PdfExportStatusDone && 'zoom-in';
});

const handleClick = () => {
  if (props.clickable) {
    emit('click');
  }
};
</script>

<style lang="scss" scoped>
</style>


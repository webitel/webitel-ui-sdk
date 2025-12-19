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
import { WebitelMediaExporterExportStatus } from '@webitel/api-services/gen/models';

import pendingImage from '../assets/pdf-pending.png';
import processingImage from '../assets/pdf-processing.png';
import doneImage from '../assets/pdf-done.png';
import errorImage from '../assets/pdf-error.png';

export type PdfExportStatusType = typeof WebitelMediaExporterExportStatus[keyof typeof WebitelMediaExporterExportStatus];

const props = defineProps<{
  status: PdfExportStatusType | string;
  clickable?: boolean;
}>();

const emit = defineEmits<{
  click: () => void;
}>();

const statusImageMap: Record<string, string> = {
  [WebitelMediaExporterExportStatus.Pending]: pendingImage,
  [WebitelMediaExporterExportStatus.Processing]: processingImage,
  [WebitelMediaExporterExportStatus.Done]: doneImage,
  [WebitelMediaExporterExportStatus.Failed]: errorImage,
};

const statusImage = computed(() =>
  statusImageMap[props.status] || pendingImage,
);

const overlayIcon = computed(() => {
  return props.status === WebitelMediaExporterExportStatus.Done && 'zoom-in';
});

const handleClick = () => {
  if (props.clickable) {
    emit('click');
  }
};
</script>

<style lang="scss" scoped>
</style>


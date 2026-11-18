<template>
  <wt-icon-btn
    v-tooltip="t('webitelUI.stt.downloadTxt')"
    icon="stt-download"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const emit = defineEmits<{
	click: [];
}>();

const { t } = useI18n();
</script>

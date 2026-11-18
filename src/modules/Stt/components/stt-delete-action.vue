<template>
  <wt-icon-btn
    v-tooltip="t('reusable.delete')"
    icon="bucket"
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

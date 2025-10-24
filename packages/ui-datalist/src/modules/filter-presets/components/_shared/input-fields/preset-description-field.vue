<template>
  <div v-if="props.previewMode && model">
    <wt-label>
      {{ t('vocabulary.description') }}
    </wt-label>
    <p>
      {{ model }}
    </p>
  </div>

  <wt-textarea
    v-if="!props.previewMode"
    v-model="model"
    :label="t('vocabulary.description')"
  />
</template>

<script setup lang="ts">
import { WtLabel, WtTextarea } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';

const model = defineModel<string>();

const props = defineProps<{
  previewMode?: boolean;
}>();

const { t } = useI18n();
</script>

<style scoped></style>

<template>
  <wt-input-text
    v-model:model-value="model"
    :v="props.v"
    :label="t('reusable.name')"
    required
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

type ModelValue = string;

const model = defineModel<ModelValue>();

type Props = {
	v: Record<string, unknown>;
};

const props = defineProps<Props>();

const { t } = useI18n();
</script>

<style scoped></style>

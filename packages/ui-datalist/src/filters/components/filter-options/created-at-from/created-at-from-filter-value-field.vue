<template>
  <wt-datepicker
    v-if="model"
    :value="model"
    :label="`${t('webitelUI.filters.filterValue')}`"
    mode="datetime"
    @input="model = $event"
  />
</template>

<script lang="ts" setup>
import { startOfToday } from 'date-fns';
import { useI18n } from 'vue-i18n';

const model = defineModel<number>();

const { t } = useI18n();

if (!model.value) {
  model.value = startOfToday().getTime();
}
</script>

<style scoped></style>

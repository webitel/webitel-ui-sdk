<template>
  <wt-datepicker
    v-if="model"
    :label="`${t('webitelUI.filters.filterValue')}`"
    :value="model"
    mode="datetime"
    @input="model = $event"
  />
</template>

<script lang="ts" setup>
import { endOfToday } from 'date-fns';
import { useI18n } from 'vue-i18n';

const model = defineModel<number>();

const { t } = useI18n();

if (!model.value) {
  model.value = endOfToday().getTime();
}
</script>

<style lang="scss" scoped></style>

<template>
  <date-time-filter-value-field
    :model-value="model"
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import DateTimeFilterValueField from '../_shared/date-time-filter/date-time-filter-value-field.vue';

type ModelValue = {
  from: number;
  to: number;
};
const model = defineModel<ModelValue>();
</script>

<style lang="scss" scoped></style>

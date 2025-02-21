<template>
  <duration-filter-value-field
    :value="model"
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import DurationFilterValueField from '../_shared/durations/duration-filter-value-field.vue';

type ModelValue = {
  from: number;
  to: number;
};

const model = defineModel<ModelValue>();
</script>

<style lang="scss" scoped></style>

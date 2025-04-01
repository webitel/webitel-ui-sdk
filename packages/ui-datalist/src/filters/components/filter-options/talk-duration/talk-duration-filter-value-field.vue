<template>
  <duration-filter-value-field
    :model-value="model"
    @update:model-value="model = $event"
    @update:invalid="emit('update:invalid', $event)"
  />
</template>

<script lang="ts" setup>
import DurationFilterValueField from '../_shared/durations/duration-filter-value-field.vue';
import type { TalkDurationFilterModelValue } from './TalkDurationFilter.d.ts';

const model = defineModel<TalkDurationFilterModelValue>();
const emit = defineEmits<{
  'update:invalid': [boolean];
}>();
</script>

<style lang="scss" scoped></style>

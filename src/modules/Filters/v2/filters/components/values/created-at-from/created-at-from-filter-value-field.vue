<template>
  <wt-datepicker
    v-if="model"
    :value="model"
    @input="model = $event"
  />
</template>

<script lang="ts" setup>
import { startOfToday } from 'date-fns';

const model = defineModel<number>();

if (!model.value) {
  model.value = startOfToday().getTime();
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="example-value-from-options-by-prop-select">
    value: {{ selectedValue }}

    <wt-select
      v-model="selectedValue"
      :options="options"
      track-by="value"
      use-value-from-options-by-prop="value"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = [
  { value: 'a', name: 'Option A' },
  { value: 'b', name: 'Option B' },
  { value: 'c', name: 'Option C' },
];

const selectedValue = ref('b');

</script>

<style scoped lang="scss">
</style>

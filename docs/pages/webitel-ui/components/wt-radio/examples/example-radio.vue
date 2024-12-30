<script setup>
import { ref } from 'vue';

const value1 = 'value1';
const value2 = 'value2';

const selected = ref(value1);
</script>

<template>
  <wt-radio
    :selected="selected"
    :value="value1"
    label="Radio 1"
    @input="selected = $event"
  />
  <wt-radio
    :selected="selected"
    :value="value2"
    label="Radio 2"
    @input="selected = $event"
  />
</template>

<style scoped lang="scss"></style>

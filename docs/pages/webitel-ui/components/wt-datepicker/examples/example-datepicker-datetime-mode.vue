<script setup>

import { ref } from 'vue';

const value = ref(Date.now());
</script>

<template>
  <wt-datepicker
    :value="value"
    label="Date Time picker"
    mode="datetime"
    @input="value = $event"
  />
</template>

<style scoped lang="scss">

</style>

<script setup>

import { ref } from 'vue';

const size = ref(10);
const isNext = ref(true);
const isPrev = ref(false);

function alert(value) {
  window.alert(value);
}
</script>

<template>
  <wt-pagination
    :size="size"
    :next="isNext"
    :prev="isPrev"
    @input="size = $event"
    @next="alert('next')"
    @prev="alert('prev')"
  />
</template>

<style scoped lang="scss">

</style>

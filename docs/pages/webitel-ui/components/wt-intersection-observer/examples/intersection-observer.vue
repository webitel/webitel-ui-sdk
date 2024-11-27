<script setup>
import { ref } from 'vue';

const nextLoading = ref(false);
const next = ref(true);

const loadNext = async () => {
  nextLoading.value = true;
  console.log('observer was triggered');
  nextLoading.value = false;
}

</script>

<template>
  <wt-intersection-observer
    :next="next"
    :loading="nextLoading"
    @next="loadNext"
  />
</template>

<style scoped lang="scss">

</style>

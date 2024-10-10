<template>
  <div class="start-page-logo">
    <img :src="image">
  </div>
</template>

<script setup>
  const props = defineProps({
    image: {
      type: String,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .start-page-logo{
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

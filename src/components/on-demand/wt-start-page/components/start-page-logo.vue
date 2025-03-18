<template>
  <div class="start-page-logo">
    <img :src="logo" />
  </div>
</template>

<script setup>
const props = defineProps({
  logo: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.start-page-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>

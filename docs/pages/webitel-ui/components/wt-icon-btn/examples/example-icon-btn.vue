<script setup>
const callAlert = () => window.alert('wt-icon-btn clicked');
</script>

<template>
  <wt-icon-btn
    icon="edit"
    @click="callAlert"
  ></wt-icon-btn>
</template>

<style lang="scss" scoped></style>

<script setup>
const now = new Date();
// const now = new Date().getTime();
// const now = new Date().toISOString();
</script>

<template>
  <wt-datetime-text :datetime="now" />
</template>

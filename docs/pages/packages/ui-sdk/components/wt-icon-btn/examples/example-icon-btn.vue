<script setup>
const callAlert = () => window.alert('wt-icon-btn clicked');
</script>

<template>
  <wt-icon-btn icon="edit" @click="callAlert" />
</template>

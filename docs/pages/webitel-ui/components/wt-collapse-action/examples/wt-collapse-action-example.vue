<template>
  <wt-collapse-action :collapsed="isCollapsed" @click="toggleCollapse" />
</template>

<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

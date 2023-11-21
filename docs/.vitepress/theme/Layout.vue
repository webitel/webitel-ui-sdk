<!-- .vitepress/theme/Layout.vue -->

<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { provide } from 'vue';

const { isDark } = useData();

const toggleComponentsDarkTheme = (value) => {
  const html = document.querySelector('html');
  if (value) html.classList.add('theme--dark');
  else html.classList.remove('theme--dark');
};

toggleComponentsDarkTheme(isDark.value);

provide('toggle-appearance', () => {
  isDark.value = !isDark.value;
  toggleComponentsDarkTheme(isDark.value);
});
</script>

<template>
  <DefaultTheme.Layout />
</template>

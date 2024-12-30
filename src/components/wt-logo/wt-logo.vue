<script setup>
import LogoDark from './assets/logo-dark.svg';
import LogoLight from './assets/logo-light.svg';

const props = defineProps({
  darkMode: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <img
    :src="darkMode ? LogoDark : LogoLight"
    alt="Webitel"
    class="wt-logo"
  >
</template>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-logo {
  width: var(--wt-logo-width);
  height: var(--wt-logo-height);
}
</style>

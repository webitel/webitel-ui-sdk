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
    class="wt-logo"
    alt="Webitel"
    :src="darkMode ? LogoDark : LogoLight"
  >
</template>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-logo {
  width: var(--wt-logo-width);
  height: var(--wt-logo-height);
}
</style>

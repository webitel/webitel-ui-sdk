<script setup>
import LogoDark from './assets/logo-dark.svg';
import LogoLight from './assets/logo-light.svg';

defineProps({
  darkMode: {
    type: Boolean,
    default: false,
  },
  logoRoute: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <router-link :to="logoRoute">
    <img
      :src="darkMode ? LogoDark : LogoLight"
      alt="Webitel"
      class="wt-logo"
    />
  </router-link>
</template>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-logo {
  width: var(--wt-logo-width);
  height: var(--wt-logo-height);
  display: block;
}
</style>

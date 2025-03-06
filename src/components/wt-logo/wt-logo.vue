<script setup>
import LogoDark from './assets/logo-dark.svg';
import LogoLight from './assets/logo-light.svg';

defineProps({
  darkMode: {
    type: Boolean,
    default: false,
  },
  logoHref: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <a :href="logoHref">
    <img
      :src="darkMode ? LogoDark : LogoLight"
      alt="Webitel"
      class="wt-logo"
    />
  </a>
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

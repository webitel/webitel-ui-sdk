<script setup>
import { computed } from 'vue';

import LogoDark from './assets/logo-dark.svg';
import LogoLight from './assets/logo-light.svg';

const props = defineProps({
  darkMode: {
    type: Boolean,
    default: false,
  },
  logoHref: {
    type: String,
    default: '',
  },
  logoRoute: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const href = computed(() => props.logoHref || import.meta.env.VITE_START_PAGE_URL);
const logoSrc = props.darkMode ? LogoDark : LogoLight;

const linkComponent = props.disabled
  ? 'span'
  : props.logoRoute
    ? 'router-link'
    : 'a';

const linkAttrs = props.disabled
  ? {}
  : props.logoRoute
    ? { to: props.logoRoute }
    : { href: href.value };
</script>

<template>
  <component :is="linkComponent" v-bind="linkAttrs">
    <img :src="logoSrc" alt="Webitel" class="wt-logo" />
  </component>
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

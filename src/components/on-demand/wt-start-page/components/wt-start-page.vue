<template>
  <div class="wt-start-page">
    <start-page-logo
      v-if="appLogo"
      :logo="logo"
    />

    <div class="wt-start-page__wrapper">
      <start-page-card
        v-for="card of navCards"
        :key="card.value"
        :card="card"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import StartPageCard from './start-page-card.vue';
import StartPageLogo from './start-page-logo.vue';

interface NavCard {
  value: string;
  route: string;
  name: string;
  text: string;
  disabled: boolean;
  images: {
    light: string;
    dark: string;
  };
}

interface AppLogo {
  light: string;
  dark: string;
}

const props = withDefaults(defineProps<{
  nav: NavCard[];
  appLogo: AppLogo;
  darkMode?: boolean;
}>(), {
  darkMode: false,
});

const logo = computed(() => {
  return props.darkMode ? props.appLogo.dark : props.appLogo.light;
});

const navCards = computed(() => {
  return props.nav.map((navItem) => ({
    ...navItem,
    image: props.darkMode ? navItem.images.dark : navItem.images.light,
  }));
});
</script>

<style scoped>
.wt-start-page__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 264px);
  justify-content: center;
  box-sizing: border-box;
  padding: var(--spacing-sm);
  min-width: 264px;
  grid-gap: var(--spacing-sm);
}
</style>

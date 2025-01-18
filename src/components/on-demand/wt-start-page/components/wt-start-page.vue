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

<script setup>
import { computed } from 'vue';
import StartPageCard from './start-page-card.vue';
import StartPageLogo from './start-page-logo.vue';

const props = defineProps({
  /** entire navigation hierarchy. Value: `{ value: string, route: string, name: string, text: string, images: object - { light: string, dark: string } }`
   **/

  nav: {
    type: Array,
    required: true,
  },
  appLogo: {
    type: Object,
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
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
  justify-content: center;
  box-sizing: border-box;
  min-width: 264px;
  padding: var(--spacing-sm);
  grid-template-columns: repeat(auto-fit, 264px);
  grid-gap: var(--spacing-sm);
}
</style>

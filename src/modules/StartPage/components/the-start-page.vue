<template>
  <div class="start-page">
    <start-page-logo :image="logo" />

    <div class="start-page__wrapper">
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
import { useStore } from 'vuex';
import StartPageCard from './start-page-card.vue';
import StartPageLogo from './start-page-logo.vue';

const props = defineProps({
  nav: {
    type: Array,
    required: true,
  },
  appLogo: {
    type: Object,
    required: true,
  },
});

const store = useStore();

const darkMode = computed(() => store.getters['appearance/DARK_MODE']);

const logo = computed(() => {
  return darkMode.value ? props.appLogo.dark : props.appLogo.light;
});

const navCards = computed(() => {
  return props.nav.map((navItem) => ({
    ...navItem,
    image: darkMode.value ? navItem.images.dark : navItem.images.light,
  }));
});
</script>

<style scoped>
.start-page__wrapper {
  display: grid;
  justify-content: center;
  box-sizing: border-box;
  min-width: 264px;
  padding: var(--spacing-sm);
  grid-template-columns: repeat(auto-fit, 264px);
  grid-gap: var(--spacing-sm);
}
</style>

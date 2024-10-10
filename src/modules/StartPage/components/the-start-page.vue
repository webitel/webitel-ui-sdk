<template>
<start-page-logo :image="logo"/>
<div class="start-page-wrapper">
  <start-page-card
    v-for="(card) of navCards"
    :key="card.value"
    :card="card"
  />
</div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useStore } from 'vuex';
  import StartPageCard from './start-page-card.vue';
  import StartPageLogo from './start-page-logo.vue';

  // Vuex store access
  const store = useStore();

  const { t } = useI18n();

  const props = defineProps({
    nav: {
      type: Array,
      required: true,
    },
    appLogo: {
      type: Object,
      required: true,
    }
  });

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
.start-page-wrapper {
  box-sizing: border-box;
  min-width: 264px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 264px);
  justify-content: center;
  grid-gap: var(--spacing-sm);
  padding: var(--spacing-sm);
}
</style>

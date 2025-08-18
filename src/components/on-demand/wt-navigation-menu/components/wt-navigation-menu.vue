<template>
  <section class="wt-navigation-menu">
    <article class="wt-navigation-menu__wrapper">
      <nav-menu-lvl-1 :categories="categoriesArray" :icons="icons" :selected="selected" @select="select">
        <nav-menu-lvl-2 :categories="activeSubcategories" class="wt-navigation-menu__categories--display" />
      </nav-menu-lvl-1>
      <nav-menu-lvl-2 :categories="activeSubcategories" class="wt-navigation-menu__categories--hidden" />
    </article>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';

import NavMenuLvl1 from './_internals/nav-menu-lvl-1.vue';
import NavMenuLvl2 from './_internals/nav-menu-lvl-2.vue';

const props = defineProps({
  /** entire navigation hierarchy. Value: `{ value: string, name: string, subNav: [{ value: string, route: string, name: string}] }`
   **/

  nav: {
    type: Array,
    required: true,
  },

  /** array icons to display in 1 level menu
   */

  icons: {
    type: Array,
    default: () => [],
  },
});

const selectedId = ref('');

// Create a map of categories by their value/id
const categories = computed(() => {
  const categoryMap = new Map();
  props.nav.forEach((navItem) => {
    categoryMap.set(navItem.value, {
      ...navItem,
      name: navItem.name,
    });
  });
  return categoryMap;
});

// Create a map of subcategories by parent category id
const subcategories = computed(() => {
  const subcategoryMap = new Map();
  props.nav.forEach((navItem) => {
    if (navItem.subNav) {
      const subNavWithRoutes = navItem.subNav.map((subNav) => {
        const route = navItem.route
          ? `${navItem.route}/${subNav.route}`
          : subNav.route;
        return {
          ...subNav,
          name: subNav.name,
          route,
        };
      });
      subcategoryMap.set(navItem.value, subNavWithRoutes);
    } else {
      subcategoryMap.set(navItem.value, []);
    }
  });
  return subcategoryMap;
});

// Array of categories for the lvl-1 component (filtered to exclude empty categories)
const categoriesArray = computed(() => {
  return Array.from(categories.value.values()).filter((category) => {
    const subcats = subcategories.value.get(category.value);
    return subcats && subcats.length > 0;
  });
});

// Active subcategories based on selectedId
const activeSubcategories = computed(() => {
  return subcategories.value.get(selected.value?.value) || [];
});

// Selected category based on selectedId
const selected = computed(() => {
  return categories.value.get(selectedId.value) || categoriesArray.value[0];
});

function select(category) {
  selectedId.value = category.value;
}
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/viewport-breakpoints' as *;
@use '@webitel/styleguide/scroll' as *;

.wt-navigation-menu {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  height: 100%;

  --button-min-height: 60px;
  --wrapper-width: 60%;
  --wrapper-height: calc(var(--spacing-sm) * 2 + var(--button-min-height) * 7 + var(--spacing-2xs) * 6);

  @media only screen and (max-width: $viewport-sm) {
    --wrapper-width: 80%;
  }

  @media only screen and (max-width: $viewport-xs) {
    --wrapper-width: 100%;
    --wrapper-height: 100%;
  }

  &__wrapper {
    @extend %wt-scrollbar;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    box-sizing: border-box;
    margin: auto;
    border-radius: var(--spacing-xs);
    background: var(--content-wrapper-color);
    padding: var(--spacing-sm);
    width: var(--wrapper-width);
    height: var(--wrapper-height);
    grid-gap: var(--spacing-sm);

    @media only screen and (max-width: $viewport-xs) {
      grid-template-columns: 1fr;
    }
  }

  &__categories--display {
    display: none;

    @media only screen and (max-width: $viewport-xs) {
      display: block;
    }
  }

  &__categories--hidden {
    @media only screen and (max-width: $viewport-xs) {
      display: none;
    }
  }
}
</style>

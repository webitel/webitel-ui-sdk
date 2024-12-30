<template>
  <section class="wt-navigation-menu">
    <article class="wt-navigation-menu__wrapper">
      <nav-menu-lvl-1
        :categories="categories"
        :icons="icons"
        :selected="selected"
        @select="select"
      >
        <nav-menu-lvl-2
          :categories="subcategories"
          class="wt-navigation-menu__categories--display"
        />
      </nav-menu-lvl-1>
      <nav-menu-lvl-2
        :categories="subcategories"
        class="wt-navigation-menu__categories--hidden"
      />
    </article>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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

const selected = ref({});

const categories = computed(() => {
  return props.nav.map((navItem) => ({
    ...navItem,
    name: navItem.name,
  }));
});

const subcategories = computed(() => {
  if (!selected.value.subNav) return [];
  return selected.value.subNav.map((subNav) => {
    const route = selected.value.route
      ? `${selected.value.route}/${subNav.route}`
      : subNav.route;
    const name = subNav.name;
    return {
      ...subNav,
      name,
      route,
    };
  });
});

onMounted(() => {
  initSelected();
});

function initSelected() {
  select(categories.value[0]);
}

function select(category) {
  selected.value = category;
}
</script>

<style lang="scss" scoped>
//@use 'src/css/styleguide/styleguide' as *;
@use '../../../../../src/css/main' as *;
//@import '../../../../css/styleguide/viewport-breakpoints/_viewport-breakpoints.scss';
.wt-navigation-menu {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  height: 100%;

  --button-min-height: 60px;
  --wrapper-width: 60%;
  --wrapper-height: calc(
    var(--spacing-sm) * 2 + var(--button-min-height) * 7 + var(--spacing-2xs) *
      6
  );

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
    box-sizing: border-box;
    width: var(--wrapper-width);
    height: var(--wrapper-height);
    margin: auto;
    padding: var(--spacing-sm);
    border-radius: var(--spacing-xs);
    background: var(--content-wrapper-color);
    grid-template-columns: repeat(2, 1fr);
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

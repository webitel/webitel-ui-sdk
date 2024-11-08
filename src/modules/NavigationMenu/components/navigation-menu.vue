<template>
  <section class="navigation-menu">
    <article class="navigation-menu__wrapper">
      <nav-menu-lvl-1
        :categories="categories"
        :selected="selected"
        @select="select"
      >
        <nav-menu-lvl-2
          :categories="subcategories"
          class="d-none d-block-xs"
        />
      </nav-menu-lvl-1>
      <nav-menu-lvl-2
        :categories="subcategories"
        class="d-none-xs"
      />
    </article>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import NavMenuLvl1 from './_internals/nav-menu-lvl-1.vue';
import NavMenuLvl2 from './_internals/nav-menu-lvl-2.vue';

const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  }
});

const selected = ref({});

const categories = computed(() => {
  return props.navItems.map((navItem) => ({
    ...navItem,
    name: navItem.name,
  }));
});

const subcategories = computed(() => {
  if (!selected.value.subNav) return [];
  return selected.value.subNav.map((subNav) => {
    const route = selected.value.route ? `${selected.value.route}/${subNav.route}` : subNav.route;
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
.navigation-menu {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  height: 100%;

  --button-min-height: 60px;
  --wrapper-width: 60%;
  --wrapper-height: calc(
    var(--spacing-sm) * 2
    + var(--button-min-height) * 7
    + var(--spacing-2xs) * 6
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
    padding: var(--spacing-xs);
    border-radius: var(--spacing-xs);
    background: var(--content-wrapper-color);
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--spacing-sm);

    @media only screen and (max-width: $viewport-xs) {
      grid-template-columns: 1fr;
    }
  }
}
</style>

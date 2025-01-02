<template>
  <ul class="nav-menu__category nav-menu-lvl-2">
    <li
      v-for="(category, key) of categories"
      :key="key"
      class="nav-menu__option nav-menu__item nav-menu-lvl-2--inner"
    >
      <span class="nav-menu-lvl-2__indicator" />
      <router-link
        :to="category.route"
        class="nav-menu-lvl-2__link"
      >
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
@use '../../css/nav-menu';

.nav-menu-lvl-2 {
  @extend %wt-scrollbar;
  overflow-y: auto;

  .nav-menu-lvl-2__indicator {
    position: relative;
    display: block;
    width: var(--spacing-md);
    height: var(--spacing-md);

    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: var(--spacing-2xs);
      height: var(--spacing-2xs);
      content: '';
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: var(--text-main-color);
    }
  }

  &__link {
    color: var(--text-main-color);

    &:hover,
    &:active {
      text-decoration: underline;
    }
  }
}
</style>

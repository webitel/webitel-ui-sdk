<template>
  <ul class="nav-menu__category nav-menu__category--lvl-2">
    <li
      v-for="(category, key) of categories"
      :key="key"
      class="nav-menu__category-option__wrapper nav-menu__category-option
            nav-menu__category-option--lvl-2"
      >
      <span class="nav-menu__category-indicator" />
      <router-link
        :to="category.route"
        class="nav-menu__link"
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
@import '../../css/navMenu';

.nav-menu{
  &__category{
    &--lvl-2 {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      padding: var(--spacing-xs);
      box-shadow: var(--elevation-6);
      border-radius: var(--spacing-xs);
      gap: var(--spacing-xs);
    }
    &-option{
      @extend %typo-subtitle-1;
    }
    &-indicator {
      position: relative;
      display: block;
      width: var(--icon-md-size);
      height: var(--icon-md-size);

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--headline-nav-indicator-size);
        height: var(--headline-nav-indicator-size);
        background: var(--text-main-color);
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
    }

  }
  &__link {
    @extend %typo-subtitle-1;
    color: var(--text-main-color);

    &:hover, &:active {
      text-decoration: underline;
    }
  }
}
</style>

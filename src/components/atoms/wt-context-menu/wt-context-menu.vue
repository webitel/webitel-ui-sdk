<template>
  <ul
    class="wt-context-menu"
    :class="{'wt-context-menu--hidden': !visible}"
  >
    <li
      class="wt-context-menu__item"
      v-for="(option, index) in options"
      :key="index"
    >
      <a
        class="wt-context-menu__option"
        href="#"
        @click="$emit('click', { option, index })"
        >
        {{ option }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'wt-context-menu',
  props: {
    options: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-context-menu {
  min-width: var(--context-menu-min-option-width);
  background-color: var(--main-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  z-index: 1;

  &--hidden {
    opacity: 0;
    pointer-events: none;
  }
}

.wt-context-menu__item {
  &:first-of-type {
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
  &:only-of-type {
    border-radius: var(--border-radius);
  }
  &:hover {
    background-color: var(--secondary-color);
    transition: var(--transition);
  }
}

.wt-context-menu__option {
  @extend %typo-context-menu;
  display: block;
  padding: var(--context-menu-option-padding);
  cursor: pointer;
}
</style>

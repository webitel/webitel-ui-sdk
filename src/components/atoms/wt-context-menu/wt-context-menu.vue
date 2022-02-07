<template>
  <ul
    class="wt-context-menu"
    :class="{'wt-context-menu--hidden': !visible}"
  >
    <li
      class="wt-context-menu__option-wrapper"
      v-for="(option, index) in options"
      :key="index"
    >
<!--      <a> click.prevent prevents redirect to # -->
      <a
        class="wt-context-menu__option"
        href="#"
        @click.prevent="$emit('click', { option, index })"
        >
        {{ option.text || option }}
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
      description: '[{ text }] or [\'str\']',
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
  @extend %typo-body-2;
  min-width: var(--context-menu-min-width);
  max-width: var(--context-menu-max-width);
  background-color: var(--context-menu-background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  z-index: 1;

  &--hidden {
    opacity: 0;
    pointer-events: none;
  }
}

.wt-context-menu__option-wrapper {
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
    background-color: var( --context-menu-option-color--hover);
    transition: var(--transition);
  }
}

.wt-context-menu__option {
  display: block;
  padding: var(--context-menu-option-padding);
  cursor: pointer;
}
</style>

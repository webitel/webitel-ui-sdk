<template>
  <ul
    class="wt-context-menu"
    :class="{'wt-context-menu--hidden': !visible}"
  >
    <li
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
.wt-context-menu--hidden {
  opacity: 0;
  pointer-events: none;
}

.wt-context-menu {
  @extend %typo-body-md;
  min-width: var(--min-option-width);
  padding: var(--options-padding);
  background-color: var(--main-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  z-index: 1;
}

.wt-context-menu__option {
  display: block;
  padding: var(--option-padding);
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color);
    border-radius: var(--border-radius);
  }
}
</style>

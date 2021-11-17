<template>
  <ul
    class="wt-context-menu"
    :class="{'hidden': !isVisible}"
  >
    <li
      v-for="(option, index) in options"
      :key="index"
      @click="$emit('click', { option, index })"
    >
      {{ option }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'wt-context-menu',
  props: {
    options: {
      type: Array,
      require: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$optionsPadding: 9px;
$optionPadding: 9px 11px;

.wt-context-menu {
  @extend %typo-body-md;
  padding: $optionsPadding;
  background-color: var(--main-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  z-index: 1;

  li {
    padding: $optionPadding;
    cursor: pointer;

    &:hover {
      background-color: var(--secondary-color);
      border-radius: var(--border-radius);
    }
  }
}
</style>

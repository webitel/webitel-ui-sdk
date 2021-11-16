<template>
  <ul
    class="wt-list"
    :class="{'hidden': !isOpened}"
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
  name: 'wt-list',
  props: {
    options: {
      type: Array,
      require: true,
    },
    isOpened: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$optionsPadding: 9px;
$optionPadding: 9px 11px;

.wt-list {
  @extend %typo-body-md;
  padding: $optionsPadding;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: var(--main-color);
  transition: var(--transition);
  z-index: 1;

  li {
    padding: $optionPadding;
    cursor: pointer;

    &:hover {
      border-radius: var(--border-radius);
      background-color: var(--secondary-color);
    }
  }
}
</style>

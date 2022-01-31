<template>
  <wt-button
    class="wt-rounded-action"
    :class="[
      { 'wt-rounded-action--disabled': disabled },
    ]"
    v-bind="{ ...$attrs, ...$props }"
    color="secondary"
    @click="$emit('click', $event)"
  >
    <wt-icon
      :icon="icon"
      :color="iColor"
      :size="size"
    ></wt-icon>
  </wt-button>
</template>

<script>
export default {
  name: 'wt-rounded-action',
  props: {
    icon: {
      type: String,
    },
    color: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'md',
      options: ['sm', 'md'],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iColor() {
      if (this.iconColor) return this.iconColor;
      if (this.disabled) return 'secondary-50';
      switch (this.color) {
        case 'success':
          return 'success';
        case 'accent':
          return 'accent';
        case 'danger':
          return 'danger';
        default:
          return 'default';
      }
    },
  },
};
</script>

<!--not scoped to change .icon colors-->
<style lang="scss" scoped>
.wt-button.wt-rounded-action {
  min-width: auto;
  line-height: 0;
  padding: var(--rounded-action-padding);

  &:not(.wt-rounded-action--disabled) {
    background: var(--rounded-action-bg-color);
    box-shadow: var(--elevation-1);
  }
}
</style>

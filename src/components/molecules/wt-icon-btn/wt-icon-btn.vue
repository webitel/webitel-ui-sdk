<template>
  <div :class="{ 'wt-icon-btn--disabled': disabled }" class="wt-icon-btn">
    <button class="wt-icon-btn__button" type="button">
      <wt-icon
        :color="iconColor"
        :icon="icon"
        :icon-prefix="iconPrefix"
        :size="size"
        @click.native="$emit('click', $event)"
      ></wt-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'wt-icon-btn',
  props: {
    icon: {
      type: String,
      required: true,
    },
    iconPrefix: {
      type: String,
      default: '',
    },
    size: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
  },
  computed: {
    iconColor() {
      if (this.disabled) return 'disabled';
      return this.color;
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-icon-btn {
  position: relative;
  display: inline-block;

  .wt-icon {
    display: flex;
  }

  // add hover style only for "default" icon color cause non-default already may have opacity 1
  &:hover ::v-deep .wt-icon__icon.wt-icon__icon--color-default {
    fill: var(--icon-color--hover);
  }

  &:hover ::v-deep .wt-icon--color-icon-secondary .wt-icon__icon {
    fill: var(--icon-color);
  }

  // icon "disabled" color is set from iconColor computed
  &--disabled {
    pointer-events: none;
  }
}

.wt-icon-btn,
.wt-icon-btn__button {
  line-height: 0;
}
</style>

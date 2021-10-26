<template>
  <div class="wt-icon-btn" :class="{ 'wt-icon-btn--disabled': disabled }">
    <button class="wt-icon-btn__button" type="button">
      <wt-icon
        :icon="icon"
        :icon-prefix="iconPrefix"
        :size="size"
        :color="iconColor"
        @click.native="$emit('click', $event)"
      ></wt-icon>
    </button>
    <wt-tooltip
      v-if="tooltip"
      class="wt-icon-btn__tooltip"
      :class="`wt-icon-btn__tooltip--tooltip-${tooltipPosition}`"
    >{{tooltip}}</wt-tooltip>
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
      tooltip: {
        type: String,
      },
      tooltipPosition: {
        type: String,
        default: 'bottom',
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
        if (this.disabled && !this.color) return 'disabled';
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

    // icon "disabled" color is set from iconColor computed
    &--disabled {
      pointer-events: none;
    }
  }

  .wt-icon-btn,
  .wt-icon-btn__button {
    line-height: 0;
  }

  .wt-icon-btn__tooltip {
    position: absolute;

    &--tooltip-top {
      bottom: calc(100% + 11px); // icon height + 11px margin
      left: 50%;
      transform: translateX(-50%);
    }
    &--tooltip-bottom {
      top: calc(100% + 11px);
      left: 50%;
      transform: translateX(-50%);
    }
    &--tooltip-right {
      top: 50%;
      left: calc(100% + 11px);
      transform: translateY(-50%);
    }
    &--tooltip-left {
      top: 50%;
      right: calc(100% + 11px);
      transform: translateY(-50%);
    }

    .wt-icon-btn:hover & {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>

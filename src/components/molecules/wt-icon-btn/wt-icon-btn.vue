<template>
  <div class="wt-icon-btn" :class="{ 'wt-icon-btn--disabled': disabled }">
    <button class="wt-icon-btn__button" type="button">
      <wt-icon
        :icon="icon"
        :icon-prefix="iconPrefix"
        :size="size"
        :color="color"
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
  };
</script>

<style lang="scss" scoped>
  .wt-icon-btn {
    position: relative;
    display: inline-block;

    .wt-icon {
      display: flex;
    }

    &:hover ::v-deep .wt-icon__icon {
      fill: var(--icon--hover-color);
    }

    &.active ::v-deep .wt-icon__icon,
    &.opened ::v-deep .wt-icon__icon {
      fill: var(--icon--actvie-color);
    }

    &--disabled {
      pointer-events: none;

      ::v-deep .wt-icon__icon {
        fill: var(--icon--disabled-color);
      }
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

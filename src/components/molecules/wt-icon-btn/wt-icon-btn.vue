<template>
  <div class="wt-icon-btn" :class="{ 'wt-icon-btn--disabled': disabled }">
    <button class="wt-icon-btn__button">
      <wt-icon :icon="icon" :size="size" :color="color"></wt-icon>
    </button>
    <wt-tooltip v-if="tooltip">{{tooltip}}</wt-tooltip>
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
      size: {
        type: String,
      },
      tooltip: {
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
  };
</script>

<style lang="scss" scoped>
  .wt-icon-btn {
    position: relative;
    display: inline-block;

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

    .wt-tooltip {
      position: absolute;
      top: calc(100% + 11px); // icon height + 11px margin
      left: 50%;
      transform: translateX(-50%);
    }

    &:hover .wt-tooltip {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>

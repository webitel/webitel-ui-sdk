<template>
  <div
    :class="{
      'wt-badge--outside': outside,
      'wt-badge--compat-mode': !hasSlot,
    }"
    class="wt-badge"
  >
    <span
      v-show="!hidden"
      :style="{ background: `var(--${colorVariable})` }"
      class="wt-badge-indicator"
    >
      <img
        v-if="iconBadgePic"
        :alt="iconBadge"
        :src="iconBadgePic"
        class="wt-badge-indicator__pic"
      />
    </span>

    <slot />
  </div>
</template>

<script>
import BadgeDnd from '../../assets/icons/badge-dnd.svg';
import BadgeOnline from '../../assets/icons/badge-online.svg';
import BadgePause from '../../assets/icons/badge-pause.svg';
import AbstractUserStatus from '../../enums/AbstractUserStatus/AbstractUserStatus.enum.js';

export default {
  name: 'WtBadge',
  props: {
    colorVariable: {
      type: String,
      default: 'error-color',
      description: 'see all available colors in webitel-ui docs',
    },
    outside: {
      type: Boolean,
      default: false,
    },
    iconBadge: {
      type: String,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconBadgePic() {
      switch (this.iconBadge) {
        case AbstractUserStatus.DND:
          return BadgeDnd;
        case AbstractUserStatus.ONLINE:
          return BadgeOnline;
        case AbstractUserStatus.PAUSE:
          return BadgePause;
        default:
          return null;
      }
    },
    /*
     compatibility with old usage, when wt-badge was just placed in a wrapper,
     being a sibling of the badged content, not wrapping badged content itself
     */
    hasSlot() {
      return !!this.$slots.default;
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-badge {
  position: relative;
  line-height: 0;

  &:not(.wt-badge--compat-mode) {
    width: fit-content;
    height: fit-content;
  }

  .wt-badge-indicator {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    width: var(--wt-badge-size);
    height: var(--wt-badge-size);

    &__pic {
      position: absolute;
      width: var(--wt-badge-size);
      height: var(--wt-badge-size);
    }
  }

  &--outside {
    .wt-badge-indicator {
      transform: translate(100%, -100%);
    }
  }
}
</style>

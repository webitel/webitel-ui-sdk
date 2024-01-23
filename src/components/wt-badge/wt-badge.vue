<template>
  <aside
    class="wt-badge"
    :class="{ 'wt-badge--outside': outside }"
    :style="{ background: iconBadge ? `url(${showIconBadge})` : `var(--${colorVariable})` }"
  />
</template>

<script>
import BadgeDnd from '../../assets/icons/badge-dnd.svg';
import BadgeOnline from '../../assets/icons/badge-online.svg';
import BadgePause from '../../assets/icons/badge-pause.svg';

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
  },
  computed: {
    showIconBadge() {
      switch (this.iconBadge) {
        case 'dnd':
          return BadgeDnd;
        case 'online':
          return BadgeOnline;
        case 'pause':
          return BadgePause;
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-badge {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--wt-badge-size);
  height: var(--wt-badge-size);
  border-radius: 50%;

  &--outside {
    transform: translate(100%, -100%);
  }
}
</style>

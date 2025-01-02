<template>
  <aside
    :class="{ 'wt-badge--outside': outside }"
    :style="{ background: `var(--${colorVariable})` }"
    class="wt-badge"
  >
    <img
      v-if="iconBadgePic"
      :alt="iconBadge"
      :src="iconBadgePic"
      class="wt-badge__pic"
    />
  </aside>
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
  },
};
</script>

<style lang="scss">
@use './variables.scss';
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

  &__pic {
    position: absolute;
    width: var(--wt-badge-size);
    height: var(--wt-badge-size);
  }
}
</style>

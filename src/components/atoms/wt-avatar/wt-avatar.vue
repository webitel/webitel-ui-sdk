<template>
  <div
    class="wt-avatar"
    :class="[`wt-avatar--size-${size}`]"
  >
    <wt-badge
      v-if="badge"
      :color-variable="badgeColorVar"
    ></wt-badge>
    <img
      class="wt-avatar__img"
      src="../../../assets/components/atoms/wt-avatar/default-avatar.svg"
      alt="avatar"
    >
  </div>
</template>

<script>
import AbstractUserStatus from '../../../enums/AbstractUserStatus/AbstractUserStatus.enum';

export default {
  name: 'wt-avatar',
  props: {
    size: {
      type: String,
      default: 'md',
      options: ['md'],
    },
    badge: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      options: AbstractUserStatus,
      default: AbstractUserStatus.OFFLINE,
    },
  },
  computed: {
    badgeColorVar() {
      switch (this.status) {
        case AbstractUserStatus.ACTIVE: return 'online-color';
        case AbstractUserStatus.DND: return 'dnd-color';
        case AbstractUserStatus.BUSY: return 'busy-color';
        case AbstractUserStatus.OFFLINE: return 'offline-color';
        default: return 'offline-color';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .wt-avatar {
    position: relative;
    width: var(--avatar-size);
    height: var(--avatar-size);

    &__img {
      width: 100%;
      height: 100%;
    }
  }
</style>

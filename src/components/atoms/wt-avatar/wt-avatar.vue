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
      :src="imgSrc"
      alt="avatar"
    >
  </div>
</template>

<script>
import defaultAvatar from '../../../assets/components/atoms/wt-avatar/default-avatar.svg';
import AbstractUserStatus from '../../../enums/AbstractUserStatus/AbstractUserStatus.enum';

export default {
  name: 'wt-avatar',
  props: {
    src: {
      type: String,
    },
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
    imgSrc() {
      return this.src || defaultAvatar;
    },
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
    user-select: none;

    &__img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    &--size-xs {
      width: var(--avatar-size--size-xs);
      height: var(--avatar-size--size-xs);
    }

    &--size-sm {
      width: var(--avatar-size--size-sm);
      height: var(--avatar-size--size-sm);
    }

    &--size-md {
      width: var(--avatar-size--size-md);
      height: var(--avatar-size--size-md);
    }

    &--size-lg {
      width: var(--avatar-size--size-lg);
      height: var(--avatar-size--size-lg);
    }

    &--size-xl {
      width: var(--avatar-size--size-xl);
      height: var(--avatar-size--size-xl);
    }
  }
</style>

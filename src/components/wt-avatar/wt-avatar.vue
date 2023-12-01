<template>
  <div
    class="wt-avatar"
    :class="[`wt-avatar--size-${size}`]"
  >
    <wt-badge
      v-if="badge"
      :color-variable="badgeColorVar"
      :icon-badge="isDnd ? 'dnd' : null"
    />
    <div
      v-if="isLetterAvatar"
      class="wt-avatar__letters"
      :style="{ background: `var(${avatarLettersBackground})` }"
    >
      {{ avatarLetters }}
    </div>
    <img
      v-else
      class="wt-avatar__img"
      :src="imgSrc"
      alt="avatar"
    >
  </div>
</template>

<script setup>
import { computed } from 'vue';
import defaultAvatar from '../../assets/components/atoms/wt-avatar/default-avatar.svg';
import AbstractUserStatus from '../../enums/AbstractUserStatus/AbstractUserStatus.enum';

const props = defineProps({
  src: {
    type: String,
  },
  size: {
    type: String,
    default: 'md',
    options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
  },
  badge: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    description: 'If passed, avatar is letter-based (if not passed src)',
  },
  status: {
    type: String,
    options: AbstractUserStatus,
    default: AbstractUserStatus.OFFLINE,
  },
});

const isLetterAvatar = computed(() => !props.src && props.username);

const avatarLetters = computed(() => {
  if (!props.username) return false;
  const abbreviation = props.username.split(' ').map((word) => word.at(0).toUpperCase()).join('');
  return abbreviation.length > 2 ? abbreviation.at(0).concat(abbreviation.at(-1)) : abbreviation;
});

const avatarLettersBackground = computed(() => {
  // en.concat(uk)
  const letterList = [
    { letters: 'AB'.concat('АБВ'), color: '--avatar-letters-p1-color' },
    { letters: 'CD'.concat('ГҐД'), color: '--avatar-letters-p2-color' },
    { letters: 'EF'.concat('ЕЄЖ'), color: '--avatar-letters-p3-color' },
    { letters: 'GH'.concat('ЗИІ'), color: '--avatar-letters-p4-color' },
    { letters: 'IJ'.concat('ЇЙК'), color: '--avatar-letters-p5-color' },
    { letters: 'KL'.concat('ЛМН'), color: '--avatar-letters-p6-color' },
    { letters: 'MN'.concat('ОПР'), color: '--avatar-letters-p7-color' },
    { letters: 'OP'.concat('СТУ'), color: '--avatar-letters-p8-color' },
    { letters: 'QR'.concat('ФХЦ'), color: '--avatar-letters-p9-color' },
    { letters: 'ST'.concat('ЧШЩ'), color: '--avatar-letters-p10-color' },
    { letters: 'UV'.concat('ЬЮЯ'), color: '--avatar-letters-p11-color' },
    { letters: 'WX'.concat(''), color: '--avatar-letters-p12-color' },
    { letters: 'YZ'.concat(''), color: '--avatar-letters-p13-color' },
  ];
  const searchedLetter = letterList.find(({ letters }) => letters.includes(avatarLetters.value.at(0).toUpperCase()));
  return (searchedLetter && searchedLetter.color) || '--avatar-letters-p1-color';
});

const imgSrc = computed(() => props.src || defaultAvatar);

const isDnd = computed(() => props.status === AbstractUserStatus.DND);

const badgeColorVar = computed(() => {
  switch (props.status) {
    case AbstractUserStatus.ACTIVE:
      return 'online-color';
    case AbstractUserStatus.DND:
      return 'dnd-color';
    case AbstractUserStatus.BUSY:
      return 'busy-color';
    case AbstractUserStatus.OFFLINE:
      return 'offline-color';
    default:
      return 'offline-color';
  }
});
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

%wt-avatar-typo-sm {
  font-size: 12px;
}

%wt-avatar-typo-lg {
  font-size: 20px;
}

%wt-avatar-typo-2xl {
  font-size: 36px;
}

%wt-avatar-typo-3xl {
  font-size: 48px;
}

.wt-avatar {
  position: relative;
  width: var(--avatar-size);
  height: var(--avatar-size);
  user-select: none;
  border-radius: 50%;

  &__letters {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--avatar-font-color);
    border-radius: 50%;
  }

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
    @extend %wt-avatar-typo-sm;
    width: var(--avatar-size--size-sm);
    height: var(--avatar-size--size-sm);
  }

  &--size-md {
    width: var(--avatar-size--size-md);
    height: var(--avatar-size--size-md);
  }

  &--size-lg {
    @extend %wt-avatar-typo-lg;
    width: var(--avatar-size--size-lg);
    height: var(--avatar-size--size-lg);
  }

  &--size-xl {
    width: var(--avatar-size--size-xl);
    height: var(--avatar-size--size-xl);
  }

  &--size-2xl {
    @extend %wt-avatar-typo-2xl;
    width: var(--avatar-size--size-2xl);
    height: var(--avatar-size--size-2xl);
  }

  &--size-3xl {
    @extend %wt-avatar-typo-3xl;
    width: var(--avatar-size--size-3xl);
    height: var(--avatar-size--size-3xl);
  }
}
</style>

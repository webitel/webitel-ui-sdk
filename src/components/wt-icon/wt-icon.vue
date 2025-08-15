<template>
  <svg
    :class="[
      'wt-icon',
      `wt-icon--size-${size}`,
      `wt-icon--color-${color}`,
      { 'wt-icon--disabled': disabled },
    ]"
  >
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ComponentSize, IconColor } from '../../enums';

interface Props {
  /**
   * Icon name
   * @example '<wt-icon icon="close"></wt-icon>'
   */
  icon: string;
  size?: ComponentSize;
  color?: IconColor;
  /**
   * inserts icon name prefix between "icon" and actual icon name ("icon" prop).
   * Useful for library icons extension with project-level icons with this prefix in name
   */
  iconPrefix?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: ComponentSize.MD,
  color: IconColor.DEFAULT,
  iconPrefix: '',
  disabled: false,
});

const iconName = computed(() => {
  let name = '#';
  if (props.iconPrefix) name += `${props.iconPrefix}-`;
  return `${name}${props.icon}`;
});
</script>

<style lang="scss">
@use './variables.scss';

.wt-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);
  stroke-width: 0;
  fill: var(--icon-color);

  &--size-xs { width: var(--icon-xs-size); height: var(--icon-xs-size); }
  &--size-sm { width: var(--icon-sm-size); height: var(--icon-sm-size); }
  &--size-md { width: var(--icon-md-size); height: var(--icon-md-size); }
  &--size-lg { width: var(--icon-lg-size); height: var(--icon-lg-size); }
  &--size-xl { width: var(--icon-xl-size); height: var(--icon-xl-size); }
  &--size-2xl { width: var(--icon-2xl-size); height: var(--icon-2xl-size); }
  &--size-3xl { width: var(--icon-3xl-size); height: var(--icon-3xl-size); }

  &--color-default { fill: var(--icon-color); }
  &--color-active { fill: var(--icon-active-color); }
  &--color-primary { fill: var(--icon-primary-color); }
  &--color-error { fill: var(--icon-error-color); }
  &--color-success { fill: var(--icon-success-color); }
  &--color-warning { fill: var(--icon-warning-color); }
  &--color-on-dark { fill: var(--icon-on-dark-color); }
  &--color-on-light { fill: var(--icon-on-light-color); }
  &--color-on-primary { fill: var(--icon-on-primary-color); }
  &--color-info { fill: var(--icon-info-color); }
  &--color-chat { fill: var(--icon-chat-color); }
  &--color-transfer { fill: var(--icon-transfer-color); }
  &--color-job { fill: var(--icon-job-color); }
  &--color-disabled { fill: var(--icon-disabled-color); }

  &--disabled {
    fill: var(--icon-disabled-color);
  }
}
</style>
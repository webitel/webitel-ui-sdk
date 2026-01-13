<template>
  <span
:class="[
    'wt-icon',
    `wt-icon--size-${size}`,
    `wt-icon--color-${color}`,
    { 'wt-icon--disabled': disabled },
  ]" @click="emit('click')" v-html="iconSvg" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ComponentSize, IconColor } from '../../enums';
import { getIconFromRepository } from './utils/iconsRepository';

interface Props {
	/**
	 * Icon name
	 * @example '<wt-icon icon="close"></wt-icon>'
	 */
	icon: string;
	size?: ComponentSize;
	color?: IconColor;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	size: ComponentSize.MD,
	color: IconColor.DEFAULT,
	disabled: false,
});

const emit = defineEmits<{
	click: MouseEvent[];
}>();

const iconSvg = computed(() => {
	return getIconFromRepository(props.icon) || props.icon;
});
</script>

<style>
.wt-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);
  stroke-width: 0;
  fill: var(--icon-color);
}

.wt-icon--size-xs {
  width: var(--icon-xs-size);
  height: var(--icon-xs-size);
}

.wt-icon--size-sm {
  width: var(--icon-sm-size);
  height: var(--icon-sm-size);
}

.wt-icon--size-md {
  width: var(--icon-md-size);
  height: var(--icon-md-size);
}

.wt-icon--size-lg {
  width: var(--icon-lg-size);
  height: var(--icon-lg-size);
}

.wt-icon--size-xl {
  width: var(--icon-xl-size);
  height: var(--icon-xl-size);
}

.wt-icon--size-2xl {
  width: var(--icon-2xl-size);
  height: var(--icon-2xl-size);
}

.wt-icon--size-3xl {
  width: var(--icon-3xl-size);
  height: var(--icon-3xl-size);
}

.wt-icon--color-default {
  fill: var(--icon-color);
}

.wt-icon--color-active {
  fill: var(--icon-active-color);
}

.wt-icon--color-primary {
  fill: var(--icon-primary-color);
}

.wt-icon--color-error {
  fill: var(--icon-error-color);
}

.wt-icon--color-success {
  fill: var(--icon-success-color);
}

.wt-icon--color-warning {
  fill: var(--icon-warning-color);
}

.wt-icon--color-on-dark {
  fill: var(--icon-on-dark-color);
}

.wt-icon--color-on-light {
  fill: var(--icon-on-light-color);
}

.wt-icon--color-on-primary {
  fill: var(--icon-on-primary-color);
}

.wt-icon--color-info {
  fill: var(--icon-info-color);
}

.wt-icon--color-chat {
  fill: var(--icon-chat-color);
}

.wt-icon--color-transfer {
  fill: var(--icon-transfer-color);
}

.wt-icon--color-job {
  fill: var(--icon-job-color);
}

.wt-icon--color-disabled {
  fill: var(--icon-disabled-color);
}

.wt-icon--disabled {
  fill: var(--icon-disabled-color);
}
</style>
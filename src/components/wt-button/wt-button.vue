<template>
  <p-button
    :class="{
        'p-button--width-by-content': widthByContent || icon,
        'p-button--wide': wide,
        'p-button--with-badge': props.badge,
        'p-button--loading': showLoader,
        'p-button--icon': icon,
        [`p-button--size-${size}`]: true,
        [ `p-button--icon-${variant} p-button--icon-${size}` ]: icon,
				[ `typo-button--${size}` ]: size,
      }"
    :disabled="disabled"
    :loading="showLoader"
    :severity="color"
    :size="primevueSizeMap[size]"
    :variant="variant"
    class="wt-button typo-button"
    v-bind="attrs"
    @click.prevent="emit('click', $event)"
  >
    <wt-loader
      v-if="showLoader"
      :color="loaderColor"
      size="sm"
    />
    <div class="wt-button__contents">
      <slot v-if="!icon"> no content provided</slot>

      <wt-icon
        v-if="icon"
        :class="{ 'wt-button__icon--hidden': showLoader }"
        :icon="icon"
        :icon-prefix="iconPrefix"
        :size="iconButtonSizeMap[size]"
      />
    </div>
  </p-button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from 'primevue';
import { computed, inject, ref, toRef, useAttrs, watch } from 'vue';

import { ButtonColor, ButtonVariant, ComponentSize } from '../../enums';
import WtIcon from '../wt-icon/wt-icon.vue';

const primevueSizeMap: Record<string, string> = {
	[ComponentSize.XS]: 'extra-small',
	[ComponentSize.SM]: 'small',
	[ComponentSize.MD]: 'medium',
};

const iconButtonSizeMap: Record<string, ComponentSize> = {
	[ComponentSize.XS]: ComponentSize.SM,
	[ComponentSize.SM]: ComponentSize.SM,
	[ComponentSize.MD]: ComponentSize.MD,
};

interface WtButtonProps extends /* @vue-ignore */ ButtonProps {
	color?: ButtonColor;
	disabled?: boolean;
	loading?: boolean;
	size?: ComponentSize;
	wide?: boolean;
	widthByContent?: boolean;
	icon?: string;
	iconPrefix?: string;
	variant?: ButtonVariant;
}

const props = withDefaults(defineProps<WtButtonProps>(), {
	color: ButtonColor.PRIMARY,
	disabled: false,
	loading: false,
	size: ComponentSize.MD,
	wide: false,
	widthByContent: false,
	icon: '',
	iconPrefix: '',
	variant: ButtonVariant.ACTIVE,
});

const emit = defineEmits([
	'click',
]);

const attrs = useAttrs();

const showLoader = ref(false);

const darkMode = toRef(inject<boolean>('darkMode'));

/**
 * @author: @Opelsandr Palonnyi
 *
 * [WTEL-7995](https://webitel.atlassian.net/browse/WTEL-7995)
 *
 * link to comment - https://webitel.atlassian.net/browse/WTEL-7992?focusedCommentId=705256
 * */
const loaderColor = computed(() => {
	return darkMode.value ? 'on-dark' : 'on-light';
	// if (['success', 'transfer', 'error', 'job'].includes(props.color)) return 'on-dark';
	// return 'on-light';
});

watch(
	() => props.loading,
	(value) => {
		if (value) {
			showLoader.value = true;
		} else {
			setTimeout(() => {
				showLoader.value = value;
			}, 1000); // why 1s? https://ux.stackexchange.com/a/104782
		}
	},
	{
		immediate: true,
	},
);
</script>

<style>
.wt-button {
  position: relative;
}

.wt-button__contents {
  display: contents;
}

/*
	@author HlukhovYe
	Hides the icon instantly when the loader is shown.
*/
.wt-button__icon--hidden {
  opacity: 0;
}
</style>

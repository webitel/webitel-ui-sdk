<template>
  <p-button
    :class="{
        'p-button--width-by-content': widthByContent || icon,
        'p-button--wide': wide,
        'p-button--with-badge': props.badge,
        'p-button--loading': showLoader,
        'p-button--icon': icon,
        [ `p-button--icon-${variant} p-button--icon-${size}` ]: icon,
      }"
    :disabled="disabled"
    :loading="showLoader"
    :severity="color"
    :size="primevueSizeMap[size]"
    :variant="variant"
    class="wt-button typo-button typo-button"
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

      <wt-badge
        v-if="props.badge"
        :value="props.badge"
        :severity="props.badgeSeverity"
        :class="badgeClass"
        :size="ComponentSize.MD"
      >
        <template #default>
          <slot name="badge">
            {{ props.badge }}
          </slot>
        </template>
      </wt-badge>

      <wt-icon
        v-if="icon"
        :icon="icon"
        :icon-prefix="iconPrefix"
        :size="iconButtonSizeMap[size]"
      />
    </div>
  </p-button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from 'primevue';
import { computed, inject, ref, useAttrs, watch } from 'vue';

import { ButtonColor, ButtonVariant, ComponentSize } from '../../enums';
import WtBadge from '../wt-badge-new/wt-badge.vue';
import WtIcon from '../wt-icon/wt-icon.vue';

const primevueSizeMap = {
	[ComponentSize.XS]: 'extra-small',
	[ComponentSize.SM]: 'small',
	[ComponentSize.MD]: 'medium',
};

const iconButtonSizeMap = {
	[ComponentSize.XS]: 'sm',
	[ComponentSize.SM]: 'sm',
	[ComponentSize.MD]: 'md',
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
	badge?: string;
	badgeSeverity?: string;
	badgeAbsolutePosition?: boolean;
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

const badgeClass = computed(() => ({
	'wt-badge--absolute': props.badgeAbsolutePosition,
}));

// @Ler24
// Compatibility mode for Vuex (old mode) and when there is no Vuex in project (new mode)
const store = ref(null);

const initStore = async () => {
	try {
		const vuex = await import('vuex');
		store.value = vuex.useStore();
	} catch (e) {
		store.value = null;
	}
};
initStore();

const injectDarkMode = inject('darkMode');

const darkMode = computed(() => {
	if (injectDarkMode?.value) {
		return injectDarkMode.value;
	}

	if (store?.value?.getters) {
		return store?.value?.getters['appearance/DARK_MODE'] ?? false;
	}

	return false;
});

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

.wt-button--with-badge {
      overflow: visible;
}

.wt-button.p-button {
  .wt-button__contents {
	display: contents;
  }

  .wt-badge .wt-badge--absolute {
	position: absolute;
    top: 0;
    right: 0;
  }
}
</style>

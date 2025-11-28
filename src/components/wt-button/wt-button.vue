<template>
  <p-button
    :class="{
        'p-button--width-by-content': widthByContent || icon,
        'p-button--wide': wide,
        'p-button--loading': showLoader,
        'p-button--icon': icon,
        [ `p-button--icon-${variant} p-button--icon-${size}` ]: icon,
      }"
    :disabled="disabled"
    :loading="showLoader"
    :severity="color"
    :size="primevueSizeMap[size]"
    :variant="variant"
    class="wt-button"
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
        v-else
        :icon="icon"
        :icon-prefix="iconPrefix"
        :size="iconButtonSizeMap[size]"
      />
    </div>
  </p-button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from 'primevue';
import { computed, defineEmits, defineProps, ref, useAttrs, watch, inject } from 'vue';

import { ButtonColor, ButtonVariant, ComponentSize,  } from '../../enums';

const primevueSizeMap = {
  [ComponentSize.XS]: 'extra-small',
  [ComponentSize.SM]: 'small',
  [ComponentSize.MD]: 'medium',
}

const iconButtonSizeMap = {
  [ComponentSize.XS]: 'sm',
  [ComponentSize.SM]: 'sm',
  [ComponentSize.MD]: 'md',
}

interface WtButtonProps extends  /* @vue-ignore */ ButtonProps {
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

const emit = defineEmits(['click']);

const attrs = useAttrs();

const showLoader = ref(false);

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
}
initStore();

const darkModeNewOption = inject('darkMode');

const darkMode = computed(() => {
  if (darkModeNewOption?.value) {
    return darkModeNewOption.value;
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
  }, {
    immediate: true,
  },
);
</script>

<style lang="scss">
.wt-button__contents {
  display: contents;
}
</style>

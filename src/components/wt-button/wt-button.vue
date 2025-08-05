<template>
  <p-button
    :class="{
        'p-button--width-by-content': widthByContent,
        'p-button--contains-icon': containsIcon,
        'p-button--wide': wide,
        'p-button--loading': showLoader,
      }"
    :disabled="disabled"
    :loading="showLoader"
    :severity="color"
    :size="primevueSizeMap[size]"
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
      <slot> no content provided</slot>
    </div>
  </p-button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from 'primevue';
import {computed, defineEmits, defineProps, ref, useAttrs, watch} from 'vue';

import { ButtonColor,ComponentSize } from '../../enums';

const primevueSizeMap = {
  [ComponentSize.SM]: 'small',
  [ComponentSize.MD]: 'medium',
};

interface WtButtonProps extends  /* @vue-ignore */ ButtonProps {
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  size?: ComponentSize;
  wide?: boolean;
  widthByContent?: boolean;
  containsIcon?: boolean;
}

const props = withDefaults(defineProps<WtButtonProps>(), {
  color: ButtonColor.PRIMARY,
  disabled: false,
  loading: false,
  size: ComponentSize.MD,
  wide: false,
  widthByContent: false,
  containsIcon: false,
});

const emit = defineEmits(['click']);

const attrs = useAttrs();

const showLoader = ref(false);

const loaderColor = computed(() => {
  return 'on-dark';
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

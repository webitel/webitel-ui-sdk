<template>
  <div
    :class="[
      `wt-expansion-card--${props.size}`,
      { 'wt-expansion-card--opened': opened }
    ]"
    class="wt-expansion-card"
  >
    <div
      class="wt-expansion-card-header typo-body-2"
      tabindex="0"
      @click="toggle"
      @keypress.enter="toggle"
    >
      <slot name="header"></slot>
    </div>

    <wt-expand-transition v-show="opened">
      <div class="wt-expansion-card-body typo-body-2">
        <slot> </slot>
      </div>
    </wt-expand-transition>

    <div
      class="wt-expansion-card-actions"
      @click="toggle"
      @keypress.enter="toggle"
    >
      <slot name="actions" v-bind="{ open, opened }"></slot>
      <wt-icon
        class="wt-expansion-card-arrow"
        icon="arrow-down"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useExpansion } from '../../composables';

import WtExpandTransition from '../transitions/wt-expand-transition.vue';
import { ComponentSize } from '../../enums';

const props = withDefaults(
	defineProps<{
		/**
		 * Size of the expansion panel
		 * @type {string}
		 * @default 'md'
		 * @options ['sm', 'md']
		 */
		size?: ComponentSize;
		/**
		 * Whether the expansion panel is initially collapsed. Also, can force expansion state, if changed
		 * @type {boolean}
		 * @default false
		 */
		collapsed?: boolean;
	}>(),
	{
		size: ComponentSize.MD,
		collapsed: false,
	},
);

const emit = defineEmits<{
	opened: [];
	closed: [];
}>();

const { opened, open, toggle } = useExpansion(toRef(props, 'collapsed'), emit);
</script>

<style scoped>
.wt-expansion-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--content-wrapper-padding);
  border-radius: var(--spacing-xs);
  box-shadow: var(--elevation-10);
}

.wt-expansion-card-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--wt-expansion-card-header-background-color);
  color: var(--wt-expansion-card-header-title-color);
}

.wt-expansion-card-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--content-wrapper-gap);
}

.wt-expansion-card-arrow {
  transition: var(--transition);
  cursor: pointer;
}

.wt-expansion-card--opened .wt-expansion-card-arrow {
  transform: rotate(180deg);
}

.wt-expansion-card-body {
  padding: var(--content-wrapper-gap) 0;
  background-color: var(--wt-expansion-card-content-background-color);
  color: var(--wt-expansion-card-content-text-color);
}

</style>


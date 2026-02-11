<template>
  <div
    :class="[`wt-expansion-card--${props.size}`]"
    class="wt-expansion-card"
  >
    <div
      :class="[props.size === 'sm' ? 'typo-subtitle-2' : 'typo-subtitle-1']"
      class="wt-expansion-card-header"
      tabindex="0"
      @click="toggle"
      @keypress.enter="toggle"
    >
      <slot name="title"></slot>
    </div>

    <wt-expand-transition v-show="opened">
      <div class="wt-expansion-card-body">
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
        :class="{ 'wt-expansion-card-arrow--opened': opened }"
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

const { opened, open, toggle } = useExpansion(
	toRef(props, 'collapsed', false),
	emit,
);
</script>

<style scoped>
.wt-expansion-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xs);
  gap: var(--spacing-xs);
  border-radius: var(--spacing-xs);
  box-shadow: var(--elevation-10);
}

.wt-expansion-card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: var(--wt-expansion-card-header-background-color);
  color: var(--wt-expansion-card-header-title-color);
}

.wt-expansion-card-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.wt-expansion-card-arrow {
  transition: var(--transition);
}

.wt-expansion-card-arrow--opened {
  transform: rotate(180deg);
}

.wt-expansion-card-body {
  background-color: var(--wt-expansion-card-content-background-color);
  color: var(--wt-expansion-card-content-text-color);
}

</style>


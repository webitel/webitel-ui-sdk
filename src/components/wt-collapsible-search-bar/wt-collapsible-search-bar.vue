<template>
  <div
    ref="root"
    :class="[
      'wt-collapsible-search-bar',
      { 'wt-collapsible-search-bar--expanded': isExpanded },
    ]"
    @focusout="handleFocusout"
    @keydown="handleKeydown"
  >
    <div
      :inert="!isExpanded"
      class="wt-collapsible-search-bar__field"
    >
      <wt-search-bar
        ref="searchBar"
        :value="value"
        :placeholder="placeholder"
        :hint="hint"
        :size="ComponentSize.SM"
        reset-icon="close--filled"
        full-width
        @input="emit('input', $event)"
        @search="emit('search', $event)"
        @reset="collapse({ focusToggle: true })"
      />
    </div>

    <!-- stays mounted to keep the focus after Escape; hidden while expanded -->
    <wt-button
      ref="toggle"
      :inert="isExpanded"
      :aria-expanded="isExpanded"
      :aria-label="placeholder || $t('webitelUI.searchBar.placeholder')"
      :color="ButtonColor.SECONDARY"
      :size="ComponentSize.SM"
      :variant="ButtonVariant.TEXT"
      class="wt-collapsible-search-bar__toggle"
      icon="search"
      @click="expand"
    />
  </div>
</template>

<script lang="ts" setup>
/**
 * A search bar that stays collapsed to a magnifier button while it is empty
 * and not focused ("Search button" in the Design System).
 * It grows in the flow, so the container's alignment decides the direction
 * it opens to.
 * Search modes and validation of wt-search-bar are not supported.
 */
import { ref } from 'vue';

import { ButtonColor, ButtonVariant, ComponentSize } from '../../enums';
import WtButton from '../wt-button/wt-button.vue';
import WtSearchBar from '../wt-search-bar/wt-search-bar.vue';
import { useCollapsibleSearch } from './_internals/composables/useCollapsibleSearch';

const props = withDefaults(
	defineProps<{
		/**
		 * Current search value
		 */
		value?: string;
		/**
		 * Placeholder of the field, also the label of the magnifier button
		 */
		placeholder?: string;
		hint?: string;
	}>(),
	{
		value: '',
	},
);

const emit = defineEmits<{
	/**
	 * @param value - search value, not debounced
	 */
	input: [
		string,
	];
	/**
	 * @param value - search value, debounced (and on Enter)
	 */
	search: [
		string,
	];
}>();

const root = ref<HTMLElement | null>(null);
const searchBar = ref<InstanceType<typeof WtSearchBar> | null>(null);
const toggle = ref<InstanceType<typeof WtButton> | null>(null);

const { isExpanded, expand, collapse, handleFocusout, handleKeydown } =
	useCollapsibleSearch({
		getValue: () => props.value,
		getRoot: () => root.value,
		getSearchBar: () => searchBar.value,
		getToggle: () => toggle.value?.$el as HTMLElement | undefined,
	});
</script>

<style scoped>
.wt-collapsible-search-bar {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: var(--wt-collapsible-search-bar-collapsed-width);
  overflow: hidden;
  transition: width var(--transition) ease-in-out;
}

.wt-collapsible-search-bar--expanded {
  width: var(--wt-collapsible-search-bar-width);
}

.wt-collapsible-search-bar__field {
  width: 100%;
  /* stays visible while the field shrinks on collapse */
  visibility: hidden;
  transition: visibility 0s linear var(--transition);
}

.wt-collapsible-search-bar--expanded .wt-collapsible-search-bar__field {
  visibility: visible;
  transition-delay: 0s;
}

/*
 * Swaps with the field at the end of the collapse, mirroring the expand,
 * where the field replaces it at once
 */
.wt-collapsible-search-bar__toggle {
  position: absolute;
  top: 50%;
  inset-inline-end: 0;
  transform: translateY(-50%);
  transition: opacity 0s linear var(--transition);
}

.wt-collapsible-search-bar--expanded .wt-collapsible-search-bar__toggle {
  opacity: 0;
  pointer-events: none;
  transition-delay: 0s;
}

@media (prefers-reduced-motion: reduce) {
  .wt-collapsible-search-bar,
  .wt-collapsible-search-bar__field,
  .wt-collapsible-search-bar__toggle {
    transition: none;
  }
}
</style>

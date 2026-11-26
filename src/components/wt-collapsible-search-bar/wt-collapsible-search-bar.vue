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
import { computed, nextTick, ref } from 'vue';

import { ButtonColor, ButtonVariant, ComponentSize } from '../../enums';
import WtButton from '../wt-button/wt-button.vue';
import WtSearchBar from '../wt-search-bar/wt-search-bar.vue';

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

const TOGGLE_CLASS = 'wt-collapsible-search-bar__toggle';

const root = ref<HTMLElement | null>(null);
const searchBar = ref<InstanceType<typeof WtSearchBar> | null>(null);
const toggle = ref<InstanceType<typeof WtButton> | null>(null);

/**
 * The agent opened the field and the focus has not left it yet
 */
const isOpen = ref(false);

/**
 * A blank string is no search
 */
const hasQuery = computed(() => props.value.trim() !== '');

const isExpanded = computed(() => isOpen.value || hasQuery.value);

async function expand() {
	isOpen.value = true;
	await nextTick();
	searchBar.value?.focus();
}

async function collapse({ focusToggle = false } = {}) {
	isOpen.value = false;
	if (!focusToggle) return;
	await nextTick();
	(toggle.value?.$el as HTMLElement | undefined)?.focus();
}

function handleFocusout(event: FocusEvent) {
	const nextTarget = event.relatedTarget as Node | null;
	if (nextTarget && root.value?.contains(nextTarget)) return;

	/* the magnifier button loses focus when it turns inert on expand */
	if ((event.target as Element | null)?.closest?.(`.${TOGGLE_CLASS}`)) return;

	if (props.value && !hasQuery.value) searchBar.value?.clear();
	collapse();
}

function handleKeydown(event: KeyboardEvent) {
	if (event.key !== 'Escape') return;
	if (!(event.target instanceof HTMLInputElement)) return;

	event.preventDefault();
	searchBar.value?.clear();
	collapse({
		focusToggle: true,
	});
}
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

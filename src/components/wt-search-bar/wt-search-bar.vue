<template>
  <wt-input-text
    :model-value="value"
    :placeholder="placeholder || $t('webitelUI.searchBar.placeholder')"
    :invalid="invalid"
    type="search"
    @update:model-value="handleInput"
    @keyup="handleKeyup"
  >
    <template #prefix>
      <wt-icon
        :color="invalidColorProvider"
        :icon="searchMode?.icon || 'search'"
      />
    </template>

    <template #suffix v-if="isSuffixShow">
      <div class="wt-search-bar__icon-controls">
        <wt-icon-btn
          v-if="value"
          :color="invalidColorProvider"
          class="wt-search-bar__reset-icon-btn"
          icon="close"
          @click="handleInput('')"
        />
        <wt-hint
          v-if="hint"
          :icon-color="invalidColorProvider"
        >
          {{ hint }}
        </wt-hint>

        <wt-context-menu
          v-if="searchMode"
          :options="searchModeOptions"
          @click="updateSearchMode"
        >
          <template #activator="{ toggle }">
            <wt-icon-btn
              v-tooltip="$t('webitelUI.searchBar.settingsHint')"
              :color="invalid ? 'error' : 'default'"
              icon="filter"
              @click="toggle"
            />
          </template>

          <template #option="{ value, text }">
            <wt-radio
              :label="text"
              :selected="
                (typeof searchMode === 'string'
                  ? searchMode
                  : searchMode.value) === value
              "
              :value="true"
            />
          </template>
        </wt-context-menu>

        <slot
          :invalid="invalid"
          name="additional-actions"
        />
      </div>
    </template>
  </wt-input-text>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';

import { useValidation } from '../../mixins/validationMixin/useValidation';
import debounce from '../../scripts/debounce.js';

const props = defineProps({
	v: {
		type: Object,
	},
	customValidators: {
		type: Array,
		default: () => [],
	},
	/**
	 * Current search-bar value (`v-model`)
	 */
	value: {
		type: String,
		default: '',
	},
	/**
	 * search-bar placeholder
	 */
	placeholder: {
		type: String,
	},
	hint: {
		type: String,
		description: 'Adds hint icon + tooltip with text, passed as "hint" prop',
	},
	searchMode: {
		type: [
			String,
			Object,
		],
	},
	searchModeOptions: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits<{
	/**
	 * @param value - search-bar value
	 */
	input: [
		string,
	];
	/**
	 * @param value - search-bar value
	 */
	search: [
		string,
	];
	/**
	 * @param value - search-bar value
	 */
	enter: [
		string,
	];
	/**
	 * @param option - selected search mode
	 */
	'update:search-mode': [
		string | object,
	];
	/**
	 * @deprecated
	 * @param option - selected search mode
	 */
	'change:search-mode': [
		string | object,
	];
}>();

const { v, customValidators } = toRefs(props);

const { invalid } = useValidation({
	v,
	customValidators,
});

const invalidColorProvider = computed(() =>
	invalid.value ? 'error' : 'default',
);

const isSuffixShow = computed(
	() => props.value || props.searchMode || props.hint,
);

const search = debounce((value) => {
	emit('search', value);
}, 1000);

function handleInput(value) {
	emit('input', value);
	search(value);
}

function handleKeyup(event) {
	if (event.key === 'Enter') {
		search(event.target.value);
		event.preventDefault();
	} else if (event.key === 'Esc') {
		handleInput('');
		event.preventDefault();
	}
}

function updateSearchMode({ option }) {
	emit('update:search-mode', option);
	emit('change:search-mode', option);
}
</script>

<style scoped>
.wt-search-bar__icon-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
<template>
  <div
    :class="{
      'wt-search-bar--invalid': invalid,
    }"
    class="wt-search-bar"
  >
    <div class="wt-search-bar__wrapper">
      <div class="wt-search-bar__search-icon">
        <slot
          v-bind="{ invalid, searchMode }"
          name="search-icon"
        >
          <wt-icon
            :color="invalidColorProvider"
            :icon="searchMode?.icon || 'search'"
          />
        </slot>
      </div>
      <input
        :placeholder="placeholder || $t('webitelUI.searchBar.placeholder')"
        :value="value"
        class="wt-search-bar__input"
        type="search"
        @input="handleInput($event.target.value)"
        @keyup="handleKeyup"
      />
      <div class="wt-search-bar__icon-controls">
        <wt-icon-btn
          :class="{ hidden: !value }"
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
    </div>
  </div>
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
    type: [String, Object],
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
  input: [string];
  /**
   * @param value - search-bar value
   */
  search: [string];
  /**
   * @param value - search-bar value
   */
  enter: [string];
  /**
   * @param option - selected search mode
   */
  'update:search-mode': [string | object];
  /**
   * @deprecated
   * @param option - selected search mode
   */
  'change:search-mode': [string | object];
}>();

const { v, customValidators } = toRefs(props);

const { invalid } = useValidation({ v, customValidators });

const invalidColorProvider = computed(() =>
  invalid.value ? 'error' : 'default',
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
    search(props.value);
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

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../css/styleguide/styleguide' as *;

.wt-search-bar {
  cursor: text;

  &.wt-search-bar--invalid {
    .wt-search-bar__wrapper {
      outline: none; // prevent outline overlapping false color
      border-color: var(--wt-text-field-input-border-error-color);
    }

    .wt-search-bar__input {
      @include wt-placeholder('error');
      color: var(--wt-text-field-error-text-color);
    }
  }

  .wt-search-bar__wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    border: var(--input-border);
    border-color: var(--wt-text-field-input-border-color);
    border-radius: var(--border-radius);
    padding: calc(var(--spacing-xs) - 1px) var(--spacing-xs);
  }

  .wt-search-bar__search-icon {
    display: flex;
  }

  .wt-search-bar__reset-icon-btn {
    .wt-search-bar:not(:focus-within) & {
      opacity: 0;
      pointer-events: none;
    }
  }

  .wt-search-bar__input {
    @extend %typo-body-1;
    @include wt-placeholder;

    display: block;
    transition: var(--transition);
    box-sizing: border-box;
    outline: none;
    border: none;
    background: transparent;
    padding: 0;
    width: 100%;
    color: var(--wt-text-field-text-color);
  }

  /* clears the 'X' from Internet Explorer */
  .wt-search-bar__input::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }

  .wt-search-bar__input::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }

  /* clears the 'X' from Chrome */
  .wt-search-bar__input::-webkit-search-decoration,
  .wt-search-bar__input::-webkit-search-cancel-button,
  .wt-search-bar__input::-webkit-search-results-button,
  .wt-search-bar__input::-webkit-search-results-decoration {
    display: none;
  }

  .wt-search-bar__icon-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }
}
</style>

<template>
  <div
    :class="{
      'wt-search-bar--outline': outline,
      'wt-search-bar--invalid': invalid,
    }"
    class="wt-search-bar"
  >
    <div class="wt-search-bar__wrapper">
      <div class="wt-search-bar__search-icon">
        <slot
          :invalid="invalid"
          name="search-icon"
        >
          <wt-icon
            :color="invalidColorProvider"
            icon="search"
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
      >
      <div class="wt-search-bar__icon-controls">
        <wt-icon-btn
          :class="{ 'hidden': !value }"
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
        <slot
          :invalid="invalid"
          name="additional-actions"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { useValidation } from '../../mixins/validationMixin/useValidation';
import debounce from '../../scripts/debounce';

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
  outline: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    description: 'Adds hint icon + tooltip with text, passed as "hint" prop',
  },
});

const emit = defineEmits([
  'input',
  'search',
  'enter',
]);

const { v, customValidators } = toRefs(props);

const { invalid } = useValidation({ v, customValidators });

const invalidColorProvider = computed(() => (invalid.value ? 'error' : 'default'));

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
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-search-bar {
  cursor: text;

  &.wt-search-bar--invalid {
    .wt-search-bar__wrapper {
      border-color: var(--false-color);
      outline: none; // prevent outline overlapping false color
    }

    .wt-search-bar__input {
      color: var(--false-color);
    }
  }

  .wt-search-bar__wrapper {
    display: flex;
    align-items: center;
    padding: calc(var(--spacing-xs) - 1px) var(--spacing-xs);
    border: var(--input-border);
    border-color: var(--form-border-color);
    border-radius: var(--border-radius);
    gap: var(--spacing-xs);
  }

  .wt-search-bar__search-icon {
    display: flex;
  }

  .wt-search-bar__reset-icon-btn {
    .wt-search-bar:not(:focus-within) & {
      pointer-events: none;
      opacity: 0;
    }
  }

  .wt-search-bar__input {
    @extend %typo-body-1;
    @include wt-placeholder;

    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 0;
    transition: var(--transition);
    color: var(--form-input-color);
    border: none;
    outline: none;

    &:focus {
      @include wt-placeholder('focus');
      border-color: var(--form-border--hover-color);
    }

    .wt-search-bar--outline & {
      border-color: var(--form-outline-border-color);
    }

    .wt-search-bar--outline:hover &,
    .wt-search-bar--outline &:focus {
      border-color: var(--form-outline-border--hover-color);
    }
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

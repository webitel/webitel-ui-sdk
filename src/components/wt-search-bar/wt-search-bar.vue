<template>
  <div
    :class="{
      'wt-search-bar--outline': outline,
    }"
    class="wt-search-bar"
  >
    <div class="wt-search-bar__wrapper">
      <input
        :placeholder="placeholder || $t('webitelUI.searchBar.placeholder')"
        :value="value"
        class="wt-search-bar__input"
        type="search"
        @input="handleInput($event.target.value)"
        @keyup="handleKeyup"
      >
      <div class="wt-search-bar__search-icon">
        <slot name="search-icon">
          <wt-icon
            icon="search"
          ></wt-icon>
        </slot>
      </div>
      <wt-icon-btn
        :class="{ 'hidden': !value }"
        class="wt-search-bar__reset-icon-btn"
        icon="close"
        @click="handleInput('')"
      ></wt-icon-btn>
    </div>
  </div>
</template>

<script setup>
import debounce from '../../scripts/debounce';

const props = defineProps({
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
});

const emit = defineEmits([
  'input',
  'search',
  'enter',
]);

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

  .wt-search-bar__wrapper {
    position: relative;
  }

  .wt-search-bar__search-icon {
    position: absolute;
    top: 50%;
    left: var(--input-icon-margin);
    transform: translateY(-50%);
    line-height: 0;
    pointer-events: none;
  }

  .wt-search-bar__reset-icon-btn {
    position: absolute;
    top: 50%;
    right: var(--input-icon-margin);
    transform: translateY(-50%);

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
    padding: var(--search-bar-padding);
    transition: var(--transition);
    color: var(--form-input-color);
    border: var(--input-border);
    border-color: var(--form-border-color);
    border-radius: var(--border-radius);

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

  /* make icons black */
  .wt-search-bar:hover ::v-deep .wt-icon__icon,
  .wt-search-bar:focus-within ::v-deep .wt-icon__icon {
    fill: var(--icon-color--hover);
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
}
</style>

<template>
  <div
    class="wt-search-bar"
    :class="{
      'wt-search-bar--outline': outline,
    }"
  >
    <div class="wt-search-bar__wrapper">
      <input
        class="wt-search-bar__input"
        :value="value"
        :placeholder="placeholder"
        type="search"
        v-on="listeners"
      >
      <wt-icon
        class="wt-search-bar__search-icon"
        icon="search"
      ></wt-icon>
      <wt-icon-btn
        class="wt-search-bar__reset-icon-btn"
        :class="{ 'hidden': !value }"
        icon="close--filled"
        size="sm"
        @click="$emit('input', '')"
      ></wt-icon-btn>
    </div>
  </div>
</template>

<script>
  import debounce from '../../../scripts/debounce';

  export default {
    name: 'wt-search-bar',
    props: {
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
        default: 'Search',
      },
      debounce: {
        type: Boolean,
        default: false,
      },
      debounceDelay: {
        type: Number,
        default: 1000,
      },
      outline: {
        type: Boolean,
        default: false,
      },
    },

    watch: {
      value() {
        this.search.call(this);
      },
    },

    created() {
      if (this.debounce) {
        this.search = debounce(this.search, this.debounceDelay);
      }
    },

    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: (event) => this.$emit('input', event.target.value),
          keyup: this.handleKeyup,
        };
      },
    },

    methods: {
      search() {
        this.$emit('search', this.value);
      },
      handleKeyup(event) {
        if (event.key === 'Enter') {
          this.$emit('enter');
          event.preventDefault();
        } else if (event.key === 'Esc') {
          this.$emit('input', '');
          event.preventDefault();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-search-bar {
    cursor: text;
  }

  .wt-search-bar__wrapper {
    position: relative;
  }

  .wt-search-bar__search-icon {
    position: absolute;
    top: 50%;
    left: var(--input-icon-margin);
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wt-search-bar__reset-icon-btn {
    position: absolute;
    top: 50%;
    right: var(--input-icon-margin);
    transform: translateY(-50%);

    .wt-search-bar:not(:focus-within) & {
      opacity: 0;
      pointer-events: none;
    }
  }

  .wt-search-bar__input {
    @extend %typo-body-lg;

    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: var(--search-bar-padding);
    color: var(--form-input-color);
    border: var(--input-border);
    border-color: var(--form-border-color);
    border-radius: var(--border-radius);
    transition: var(--transition);

    &::placeholder {
      color: var(--form-placeholder-color)
    }

    .wt-search-bar:hover &,
    &:focus {
      border-color: var(--form-border--hover-color);

      &::placeholder {
        color: var(--form-placeholder--hover-color)
      }
    }

    .wt-search-bar--outline & {
      border-color: var(--form-outline-border-color);

      &::placeholder {
        color: var(--form-outline-placeholder-color)
      }
    }

    .wt-search-bar--outline:hover &,
    .wt-search-bar--outline &:focus {
      border-color: var(--form-outline-border--hover-color);

      &::placeholder {
        color: var(--form-outline-placeholder--hover-color)
      }
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
</style>

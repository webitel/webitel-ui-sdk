<template>
  <div
    class="wt-select"
    :class="{
      'wt-select--disabled': disabled,
      'wt-select--invalid': invalid,
    }"
  >
    <wt-label
      class="wt-select__label"
      v-if="hasLabel"
      :disabled="disabled"
      :invalid="invalid"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </wt-label>
    <vue-multiselect
      class="wt-select__select"
      :value="value"
      :options="selectOptions"
      :placeholder="placeholder || label"
      :multiple="multiple"
      :close-on-select="closeOnSelect"
      :limit="1"
      :label="optionLabel"
      :track-by="trackBy"
      :limitText="limitText"
      :loading="false"
      :internal-search="internalSearch"
      :disabled="disabled"
      :allow-empty="allowEmpty"
      :searchable="searchable"
      @input="input"
      @search-change="fetch"
      @close="close"
    >
      <template slot="caret">
        <wt-icon class="wt-select__arrow-caret" icon="arrow-down"></wt-icon>
      </template>

      <template slot="tag" slot-scope="{ option }">
        <span class="multiselect__custom-tag">{{ option[optionLabel] }}</span>
      </template>

      <template slot="clear" slot-scope="{}">
        <wt-icon-btn
          class="wt-select__clear"
          :class="{ 'hidden': !isValue }"
          icon="remove-rounded"
          size="sm"
          @click.native="clearValue"
        ></wt-icon-btn>
      </template>
    </vue-multiselect>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >{{ validationText }}
    </wt-input-info>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect';
import debounce from '../../../scripts/debounce';
import validationMixin from '../../../mixins/validationMixin/validationMixin';

export default {
  name: 'wt-select',
  components: {
    VueMultiselect,
  },
  mixins: [validationMixin],
  props: {
    value: {},

    options: {
      type: Array,
      default: () => [],
    },

    label: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },

    trackBy: {
      type: String,
      default: 'id',
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    closeOnSelect: {
      type: Boolean,
      default: true,
    },

    optionLabel: {
      type: String,
      default: 'name',
    },

    internalSearch: {
      type: Boolean,
      default: true,
    },

    search: {
      type: Function,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    searchable: {
      type: Boolean,
      default: true,
    },

    allowEmpty: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    isLoading: false,
    fetchedOptions: [],
  }),

  created() {
    this.fetch();
    this.fetch = debounce(this.fetch);
  },

  computed: {
    hasLabel() {
      return !!(this.label || this.$slots.label);
    },

    selectOptions() {
      if (!this.internalSearch) {
        return this.fetchedOptions;
      }
      return this.options;
    },

    isValue() {
      if (Array.isArray(this.value)) return !!this.value.length;
      if (typeof this.value === 'object') return !!Object.keys(this.value).length;
      return !!this.value;
    },
  },

  methods: {
    limitText: (count) => `${count}`,

    async fetch(search) {
      if (!this.internalSearch) {
        this.fetchedOptions = await this.search(search);
      }
    },

    clearValue() {
      let value = '';
      if (Array.isArray(this.value)) value = [];
      else if (typeof this.value === 'object') value = {};
      this.input(value);
      this.$emit('reset', value);
    },

    input(value) {
      this.$emit('input', value);
    },

    close() {
      this.$emit('closed');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~vue-multiselect/dist/vue-multiselect.min.css';
@import '../../../css/components/atoms/wt-badge/wt-badge';

.wt-select {
  width: 100%;
}

.wt-label {
  margin-bottom: var(--label-margin);
  cursor: text;

  .wt-select:hover &,
  .wt-select:focus-within & {
    color: var(--form-label--hover-color);
  }
}

.multiselect {
  cursor: pointer;

  .wt-select__arrow-caret {
    position: absolute;
    top: var(--select-caret-top-pos);
    right: var(--select-caret-right-pos);
    transform: rotate(0);
    transition: var(--transition);
    z-index: var(--select-caret-z-index);
  }

  ::v-deep .wt-select__clear {
    position: absolute;
    top: var(--select-clear-top-pos);
    right: var(--select-clear-right-pos);
    transform: rotate(0);
    transition: var(--transition);
    z-index: var(--select-clear-z-index);
  }

  ::v-deep {
    .multiselect__tags {
      display: flex;
      align-items: center;
      min-height: var(--select-tags-min-height); // reset original 20px style
      box-sizing: border-box;
      padding: var(--select-tags-padding);
      color: var(--form-input-color);
      border: var(--select-tags-border);
      border-color: var(--form-border-color);
      border-radius: var(--border-radius);

      .multiselect__input,
      .multiselect__single {
        @extend %typo-body-lg;
        min-height: var(--select-input-min-height); // reset original 20px style
        padding: 0;
        margin: 0;
        background: transparent;
      }

      .multiselect__strong {
        @extend %typo-body-lg;
        @extend .wt-badge;
        position: absolute;
        right: var(--select-badge-right-pos);
        min-height: var(--select-input-min-height); // reset original 20px style
        margin: 0;
        font-weight: normal;
        z-index: var(--select-badge-z-index);

        &:before {
          content: '+';
        }
      }

      .multiselect__tags-wrap {
        width: 100%;
      }

      .multiselect__custom-tag {
        @extend %typo-body-lg;
        color: var(--form-input-color);

        // text overflow 3 dots
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .multiselect__placeholder {
        padding: 0;
        margin: 0;
        color: var(--form-placeholder-color);

        // text overflow 3 dots
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .multiselect__content-wrapper {
      @extend %wt-distant-scrollbar;
      border: var(--select-tags-border);
      border-color: var(--form-border-color);
      border-radius: var(--border-radius);
      transition: var(--transition);

      .multiselect__option {
        padding: var(--select-options-padding);

        & > span {
          @extend %typo-body-lg;
          color: var(--form-placeholder-color);
        }

        &:after {
          display: none;
        }

        &--highlight {
          background: var(--select-option--hover-color);

          & > span {
            color: var(--form-input-color);
          }
        }

        &--selected {
          font-weight: normal;
          background: var(--select-option--active-color)
        }
      }
    }
  }

  .wt-select:hover & {
    .wt-select__arrow-caret ::v-deep .wt-icon__icon {
      fill: var(--icon--hover-color);
    }

    ::v-deep .wt-select__clear .wt-icon__icon {
      fill: var(--icon--hover-color);
    }

    ::v-deep {
      .multiselect__tags {
        border-color: var(--form-border--hover-color);
      }

      .multiselect__placeholder {
        color: var(--form-placeholder--hover-color);
      }
    }
  }

  &--active {
    .wt-select__arrow-caret {
      transform: rotate(180deg);
    }

    .wt-select__arrow-caret ::v-deep .wt-icon__icon {
      fill: var(--icon--hover-color);
    }

    ::v-deep {
      .multiselect__tags {
        border-color: var(--form-border--active-color);

        .multiselect__tags-wrap,
        .multiselect__strong {
          display: none;
        }

        .multiselect__placeholder {
          color: var(--form-placeholder--active-color);
        }
      }
    }
  }
}

.wt-select--invalid,
.wt-select--invalid:hover {
  .wt-label {
    color: var(--false-color);
  }

  .multiselect {
    ::v-deep {
      .multiselect__tags {
        border-color: var(--false-color);
        outline: none; // prevent outline overlapping false color
      }
    }
  }
}

.wt-select--disabled {
  pointer-events: none;

  .multiselect--disabled {
    background: none;
    opacity: 1;
  }

  .wt-select__arrow-caret ::v-deep .wt-icon__icon,
  .wt-select__clear ::v-deep .wt-icon__icon {
    fill: var(--icon--disabled-color);
  }

  .multiselect {
    ::v-deep {
      .multiselect__tags {
        background: var(--form-border--disabled-color);
        border-color: var(--form-border--disabled-color);

        .multiselect__placeholder {
          color: var(--form-placeholder--disabled-color);
        }
      }
    }
  }
}
</style>

<template>
  <div
    class="wt-select"
    :class="{
      'wt-select--disabled': disabled,
      'wt-select--invalid': invalid,
      'wt-select--clearable': clearable,
      'wt-select--loading': isLoading,
    }"
  >
    <wt-label
      class="wt-select__label"
      v-if="hasLabel"
      :disabled="disabled"
      :invalid="invalid"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>
    <vue-multiselect
      ref="vue-multiselect"
      class="wt-select__select"
      v-bind="$attrs"
      :value="selectValue"
      :options="selectOptions"
      :placeholder="placeholder || label"
      :limit="1"
      :label="optionLabel"
      :track-by="trackBy"
      :limit-text="(count) => `+${count}`"
      :loading="false"
      :internal-search="!searchMethod"
      :disabled="disabled"
      :allow-empty="allowEmpty"
      v-on="listeners"
    >

      <!--      Slot that is used for all selected options (tags)-->
      <template slot="tag" slot-scope="{ option }">
        <span class="multiselect__custom-tag">
          {{ option[optionLabel] || option }}
        </span>
      </template>

      <!--      Slot for custom label template for single select-->
      <template slot="singleLabel" slot-scope="{ option }">
        <slot name="singleLabel" v-bind="{ option, optionLabel }">
          <span class="multiselect__single-label">
            {{ option[optionLabel] || option }}
          </span>
        </slot>
      </template>

      <!--      Slot for custom option template -->
      <template slot="option" slot-scope="{ option }">
        <slot name="option" v-bind="{ option, optionLabel }">
          <span>
            {{ option[optionLabel] || option }}
          </span>
        </slot>
      </template>

      <!--      Element for opening and closing the dropdown -->
      <template slot="caret" slot-scope="{ toggle }">
        <!-- @mousedown.native.prevent.stop="toggle": https://github.com/shentao/vue-multiselect/issues/1204#issuecomment-615114727 -->
        <wt-icon-btn
          class="wt-select__arrow-caret"
          icon="arrow-down"
          :disabled="disabled"
          @mousedown.native.prevent.stop="toggle"
        ></wt-icon-btn>
      </template>

      <!--      Slot located before the tags -->
      <template slot="clear" slot-scope="{}">
        <wt-icon-btn
          v-if="clearable"
          class="wt-select__clear"
          :class="{ 'hidden': !isValue }"
          :disabled="disabled"
          icon="close--filled"
          size="sm"
          @click="clearValue"
        ></wt-icon-btn>
      </template>

      <template slot="beforeList">
        <div class="wt-select__loading-wrapper" v-show="isLoading">
          <wt-loader size="sm"></wt-loader>
        </div>
      </template>

      <template slot="afterList" v-if="showIntersectionObserver">
        <div v-observe-visibility="handleAfterListIntersect"></div>
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
import { ObserveVisibility } from 'vue-observe-visibility';
import isEmpty from '../../../scripts/isEmpty';
import debounce from '../../../scripts/debounce';
import validationMixin from '../../../mixins/validationMixin/validationMixin';

export default {
  name: 'wt-select',
  mixins: [validationMixin],
  directives: { ObserveVisibility },
  components: {
    VueMultiselect,
  },
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

    optionLabel: {
      type: String,
      default: 'name',
    },

    searchMethod: {
      type: Function,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    clearable: {
      type: Boolean,
      default: true,
    },

    required: {
      type: Boolean,
      default: false,
    },

    allowEmpty: {
      type: Boolean,
      default: false,
    },

    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },
  },

  data: () => ({
    apiOptions: [],
    isLoading: false,

    searchParams: {
      search: '',
      page: 1,
    },
    searchHasNext: true,
  }),
  computed: {
    isApiMode() {
      return !!this.searchMethod;
    },
    showIntersectionObserver() {
      return this.isApiMode && !this.isLoading && this.apiOptions.length;
    },
    selectValue() {
      // vue-multiselect doesn't show placeholder if value is empty object
      return this.isValue ? this.value : '';
    },

    hasLabel() {
      return !!(this.label || this.$slots.label);
    },

    requiredLabel() {
      return this.required ? `${this.label}*` : this.label;
    },

    selectOptions() {
      return this.isApiMode ? this.apiOptions : this.options;
    },

    isValue() {
      return !isEmpty(this.value);
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.input,
        close: this.close,
        'search-change': (search) => {
          this.$emit('search-change', search);
          this.handleSearchChange(search);
        },
      };
    },
  },

  methods: {
    handleSearchChange(search) {
      this.isLoading = true;
      this.searchParams.page = 1;
      this.searchParams.search = search;
      this.fetchOptions();
    },

    handleAfterListIntersect(isVisible) {
      if (isVisible && this.searchHasNext) {
        this.isLoading = true;
        this.searchParams.page += 1;
        this.fetchOptions();
      }
    },

    async fetchOptions({ search, page } = this.searchParams) {
      if (!this.isApiMode) return;
      const { items, next } = await this.searchMethod({ search, page });
      this.apiOptions = this.searchParams.page === 1 ? items : this.apiOptions.concat(items);
      this.searchHasNext = next;
      this.isLoading = false;
    },

    clearValue() {
      let value = '';
      if (Array.isArray(this.value)) value = [];
      else if (typeof this.value === 'object' && this.value !== null) value = {};
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

  created() {
    this.fetchOptions();
    this.fetchOptions = debounce(this.fetchOptions, 500);
  },
};
</script>

<style lang="scss" scoped>
@import '~vue-multiselect/dist/vue-multiselect.min.css';
@import '../../../css/components/atoms/wt-badge/wt-badge';

.wt-select {
  width: 100%;
  min-width: 0;
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

        /* these before-after elements are fixing issue when badge is visually overflown by
        selected option name (yep, badge has z-index, but its background has 0.3 opacity)*/
        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -2; // below badge itself
          background: var(--main-color);
        }

        &:after {
          @extend .wt-badge;
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1; // below badge itself

        }
      }

      .multiselect__tags-wrap {
        width: 100%;
      }

      .multiselect__custom-tag, .multiselect__single-label {
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
        @extend %typo-body-lg;
        padding: var(--select-options-padding);

        & > span {
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

    .wt-select__loading-wrapper {
      position: sticky;
      width: 100%;
      height: 300px; // max dropdown panel height
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
      z-index: 1;
    }
  }

  .wt-select:hover & {
    .wt-select__arrow-caret ::v-deep .wt-icon__icon {
      fill: var(--icon-color--hover);
    }

    ::v-deep .wt-select__clear .wt-icon__icon {
      fill: var(--icon-color--hover);
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
      fill: var(--icon-color--hover);
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

.wt-select--loading ::v-deep .multiselect__content-wrapper {
  overflow-y: hidden;
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
    fill: var(--icon-color-disabled);
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

.wt-select--clearable {
  .multiselect::v-deep {
    .multiselect__tags {
      padding: var(--select-tags-padding--clearable);
    }

    .multiselect__strong {
      right: var(--select-badge-right-pos--clearable);
    }
  }
}
</style>

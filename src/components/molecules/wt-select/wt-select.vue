<template>
  <div
    class="wt-select"
    :class="{'wt-select--disabled': disabled}"
  >
    <wt-label class="wt-select__label">{{label}}</wt-label>
    <!--    <div class="hs-multiselect-wrap">-->
    <vue-multiselect
      class="wt-select__select"
      :value="value"
      :options="options"
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
      @open="isOpened = true"
      @close="close"
    >
      <template slot="caret">
        <wt-icon class="wt-select__arrow-caret" icon="arrow-down"></wt-icon>
      </template>

      <template slot="tag" slot-scope="{ option }">
        <span class="multiselect__custom-tag">{{option[optionLabel]}}</span>
      </template>
      <!--      <template slot="option" slot-scope="{ option }">-->
      <!--        <div class="multiselect__option__content">-->
      <!--          <span>{{option.name || option }}</span>-->
      <!--          <icon class="multiselect__option__tick">-->
      <!--            <svg class="icon icon-tick-sm sm">-->
      <!--              <use xlink:href="#icon-tick-sm"></use>-->
      <!--            </svg>-->
      <!--          </icon>-->
      <!--        </div>-->
      <!--      </template>-->
    </vue-multiselect>
    <!--    <validation-message-->
    <!--      class="cc-err-message"-->
    <!--      v-if="!hideDetails"-->
    <!--      :v="v"-->
    <!--    />-->
  </div>
</template>

<script>
  import VueMultiselect from 'vue-multiselect';
  // import ValidationMessage from '../../bucket/validation-message.vue';
  import debounce from '../../../scripts/debounce';

  export default {
    name: 'wt-select',
    components: {
      VueMultiselect,
      // ValidationMessage,
    },
    props: {
      value: {},

      options: {
        type: Array,
        default: () => [],
      },

      label: {
        type: String,
      },

      placeholder: {
        type: String,
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

      apiMode: {
        type: Boolean,
        default: false,
      },

      fetchMethod: {
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

      hideDetails: {
        type: Boolean,
        default: false,
      },

      v: {
        type: Object,
      },
    },

    data: () => ({
      isLoading: false,
      isOpened: false,
      fetchedOptions: [],
    }),

    created() {
      this.fetch();
      this.fetch = debounce(this.fetch);
    },

    computed: {
      opts() {
        if (this.apiMode) {
          return this.fetchedOptions;
        }
        return this.options;
      },

      validation: {
        get() {
          return this.value;
        },
        set(value) {
          if (this.v) this.v.$touch();
          this.$emit('input', value);
        },
      },
    },

    methods: {
      limitText: (count) => `${count}`,

      async fetch(search) {
        if (this.apiMode) {
          const response = await this.fetchMethod(search);
          this.fetchedOptions = response.items;
        }
      },

      input(value) {
        if (value) {
          this.$emit('input', value);
        }
      },

      close() {
        this.$emit('closed');
        this.isOpened = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~vue-multiselect/dist/vue-multiselect.min.css';
  @import '../../../css/components/atoms/wt-badge/wt-badge';

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

        .multiselect__custom-tag {
          @extend %typo-body-lg;
          color: var(--form-input-color);
        }

        .multiselect__placeholder {
          color: var(--form-placeholder-color);
          padding: 0;
          margin: 0;
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

  .wt-select--disabled {
    pointer-events: none;

    .multiselect--disabled {
       background: none;
       opacity: 1;
    }

    .wt-select__arrow-caret ::v-deep .wt-icon__icon {
      fill: var(--icon--disabled-color);
    }

    .wt-label {
      color: var(--form-label--disabled-color);
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

  /*
  @import '../../../css/utils/variables';

  $label-color: #000;
  $list-option__hover: transparent;

  .hs-multiselect .cc-label {
    margin-bottom: (10px);
  }

  .hs-multiselect-wrap {
    position: relative;
    width: 100%;
    height: (40px);
  }

  .hs-multiselect__arrow-down {
    position: absolute;
    top: 50%;
    right: (3px);
    transform: translateY(-50%);
    pointer-events: none;

    .icon {
      fill: #000;
      stroke: #000
    }
  }

  .multiselect {
    position: absolute;
    width: 100%;

    border: 1px solid $input-border-color;
    border-radius: $border-radius;
    background: #fff;

    cursor: pointer;
    transition: $transition;
    box-sizing: border-box;

    &.opened {
      z-index: 1;
    }

    &:hover, &.opened {
      border-color: #000;
    }

    // visible area
    &__tags {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: (38px); // 40px - 2px outer borders
      padding: $select-paddings;
      box-sizing: border-box;

      .multiselect__strong {
        // @extend .count-badge;
        font-weight: normal;
      }

      .multiselect__placeholder {
        @extend .typo-input;
        color: $label-color;
      }

      .multiselect__input {
        @extend .typo-input;
        outline: none;
        border: none;
      }

      .multiselect__single {
        @extend .typo-input;
        display: inline-block;
      }

      .multiselect__tag {
        @extend .typo-input;
      }
    }

    // options
    &__content-wrapper {
      @extend .cc-scrollbar;
      overflow: auto;
    }

    &__content {
      width: 100%;
    }

    // empty/not found texts
    li:not(.multiselect__element) {
      @extend .typo-input;
      padding: $select-paddings;
    }

    &__element {
      @extend .typo-input;
      width: 100%;
      transition: $transition;
      cursor: pointer;

      .multiselect__option {
        display: block;
        border-radius: $border-radius;

        &:hover {
          background: $list-option__hover;
        }

        &__content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: $select-paddings;
          padding-right: (8px);
          box-sizing: border-box;
        }

        .multiselect__option__tick .icon {
          fill: transparent;
          stroke: transparent;
        }

        &:hover .multiselect__option__tick .icon {
          fill: #000;
          stroke: #000;
        }

        &.multiselect__option--selected
        .multiselect__option__tick .icon {
          fill: $true-color;
          stroke: $true-color;
        }
      }
    }

    &:not(.multiselect--active) {
      .multiselect__input {
        display: none;
      }
    }

    &--active {
      .multiselect__tags-wrap,
      .multiselect__strong {
        display: none !important;
      }
    }
  }

  .hs-multiselect.disabled {
    .hs-multiselect__arrow-down {
      display: none;
    }

    .multiselect {
      border: none;
      outline: none;
      cursor: text;
    }
  }

  .text-center {
    .multiselect__single {
      margin: auto;
    }
  }
  */
</style>

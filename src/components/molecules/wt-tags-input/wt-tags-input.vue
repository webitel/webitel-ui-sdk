<template>
  <div
    class="wt-tags-input"
    :class="{
      'wt-tags-input--disabled': disabled,
      'wt-tags-input--invalid': invalid,
    }"
  >
    <wt-label
      class="wt-tags-input__label"
      v-if="hasLabel"
      :disabled="disabled"
      :invalid="invalid"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>

    <vue-tags-input
      class="wt-tags-input__tags-input"
      v-model="input"
      :tags="tags"
      :autocomplete-items="autocompleteOptions"
      :autocomplete-min-length="autocompleteMinLength"
      :placeholder="placeholder || label"
      :add-only-from-autocomplete="addOnlyFromAutocomplete"
      :autocomplete-filter-duplicates="autocompleteFilterDuplicates"
      v-on="listeners"
    >
      <template slot="tag-actions" slot-scope="{ index, performDelete }">
        <wt-icon-btn
          icon="remove-rounded"
          size="sm"
          color="active"
          @click="performDelete(index)"
        ></wt-icon-btn>
      </template>
    </vue-tags-input>

    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >{{ validationText }}
    </wt-input-info>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import validationMixin from '../../../mixins/validationMixin/validationMixin';

export default {
  name: 'wt-tags-input',
  mixins: [validationMixin],
  components: { VueTagsInput },
  props: {
    value: {
      type: Array,
    },

    autocompleteItems: {
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

    disabled: {
      type: Boolean,
      default: false,
    },

    autocompleteMinLength: {
      type: Number,
      default: 0,
    },

    addOnlyFromAutocomplete: {
      type: Boolean,
      default: true,
    },

    autocompleteFilterDuplicates: {
      type: Boolean,
      default: true,
    },

    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },
  },

  data: () => ({
    input: '',
  }),

  computed: {
    hasLabel() {
      return !!(this.label || this.$slots.label);
    },

    requiredLabel() {
      return this.required ? `${this.label}*` : this.label;
    },

    tags() {
      if (!this.value) return [];
      return this.value.map((item) => ({ text: item.name || item.value, ...item }));
    },

    autocompleteOptions() {
      return this.autocompleteItems
        .map((item) => ({
          text: item.name || item.value,
          ...item,
        }))
        .filter((item) => item.text?.includes(this.input));
    },

    listeners() {
      return {
        ...this.$listeners,
        input: this.searchTags,
        'tags-changed': this.changeTags,
      };
    },
  },

  methods: {
    searchTags() {
    },

    changeTags(tags) {
      this.$emit('input', tags);
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-tags-input {
  width: 100%;
}

.wt-label {
  margin-bottom: var(--label-margin);
  cursor: text;

  .wt-tags-input:hover &,
  .wt-tags-input:focus-within & {
    color: var(--form-label--hover-color);
  }
}

// increase specificity
.wt-tags-input .wt-tags-input__tags-input {
  width: 100%;
  max-width: 100%; // reset default

  ::v-deep {
    .ti-input {
      box-sizing: border-box;
      min-height: var(--tags-input-min-height); // preserve height, if tags is empty
      padding: 0; // reset default
      border: var(--tags-input-border);
      border-color: var(--tags-input-border-color);
      border-radius: var(--border-radius);
      transition: var(--transition);

      .ti-tags {
        display: flex;
        align-items: center;
        padding: var(--tags-input-padding);
        margin: 0; // reset default
        word-break: break-word; //break long word
      }

      .ti-new-tag-input-wrapper {
        padding: 0; // reset default
        margin: 0; // reset default
      }

      .ti-new-tag-input {
        @extend %typo-body-lg;
        border-radius: var(--border-radius);

        &::placeholder {
          @extend %typo-body-lg;
          color: var(--form-placeholder-color);
        }
      }

      .ti-tag {
        @extend %typo-body-lg;
        height: fit-content;
        padding: var(--tags-input-padding);
        margin: 0 var(--tags-input-tag-spacing-margin) var(--tags-input-tag-spacing-margin) 0;  // reset default
        color: var(--tags-input-tag-text-color);
        background: var(--tags-input-tag-bg-color);
        border-radius: var(--tags-input-tag-border-radius);
        transition: var(--transition);

        .ti-actions {
          margin-left: var(--tags-input-tag-actions-margin-left);
        }
        // pre-delete state after 1 backspace press
        &.ti-deletion-mark {   // FIXME
          color: var(--tags-input-tag-text-color--deletion);
          background: var(--tags-input-tag-bg-color--deletion);

          .wt-icon__icon {
            fill: var(--tags-input-tag-text-color--deletion);
          }
        }
      }
    }

    .ti-autocomplete {
      @extend %wt-distant-scrollbar;
      max-height: var(--tags-input-autocomplete-max-height);
      border: var(--tags-input-autocomplete-border);
      border-color: var(--tags-input-autocomplete-border-color);
      border-radius: var(--border-radius);
      transition: var(--transition);
      overflow: auto;

      .ti-item {
        background: transparent; // reset default

        & > div {
          @extend %typo-body-lg;
          padding: var(--tags-input-autocomplete-option-padding);
          color: var(--tags-input-autocomplete-option--text-color);
          transition: var(--transition);

          &:hover {
            color: var(--tags-input-option-text-color--hover);
            background: var(--tags-input-option-bg-color--hover);
          }
        }
      }
    }
  }
}

.wt-tags-input--invalid,
.wt-tags-input--invalid:hover,
.wt-tags-input--invalid:focus-within, {
  .wt-label {
    color: var(--false-color);
  }

  .wt-tags-input__tags-input {
    ::v-deep {
      .ti-input {
        border-color: var(--false-color);
      }
    }
  }
}

.wt-tags-input--disabled {
  pointer-events: none;

  .wt-tags-input__tags-input {
    width: 100%;
    max-width: 100%; // reset default

    ::v-deep {
      .ti-input {
        border-color: transparent;

        .ti-new-tag-input-wrapper {
          display: none;
        }

        .ti-tag {
          .ti-actions {
            display: none;
          }
        }
      }
    }
  }
}
</style>

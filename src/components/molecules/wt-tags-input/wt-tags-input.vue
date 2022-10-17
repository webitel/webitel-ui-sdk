<template>
  <div
    :class="{
      'wt-tags-input--disabled': disabled,
      'wt-tags-input--invalid': invalid,
      'wt-tags-input--loading': isLoading,
    }"
    class="wt-tags-input"
  >
    <wt-label
      v-if="hasLabel"
      :disabled="disabled"
      :invalid="invalid"
      class="wt-tags-input__label"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>

    <vue-multiselect
      ref="vue-multiselect"
      :close-on-select="false"
      :disabled="disabled"
      :internal-search="!searchMethod"
      :label="trackBy ? optionLabel : null"
      :loading="false"
      :options="selectOptions"
      :placeholder="placeholder || label"
      :taggable="taggable"
      :track-by="trackBy"
      :value="selectValue"
      class="wt-tags-input__select"
      multiple
      v-bind="$attrs"
      v-on="listeners"
    >

      <!--      Slot that is used for all selected options (tags)-->
      <template v-slot:tag="{ option, remove }">
        <wt-chip class="multiselect__custom-tag">
          {{ getTagOptionLabel({ option, optionLabel }) }}
          <wt-icon-btn
            icon="close--filled"
            size="sm"
            @click="remove(option)"
          ></wt-icon-btn>
        </wt-chip>
      </template>

      <!--      Slot for custom option template -->
      <template v-slot:option="{ option }">
        <slot name="option" v-bind="{ option, optionLabel }">
          {{ getTagOptionLabel({ option, optionLabel }) }}
        </slot>
      </template>

      <!--      Element for opening and closing the dropdown -->
      <template v-slot:caret="{ toggle }">
        <!-- @mousedown.native.prevent.stop="toggle": https://github.com/shentao/vue-multiselect/issues/1204#issuecomment-615114727 -->
        <wt-icon-btn
          :disabled="disabled"
          class="multiselect__select"
          color="active"
          icon="arrow-down"
          @mousedown.native.prevent.stop="toggle"
        ></wt-icon-btn>
      </template>

      <template v-slot:beforeList>
        <div v-show="isLoading" class="multiselect__loading-wrapper">
          <wt-loader size="sm"></wt-loader>
        </div>
      </template>

      <template v-if="showIntersectionObserver" v-slot:afterList>
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
import multiselectMixin from '../wt-select/mixins/multiselectMixin';

export default {
  name: 'wt-tags-input',
  mixins: [multiselectMixin],
  props: {
    value: {
      type: Array,
    },
    trackBy: {
      type: String,
      default: null,
    },
    taggable: {
      type: Boolean,
      default: false,
    },
    manualTagging: {
      type: Boolean,
      default: false,
      description: `
      False: "tag" method automatically pushes { optionLabel | "name", trackBy } object to value
      array and $emits "input" event.

      True: "tag" method only $emits "tag" event. Tag addition is responsibility of client side.
    `,
    },
  },
  data: () => ({
    defaultOptionLabel: 'label',
  }),
  methods: {
    tag(searchQuery, id) {
      this.$emit('tag', searchQuery, id);

      const tag = this.trackBy ? {
        [this.optionLabel || 'name']: searchQuery,
        [this.trackBy]: id || searchQuery,
      } : searchQuery;

      const isTagExist = (newTag) => {
        if (typeof newTag === 'string') {
          return this.options.some((elem) => elem === newTag);
        }
        return this.options.some((elem) => elem[this.trackBy] === newTag[this.trackBy]);
      }

      if (isTagExist(tag)) return;

      this.options.unshift(tag);
      if (!this.manualTagging) {
        const value = [...this.value, tag];
        this.input(value);
      }
    },
    getTagOptionLabel({ optionLabel, option }) {
      /*
      Multiselect creates new tags with "label" property by default, so we need to handle
      it as well
       */
      const label = this.getOptionLabel({ optionLabel, option });
      return typeof label === 'object' ? option.label : label;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../css/components/molecules/wt-select/multiselect';

.wt-tags-input {
  width: 100%;
}

.wt-tags-input:hover,
.wt-tags-input:focus-within {
  .wt-label {
    color: var(--form-label--hover-color);
  }
}

.wt-tags-input--invalid,
.wt-tags-input--invalid:hover,
.wt-tags-input--invalid:focus-within, {
  .wt-label {
    color: var(--false-color);
  }
}

.wt-tags-input--disabled {
  .wt-tags-input__tags-input {
    width: 100%;
    max-width: 100%; // reset default
  }
}

.wt-tags-input .multiselect ::v-deep {
  .multiselect__tags {
    padding-bottom: 0;
    padding-right: calc(
      var(--input-padding)
      + var(--icon-md-size)
      + var(--select-caret-right-pos)
    );

    .multiselect__tags-wrap {
      display: flex;
      flex-wrap: wrap;
    }

    .multiselect__custom-tag {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      max-width: 100%;
      margin: 0 var(--spacing-xs) calc(var(--spacing-xs) - 1px) 0; // border bottom
      word-break: break-all;
      gap: var(--spacing-xs);
    }
  }

  .multiselect__input {
    margin-bottom: calc(var(--spacing-xs) - 1px); // border
  }
}
</style>

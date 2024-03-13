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
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ requiredLabel }}
      </slot>
    </wt-label>

    <vue-multiselect
      ref="vue-multiselect"
      :close-on-select="false"
      :disabled="disabled"
      :internal-search="!searchMethod"
      :label="selectOptionLabel"
      :loading="false"
      :model-value="selectValue"
      :multiple="multiple"
      :options="selectOptions"
      :placeholder="placeholder || label"
      :taggable="taggable"
      :track-by="trackBy"
      class="wt-tags-input__select"
      v-bind="$attrs"
      v-on="listeners"
    >
      <!--      Slot that is used for all selected options (tags)-->
      <template #tag="{ option, remove }">
        <wt-chip class="multiselect__custom-tag">
          {{ getTagOptionLabel({ option, optionLabel }) }}
          <wt-icon-btn
            color="on-primary"
            icon="close--filled"
            size="sm"
            @click="remove(option)"
          />
        </wt-chip>
      </template>

      <!--      Slot for custom option template -->
      <template #option="{ option }">
        <slot
          name="option"
          v-bind="{ option, optionLabel }"
        >
          {{ getTagOptionLabel({ option, optionLabel }) }}
        </slot>
      </template>

      <!--      Element for opening and closing the dropdown -->
      <template #caret="{ toggle }">
        <!-- @mousedown.native.prevent.stop="toggle": https://github.com/shentao/vue-multiselect/issues/1204#issuecomment-615114727 -->
        <wt-icon-btn
          :disabled="disabled"
          class="multiselect__select"
          color="active"
          icon="arrow-down"
          @mousedown.prevent.stop="toggle"
        />
      </template>

      <template #beforeList>
        <div
          v-show="isLoading"
          class="multiselect__loading-wrapper"
        >
          <wt-loader size="sm" />
        </div>
      </template>

      <template
        v-if="showIntersectionObserver"
        #afterList
      >
        <div v-observe-visibility="handleAfterListIntersect" />
      </template>
    </vue-multiselect>

    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >
      {{ validationText }}
    </wt-input-info>
  </div>
</template>

<script>
import multiselectMixin from '../wt-select/mixins/multiselectMixin';
import taggableMixin from './mixin/taggableMixin';

export default {
  name: 'WtTagsInput',
  mixins: [
    multiselectMixin,
    // taggableMixin is used to add custom select values, see [https://my.webitel.com/browse/WTEL-3181
    taggableMixin,
  ],
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
  emits: ['input', 'tag', 'search-change', 'closed'],
  data: () => ({
    defaultOptionLabel: 'label',
    multiple: true,
  }),
  methods: {
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
@import '../wt-select/multiselect.scss';

.wt-tags-input {
  width: 100%;
}

.wt-tags-input--disabled {
  .wt-tags-input__tags-input {
    width: 100%;
    max-width: 100%; // reset default
  }
}

// paddings recalc
.wt-tags-input .multiselect :deep {
  .multiselect__tags {
    padding-right: calc(
      var(--input-padding)
      + var(--icon-md-size)
      + var(--select-caret-right-pos)
    );
    padding-bottom: 0;

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

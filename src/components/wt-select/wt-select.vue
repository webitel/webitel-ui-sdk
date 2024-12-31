<template>
  <div
    :class="{
      'wt-select--disabled': disabled,
      'wt-select--invalid': invalid,
      'wt-select--multiple': multiple,
      'wt-select--clearable': clearable,
      'wt-select--loading': isLoading,
    }"
    class="wt-select"
  >
    <wt-label
      v-if="hasLabel"
      :disabled="disabled"
      :invalid="invalid"
      class="wt-select__label"
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
      :allow-empty="allowEmpty"
      :disabled="disabled"
      :internal-search="!searchMethod"
      :label="selectOptionLabel"
      :limit="1"
      :loading="false"
      :model-value="selectValue"
      :multiple="multiple"
      :options="optionsWithCustomValues"
      :placeholder="placeholder || label"
      :taggable="taggable"
      :track-by="trackBy"
      class="wt-select__select"
      v-bind="$attrs"
      @close="isOpened = false"
      @open="isOpened = true"
      v-on="listeners"
    >
      <template
        v-if="!isOpened"
        #limit
      >
        <wt-chip class="multiselect__limit"> +{{ value.length - 1 }}</wt-chip>
      </template>

      <!--      Slot that is used for all selected options (tags)-->
      <template #tag="{ option }">
        <span class="multiselect__custom-tag">
          {{ getOptionLabel({ option, optionLabel }) }}
        </span>
      </template>

      <!--      Slot for custom label template for single select-->
      <template #singleLabel="{ option }">
        <slot
          name="singleLabel"
          v-bind="{ option, optionLabel }"
        >
          <span class="multiselect__single-label">
            {{ getOptionLabel({ option, optionLabel }) }}
          </span>
        </slot>
      </template>

      <!--      Slot for custom option template -->
      <template #option="{ option }">
        <slot
          name="option"
          v-bind="{ option, optionLabel }"
        >
          {{ getOptionLabel({ option, optionLabel }) }}
        </slot>
      </template>

      <!--      Element for opening and closing the dropdown -->
      <template #caret="{ toggle }">
        <!--    In mode allowCustomValues, adding is done by clicking on this icon  -->
        <!--    [https://my.webitel.com/browse/WTEL-3181]-->
        <wt-icon-btn
          v-if="allowCustomValues && searchParams.search"
          :disabled="disabled"
          class="multiselect__select multiselect__custom-value"
          icon="select-custom-value-enter"
          @click="handleCustomValueArrowInput(toggle)"
          @mousedown.prevent
        />
        <!--    To view a list of possible values, click on this icon  -->
        <!-- @mousedown.native.prevent.stop="toggle": https://github.com/shentao/vue-multiselect/issues/1204#issuecomment-615114727 -->
        <wt-icon-btn
          v-else
          :disabled="disabled"
          class="multiselect__select multiselect__arrow"
          icon="arrow-down"
          @click="toggle"
          @mousedown.prevent
        />
      </template>

      <!--      Slot located before the tags -->
      <template #clear="{}">
        <wt-icon-btn
          v-if="clearable"
          :class="{ hidden: !isValue }"
          :disabled="disabled"
          class="multiselect__clear"
          icon="close"
          @click="clearValue"
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
import isEmpty from '../../scripts/isEmpty.js';
import taggableMixin from '../wt-tags-input/mixin/taggableMixin.js';
import multiselectMixin from './mixins/multiselectMixin.js';

export default {
  name: 'WtSelect',
  mixins: [
    multiselectMixin,
    // taggableMixin is used to add custom select values, see [https://my.webitel.com/browse/WTEL-3181]
    taggableMixin,
  ],
  props: {
    // vue 3
    modelValue: {},

    // vue 2 fallback
    value: {
      default: (props) => {
        return props.modelValue;
      },
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    clearable: {
      type: Boolean,
      default: true,
    },
    /*
     for taggableMixin functionality
     for more info, see WTEL-3181
     */
    allowCustomValues: {
      type: Boolean,
      default: false,
      description: 'See wt-tags-input "taggable" prop.',
    },
    // for taggableMixin functionality
    handleCustomValuesAdditionManually: {
      type: Boolean,
      default: false,
      description: 'See wt-tags-input "manualTagging" prop.',
    },
  },
  emits: [
    'reset',
    'search-change',
    'input', // vue 2
    'update:modelValue', // vue 3
    'closed',
    'custom-value', // fires when allowCustomValues and new customValue is added
  ],
  data: () => ({
    isOpened: false,
  }),
  computed: {
    // for taggableMixin
    taggable() {
      return this.allowCustomValues;
    },
    // for taggableMixin
    manualTagging() {
      return this.handleCustomValuesAdditionManually;
    },
    optionsWithCustomValues() {
      // https://webitel.atlassian.net/browse/WTEL-3181
      if (!this.allowCustomValues) return this.selectOptions;

      /**
       custom values could be restored after refresh, so that they could be not included in options prop,
       so that we should add them to options manually (but filter duplicates, which are already in options)

       i assume it's bad decision and it's better to include custom values to options prop,
       but current filters logic restores value at filter component, but options value are pre-defined at store state
       */

      const customValuesToOptions = Array.isArray(this.value)
        ? this.value
        : isEmpty(this.value)
          ? []
          : [this.value]; //do not add empty values
      const optionsWithoutValues = this.selectOptions.filter((opt) => {
        const optKey = this.trackBy ? opt[this.trackBy] : opt;
        return !customValuesToOptions.some((customValue) => {
          const customValueKey = this.trackBy
            ? customValue[this.trackBy]
            : customValue;
          return customValueKey === optKey;
        });
      });
      return [...customValuesToOptions, ...optionsWithoutValues];
    },
  },
  methods: {
    // for taggableMixin functionality
    async handleCustomValue(value) {
      // https://webitel.atlassian.net/browse/WTEL-3181
      this.tag(value);
    },
    // for taggableMixin functionality
    async handleCustomValueArrowInput(toggle) {
      // https://webitel.atlassian.net/browse/WTEL-3181
      // OLD CODE, but can be useful in future
      /**
       * tag emits input event, but there is a drawback
       * there are causes, when input handler is async, but close event, emitted by toggle(),
       * is performing some operations with input value.
       * filter selects (abstract-enum(api)-filter.vue) for instance
       *
       * for now, i've tested this cause and it works well even without waiting for $nextTick()
       * however, this is a potential problem, so, i've left this comment here
       */
      this.tag(this.searchParams.search);
      // await this.$nextTick();

      /**
       * call toggle strictly after tag() method because tag() emits input,
       * because there could be code, which performs operation with input only after select close
       * so that, it's crucial to emit input before close
       */
      toggle();
    },
    // for taggableMixin functionality
    emitTagEvent(searchQuery, id) {
      this.$emit('custom-value', searchQuery, id);
    },
    clearValue() {
      let value = '';
      if (Array.isArray(this.value)) value = [];
      else if (typeof this.value === 'object' && this.value !== null)
        value = {};
      this.input(value);
      this.$emit('reset', value);
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
@import './multiselect.scss';

.wt-select {
  width: 100%;
  min-width: 0;
}

:deep(.multiselect) {
  .multiselect__custom-tag,
  .multiselect__single-label {
    // text overflow 3 dots
    display: block;
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

:deep(.multiselect--active) {
  .multiselect__tags-wrap,
  .multiselect__strong {
    display: none;
  }
}

// right padding setup

// default case
.wt-select {
  // all is fine
  :deep(.multiselect) {
    .multiselect__tags {
      padding: var(--input-padding)
        calc(
          var(--input-padding) + var(--icon-md-size) +
            var(--select-caret-right-pos)
        )
        var(--input-padding) var(--input-padding);
    }
  }
}

// only chip
.wt-select.wt-select--multiple:not(.wt-select--clearable) {
  :deep(.multiselect) {
    $multiselect-limit-right-pos: calc(
      var(--select-caret-right-pos) // caret offet from border
      + var(--icon-md-size) // caret size
      + var(--input-padding) // caret-to-chip offset
    );

    .multiselect__tags {
      padding-right: calc(
        $multiselect-limit-right-pos + 50px // chip
        + var(--input-padding) // chip-to-content offset
      );
    }

    .multiselect__limit {
      right: $multiselect-limit-right-pos;
    }
  }
}

// only clearable
.wt-select.wt-select--clearable:not(.wt-select--multiple) {
  :deep(.multiselect) {
    $multiselect-clear-right-pos: calc(
      var(--select-caret-right-pos) // caret offset from border
      + var(--icon-md-size) // caret size
      + var(--input-padding) // caret-to-chip offset
    );

    .multiselect__tags {
      padding-right: calc(
        $multiselect-clear-right-pos + var(--icon-md-size) // clear
        + var(--input-padding) // clear-to-content offset
      );
    }

    .multiselect__clear {
      right: $multiselect-clear-right-pos;
    }
  }
}

// clearable and chip
.wt-select.wt-select--multiple.wt-select--clearable {
  :deep(.multiselect) {
    $multiselect-clear-right-pos: calc(
      var(--select-caret-right-pos) // caret offet from border
      + var(--icon-md-size) // caret size
      + var(--input-padding) // caret-to-chip offset
    );

    $multiselect-limit-right-pos: calc(
      $multiselect-clear-right-pos + /* clear offet from border */
        var(--icon-md-size) /* clear size */ + var(--input-padding)
        /* cleat-to-chip offset */
    );

    .multiselect__tags {
      padding-right: calc(
        $multiselect-limit-right-pos + 50px // chip
        + var(--input-padding) // chip-to-content offset
      );
    }

    .multiselect__clear {
      right: $multiselect-clear-right-pos;
    }

    .multiselect__limit {
      right: $multiselect-limit-right-pos;
    }
  }
}
</style>

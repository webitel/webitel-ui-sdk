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
      v-bind="labelProps"
      :disabled="disabled"
      :invalid="invalid"
      class="wt-select__label"
    >
      <!-- @slot Custom input label -->
      <slot
        v-bind="{ label }"
        name="label"
      >
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <vue-multiselect
      v-bind="$attrs"
      ref="vue-multiselect"
      :allow-empty="allowEmpty"
      :disabled="disabled"
      :internal-search="!searchMethod"
      :label="selectOptionLabel"
      :limit="1"
      :loading="false"
      :multiple="multiple"
      :options="selectOptions"
      :placeholder="placeholder || label"
      :track-by="trackBy"
      :model-value="selectValue"
      class="wt-select__select"
      @close="isOpened = false"
      @open="isOpened = true"
      v-on="listeners"
    >
      <template
        v-if="!isOpened"
        #limit
      >
        <wt-chip class="multiselect__limit">
          +{{ value.length - 1 }}
        </wt-chip>
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
          v-bind="{ option, optionLabel }"
          name="singleLabel"
        >
          <span class="multiselect__single-label">
            {{ getOptionLabel({ option, optionLabel }) }}
          </span>
        </slot>
      </template>

      <!--      Slot for custom option template -->
      <template #option="{ option }">
        <slot
          v-bind="{ option, optionLabel }"
          name="option"
        >
          {{ getOptionLabel({ option, optionLabel }) }}
        </slot>
      </template>

      <!--      Element for opening and closing the dropdown -->
      <template #caret="{ toggle }">
        <wt-icon-btn
          v-if="allowCustomValues && searchParams.search"
          class="multiselect__select"
          :disabled="disabled"
          icon="edit"
          @mousedown.prevent.stop="handleCustomValue(toggle)"
        />
        <!-- @mousedown.native.prevent.stop="toggle": https://github.com/shentao/vue-multiselect/issues/1204#issuecomment-615114727 -->
        <wt-icon-btn
          v-else
          :disabled="disabled"
          class="multiselect__select"
          icon="arrow-down"
          @mousedown.prevent.stop="toggle"
        />
      </template>

      <!--      Slot located before the tags -->
      <template #clear="{}">
        <wt-icon-btn
          v-if="clearable"
          :class="{ 'hidden': !isValue }"
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
import taggableMixin from '../wt-tags-input/mixin/taggableMixin';
import multiselectMixin from './mixins/multiselectMixin';

export default {
  name: 'WtSelect',
  mixins: [
    multiselectMixin,
    // taggableMixin is used to add custom select values, see WTEL-3181
    taggableMixin,
  ],
  props: {
    value: {},

    multiple: {
      type: Boolean,
      default: false,
    },

    clearable: {
      type: Boolean,
      default: true,
    },
    // for taggableMixin functionality
    allowCustomValues: {
      type: Boolean,
      default: false,
      description: 'See wt-tags-input "taggable" prop.'
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
    'input',
    'closed',
    'custom-value', // fires when allowCustomValues and new customValue is added
  ],
  data: () => ({
    isOpened: false,
  }),
  computed: {
    // for taggableMixin
    taggable() { return this.allowCustomValues; },
    // for taggableMixin
    manualTagging() { return this.handleCustomValuesAdditionManually; },
  },
  methods: {
    // for taggableMixin functionality
    handleCustomValue(toggle) {
      toggle();
      this.tag(this.searchParams.search);
    },
    // for taggableMixin functionality
    emitTagEvent(searchQuery, id) {
      this.$emit('custom-value', searchQuery, id);
    },
    clearValue() {
      let value = '';
      if (Array.isArray(this.value)) value = [];
      else if (typeof this.value === 'object' && this.value !== null) value = {};
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

.multiselect :deep {
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

.multiselect--active :deep {
  .multiselect__tags-wrap,
  .multiselect__strong {
    display: none;
  }
}

// right padding setup

// default case
.wt-select {
  // all is fine
  .multiselect :deep {
    .multiselect__tags {
      padding: var(--input-padding) calc(
        var(--input-padding)
        + var(--icon-md-size)
        + var(--select-caret-right-pos)
      ) var(--input-padding) var(--input-padding);
    }
  }
}

// only chip
.wt-select.wt-select--multiple:not(.wt-select--clearable) {
  .multiselect :deep {
    $multiselect-limit-right-pos: calc(
      var(--select-caret-right-pos)// caret offet from border
      + var(--icon-md-size)// caret size
      + var(--input-padding) // caret-to-chip offset
    );

    .multiselect__tags {
      padding-right: calc(
        $multiselect-limit-right-pos
        + 50px// chip
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
  .multiselect :deep {
    $multiselect-clear-right-pos: calc(
      var(--select-caret-right-pos)// caret offset from border
      + var(--icon-md-size)// caret size
      + var(--input-padding) // caret-to-chip offset
    );

    .multiselect__tags {
      padding-right: calc(
        $multiselect-clear-right-pos
        + var(--icon-md-size)// clear
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
  .multiselect :deep {
    $multiselect-clear-right-pos: calc(
      var(--select-caret-right-pos)// caret offet from border
      + var(--icon-md-size)// caret size
      + var(--input-padding) // caret-to-chip offset
    );

    $multiselect-limit-right-pos: calc(
      $multiselect-clear-right-pos// clear offet from border
      + var(--icon-md-size)// clear size
      + var(--input-padding) // cleat-to-chip offset
    );

    .multiselect__tags {
      padding-right: calc(
        $multiselect-limit-right-pos
        + 50px// chip
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

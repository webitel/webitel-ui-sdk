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
      :options="selectOptions"
      :placeholder="placeholder || label"
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
        <!-- @mousedown.native.prevent.stop="toggle": https://github.com/shentao/vue-multiselect/issues/1204#issuecomment-615114727 -->
        <wt-icon-btn
          v-if="allowCustomValue ? !searchParams.search : true"
          :disabled="disabled"
          class="multiselect__select"
          icon="arrow-down"
          @mousedown.prevent.stop="toggle"
        />
        <wt-icon-btn
          v-if="allowCustomValue && searchParams.search"
          class="multiselect__select"
          icon="back"
          @mousedown.prevent.stop="addCustomValue(toggle)"
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
import multiselectMixin from './mixins/multiselectMixin';

export default {
  name: 'WtSelect',
  mixins: [multiselectMixin],
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
    allowCustomValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['reset', 'search-change', 'input', 'closed'],
  data: () => ({
    isOpened: false,
  }),
  methods: {
    clearValue() {
      let value = '';
      if (Array.isArray(this.value)) value = [];
      else if (typeof this.value === 'object' && this.value !== null) value = {};
      this.input(value);
      this.$emit('reset', value);
    },
    addCustomValue(toggle) {
      this.$emit('input', this.searchParams.search);
      toggle();
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

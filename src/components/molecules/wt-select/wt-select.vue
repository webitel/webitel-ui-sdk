<template>
  <div
    :class="{
      'wt-select--disabled': disabled,
      'wt-select--invalid': invalid,
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
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>
    <vue-multiselect
      ref="vue-multiselect"
      :allow-empty="allowEmpty"
      :disabled="disabled"
      :internal-search="!searchMethod"
      :label="trackBy ? optionLabel : null"
      :limit="1"
      :limit-text="(count) => `+${count}`"
      :loading="false"
      :options="selectOptions"
      :placeholder="placeholder || label"
      :track-by="trackBy"
      :value="selectValue"
      class="wt-select__select"
      v-bind="$attrs"
      v-on="listeners"
    >
      <template v-slot:limit>
        limit!!
      </template>

      <!--      Slot that is used for all selected options (tags)-->
      <template slot="tag" slot-scope="{ option }">
        <span class="multiselect__custom-tag">
            {{ getOptionLabel({ option, optionLabel }) }}
        </span>
      </template>

      <!--      Slot for custom label template for single select-->
      <template slot="singleLabel" slot-scope="{ option }">
        <slot name="singleLabel" v-bind="{ option, optionLabel }">
          <span class="multiselect__single-label">
            {{ getOptionLabel({ option, optionLabel }) }}
          </span>
        </slot>
      </template>

      <!--      Slot for custom option template -->
      <template slot="option" slot-scope="{ option }">
        <slot name="option" v-bind="{ option, optionLabel }">
          <span>
            {{ getOptionLabel({ option, optionLabel }) }}
          </span>
        </slot>
      </template>

      <!--      Element for opening and closing the dropdown -->
      <template slot="caret" slot-scope="{ toggle }">
        <!-- @mousedown.native.prevent.stop="toggle": https://github.com/shentao/vue-multiselect/issues/1204#issuecomment-615114727 -->
        <wt-icon-btn
          :disabled="disabled"
          class="multiselect__arrow-caret"
          icon="arrow-down"
          @mousedown.native.prevent.stop="toggle"
        ></wt-icon-btn>
      </template>

      <!--      Slot located before the tags -->
      <template slot="clear" slot-scope="{}">
        <wt-icon-btn
          v-if="clearable"
          :class="{ 'hidden': !isValue }"
          :disabled="disabled"
          class="multiselect__clear"
          icon="close"
          @click="clearValue"
        ></wt-icon-btn>
      </template>

      <template slot="beforeList">
        <div v-show="isLoading" class="multiselect__loading-wrapper">
          <wt-loader size="sm"></wt-loader>
        </div>
      </template>

      <template v-if="showIntersectionObserver" slot="afterList">
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
import multiselectMixin from './mixins/multiselectMixin';

export default {
  name: 'wt-select',
  mixins: [multiselectMixin],
  props: {
    value: {},
  },
};
</script>

<style lang="scss" scoped>
@import '../../../css/components/molecules/wt-select/multiselect';

.wt-select {
  width: 100%;
  min-width: 0;
}

.wt-label {
  .wt-select:hover &,
  .wt-select:focus-within &, {
    color: var(--form-label--hover-color);
  }
}

.wt-select--invalid,
.wt-select--invalid:hover {
  .wt-label {
    color: var(--false-color);
  }
}

.multiselect--active ::v-deep {
  .multiselect__tags-wrap,
  .multiselect__strong {
    display: none;
  }
}
</style>

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

    <wt-message
      v-if="isValidation && validationText"
      :color="validationTextColor"
      :variant="MessageVariant.SIMPLE"
      :size="ComponentSize.SM"
    >
      {{ validationText }}
    </wt-message>
  </div>
</template>

<script>
import deepEqual from 'deep-equal';

import validationMixin from '../../mixins/validationMixin/validationMixin';
import multiselectMixin from '../wt-select/mixins/multiselectMixin.js';
import taggableMixin from './mixin/taggableMixin.js';
import { MessageVariant, ComponentSize } from '../../enums';

export default {
	name: 'WtTagsInput',
	mixins: [
		validationMixin,
		multiselectMixin,
		// taggableMixin is used to add custom select values, see [https://my.webitel.com/browse/WTEL-3181
		taggableMixin,
	],
	/**
	 * @emits {Array} input - Fires when tags value changes. Emits value array
	 * @emits {string} tag - Fires when tag is added (if manualTagging is true). Emits vue-multiselect "tag" value
	 * @emits {string} search-change - Fires when search query changes
	 * @emits {void} closed - Fires when dropdown is closed
	 *
	 * Note: This component inherits props from multiselectMixin (options, placeholder, optionLabel, searchMethod, disabled, required, allowEmpty, useValueFromOptionsByProp)
	 * and validationMixin (v, customValidators). Also inherits label-related props from labelUsageMixin (label, labelProps).
	 */
	props: {
		/**
		 * Current tags value (v-model). Default mode for tags input is array of strings, not objects (that is the difference between tags input and select).
		 * @type {Array}
		 * @model value
		 */
		value: {
			type: Array,
		},
		/**
		 * Default mode for tags input is array of strings, not objects (that is the difference between tags input and select).
		 * @type {string}
		 * @default null
		 */
		trackBy: {
			type: String,
			default: null,
		},
		/**
		 * If true, user can add tags by himself
		 * @type {boolean}
		 * @default false
		 */
		taggable: {
			type: Boolean,
			default: false,
		},
		/**
		 * Represented property of select object. REQUIRED IN OBJECT-DATA TAG-INPUTS TO PREVENT OPTION DUPLICATION.
		 * @type {string}
		 * @default null
		 */
		optionLabel: {
			type: String,
			default: null,
		},
		/**
		 * False: "tag" method automatically pushes { optionLabel | "name", trackBy } object to value array and $emits "input" event.
		 * True: "tag" method only $emits "tag" event. Tag addition is responsibility of client side.
		 * @type {boolean}
		 * @default false
		 */
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
	emits: [
		'input',
		'tag',
		'search-change',
		'closed',
	],
	data: () => ({
		defaultOptionLabel: 'label',

		// [https://webitel.atlassian.net/browse/WTEL-4310]
		// Multiple value is needed in TaggableMixin mixin to correctly add custom values

		multiple: true,
	}),
	created() {
		if (!this.isApiMode) {
			this.initializeOptions();
		}
	},
	methods: {
		getTagOptionLabel({ optionLabel, option }) {
			/*
      Multiselect creates new tags with "label" property by default, so we need to handle
      it as well
       */
			const label = this.getOptionLabel({
				optionLabel,
				option,
			});
			return typeof label === 'object' ? option.label : label;
		},
		initializeOptions() {
			if (!this.value) {
				return [];
			}

			const newOptions = this.value.filter((valObj) => {
				return !this.options.find((option) => {
					return deepEqual(option, valObj);
				});
			});

			this.options.unshift(...newOptions);
		},
	},
};
</script>

<style scoped>
@import '../wt-select/multiselect.css';

.wt-tags-input {
  width: 100%;
}

.wt-tags-input--disabled .wt-tags-input__tags-input {
  width: 100%;
  max-width: 100%;
  /* reset default */
}

/* paddings recalc */
.wt-tags-input :deep(.multiselect) .multiselect__tags {
  padding-right: calc(var(--input-padding) + var(--icon-md-size) + var(--select-caret-right-pos));
  padding-bottom: 0;
}

:deep(.multiselect__tags-wrap) {
  display: flex;
  flex-wrap: wrap;
}

.wt-tags-input :deep(.multiselect__custom-tag) {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--spacing-xs);
  margin: 0 var(--spacing-xs) calc(var(--spacing-xs) - 1px) 0;
  /* border bottom */
  max-width: 100%;
  word-break: break-all;
  white-space: normal;
}

:deep(.multiselect__input) {
  margin-bottom: calc(var(--spacing-xs) - 1px);
  /* border */
}
</style>

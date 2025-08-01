<template>
  <div
    :class="{
      'wt-datepicker--disabled': disabled,
      'wt-datepicker--invalid': invalid,
    }"
    class="wt-datepicker"
  >
    <wt-label
      :disabled="disabled"
      v-bind="labelProps"
      :invalid="invalid"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <vue-datepicker
      ref="datepicker"
      :close-on-auto-apply="false"
      :format="isDateTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'"
      :locale="$i18n.locale"
      :model-value="+value"
      :placeholder="
        placeholder || (isDateTime ? '00/00/00 00:00' : '00/00/0000')
      "
      auto-apply
      class="wt-datepicker__datepicker"
      v-bind="{ ...$attrs, ...$props }"
      @closed="isOpened = false"
      @open="isOpened = true"
      @update:model-value="emit('input', $event.getTime())"
    >
      <template #input-icon>
        <wt-icon
          :color="disabled ? 'disabled' : 'default'"
          icon="calendar"
        />
      </template>
      <template #clear-icon>
        <wt-icon-btn
          v-if="clearable && value"
          :color="disabled ? 'disabled' : 'default'"
          icon="close"
          @click.stop="clearValue"
        />
      </template>
      <template #arrow-left>
        <wt-icon-btn icon="arrow-left" />
      </template>
      <template #arrow-right>
        <wt-icon-btn icon="arrow-right" />
      </template>
      <template
        v-if="isDateTime"
        #time-picker="{ time, updateTime }"
      >
        <div class="datepicker__timepicker">
          <wt-time-input
            :value="time.hours"
            max-value="23"
            @input="updateTime"
          />
          :
          <wt-time-input
            :value="time.minutes"
            max-value="59"
            @input="updateTime($event, false)"
          />
        </div>
      </template>
    </vue-datepicker>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >
      {{ validationText }}
    </wt-input-info>
  </div>
</template>

<script setup>
import '@vuepic/vue-datepicker/dist/main.css';

import VueDatepicker from '@vuepic/vue-datepicker';
import { computed, ref, toRefs } from 'vue';

import { useValidation } from '../../mixins/validationMixin/useValidation';
import WtInputInfo from '../wt-input-info/wt-input-info.vue';

const props = defineProps({
  /**
   * [`'date'`, `'datetime'`]
   * */

  mode: {
    type: String,
    default: 'date',
    options: ['date', 'datetime'],
  },
  value: {
    type: [String, Number],
    default: 'Date.now()',
  },
  /**
   * label above calendar input
   */
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
  disabledDates: {
    type: Object,
  },
  lang: {
    type: String,
    default: 'en',
  },

  /**
   * Object with props, passed down to wt-label as props
   */

  labelProps: {
    type: Object,
  },

  /**
   * Native input required attribute
   */

  required: {
    type: Boolean,
    default: false,
  },

  // validation rules
  // TODO: move to separate file to make it reusable
  v: {
    type: Object,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['input']);

const isOpened = ref(false);
const datepicker = ref(null); // template ref

const isDateTime = props.mode === 'datetime';

const requiredLabel = computed(() => {
  return props.required ? `${props.label}*` : props.label;
});

// https://stackoverflow.com/questions/72408463/use-props-in-composables-vue3
const { v, customValidators } = toRefs(props);

const { isValidation, invalid, validationText } = useValidation({
  v,
  customValidators,
});

const clearValue = () => {
  emit('input', null);

  if (isOpened.value) {
    datepicker?.value.closeMenu();
  }

  isOpened.value = false;
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-datepicker :deep(.dp__main) {
  .dp__input_icon {
    left: var(--spacing-xs);
    line-height: 0;
  }

  .dp__clear_icon {
    right: var(--spacing-xs);
    line-height: 0;
  }

  .dp__input {
    @extend %typo-body-1;
  }

  .dp__arrow_top {
    display: none;
  }

  /*
  don't know why but month or year selection doesn't work
  suppose its related to compatibility build
   */
  .dp__month_year_wrap {
    pointer-events: none;
  }

  .dp__month_year_select,
  .dp__cell_inner {
    @extend %typo-body-2;
  }

  // reset right/left arrow hover
  .dp__inner_nav:hover {
    background: inherit;
  }

  .dp__menu {
    box-sizing: border-box;
    box-shadow: var(--elevation-10);
    border-radius: var(--border-radius);
    padding: var(--spacing-xs);
    width: 196px;
    min-width: 196px;
  }

  .dp__calendar_wrap {
    gap: var(--spacing-2xs);
  }

  .dp__calendar_header_item {
    @extend %typo-subtitle-2;
  }

  .dp__calendar_header_separator {
    background: var(--secondary-color);
  }

  .dp__calendar_header,
  .dp__calendar_row {
    gap: var(--spacing-3xs);
  }

  // switch to time view
  .dp__button {
    display: none;
  }

  .dp__action_row {
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .dp__selection_preview,
  .dp__action_buttons {
    width: 100%;
  }

  .dp__selection_preview {
    text-align: center;
  }

  .dp__action_buttons {
    display: flex;
    gap: var(--spacing-xs);
  }
}

.wt-datepicker--invalid :deep(.dp__main) {
  .dp__input {
    outline: none; // prevent outline overlapping false color
    border-color: var(--wt-text-field-input-border-error-color);
    color: var(--wt-text-field-error-text-color);
  }

  .dp__input_icon {
    --icon-color: var(--wt-text-field-input-border-error-color);
  }
}

.datepicker__timepicker {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);

  .wt-time-input {
    flex-grow: 1;
  }
}
</style>

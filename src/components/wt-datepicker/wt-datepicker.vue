<template>
  <div
    :class="{
      'wt-datepicker--disabled': disabled,
    }"
    class="wt-datepicker"
  >
    <wt-label
      :disabled="disabled"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ label }}
      </slot>
    </wt-label>
    <vue-datepicker
      ref="datepicker"
      :close-on-auto-apply="false"
      :format="isDateTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'"
      :locale="$i18n.locale === 'ua' ? 'uk' : $i18n.locale"
      :model-value="+value"
      :placeholder="label || placeholder"
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
        <wt-icon
          :class="{ 'wt-datepicker__open-arrow--opened': isOpened }"
          :color="disabled ? 'disabled' : 'default'"
          class="wt-datepicker__open-arrow"
          icon="arrow-down"
        />
      </template>
      <template #arrow-left>
        <wt-icon-btn
          icon="arrow-left"
        />
      </template>
      <template #arrow-right>
        <wt-icon-btn
          icon="arrow-right"
        />
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
  </div>
</template>

<script setup>
import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';

const props = defineProps({
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
  labelProps: {
    type: Object,
    description: 'Object with props, passed down to wt-label as props',
  },
});
const emit = defineEmits(['input']);

const isOpened = ref(false);
const datepicker = ref(null); // template ref

const isDateTime = props.mode === 'datetime';
</script>

<style lang="scss">
//@import './variables.scss';
</style>

<style lang="scss" scoped>
//@import '../../../src/css/main.scss';

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
    width: 196px;
    min-width: 196px;
    padding: var(--spacing-xs);
    border-radius: var(--border-radius);
    box-shadow: var(--elevation-10);
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

.datepicker__timepicker {
  display: flex;
  align-items: center;
  margin-top: var(--spacing-xs);
  gap: var(--spacing-xs);

  .wt-time-input {
    flex-grow: 1;
  }
}

.wt-datepicker__open-arrow {
  transition: var(--transition);

  &--opened {
    transform: rotate(180deg);
  }
}
</style>

<template>
  <div
    :class="{
      'wt-datepicker--disabled': disabled,
    }"
    class="wt-datepicker"
  >
    <wt-label :disabled="disabled" v-bind="labelProps">
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </wt-label>
    <vue-datepicker
      ref="datepicker"
      :model-value="+value"
      :placeholder="label || placeholder"
      class="wt-datepicker__datepicker"
      v-bind="{ ...$attrs, ...$props }"
      @closed="isOpened = false"
      @open="isOpened = true"
      @update:model-value="emit('change', $event.getTime())"
    >
      <template v-slot:input-icon>
        <wt-icon
          :color="disabled ? 'disabled' : 'default'"
          icon="calendar"
        ></wt-icon>
      </template>
      <template v-slot:clear-icon>
        <wt-icon
          :class="{ 'wt-datepicker__open-arrow--opened': isOpened }"
          :color="disabled ? 'disabled' : 'default'"
          class="wt-datepicker__open-arrow"
          icon="arrow-down"
        ></wt-icon>
      </template>
      <template v-slot:arrow-left>
        <wt-icon-btn
          icon="arrow-left"
        ></wt-icon-btn>
      </template>
      <template v-slot:arrow-right>
        <wt-icon-btn
          icon="arrow-right"
        ></wt-icon-btn>
      </template>
      <template v-slot:action-select>
        <wt-button
          @click="datepicker.selectDate()"
        >{{ $t('reusable.ok') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="datepicker.closeMenu()"
        >{{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </vue-datepicker>
  </div>
</template>

<script setup>
import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';

const props = defineProps({
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
const emit = defineEmits(['change']);

const isOpened = ref(false);
const datepicker = ref(null); // template ref
</script>

<style lang="scss">
:root {
  /*General*/
  --dp-font-family: 'Montserrat';
  --dp-border-radius: var(--border-radius); /*Configurable border-radius*/
  --dp-cell-border-radius: var(--border-radius); /*Specific border radius for the calendar cell*/

  /*Sizing*/
  --dp-button-heigh: 32px; /*Size for buttons in overlays*/
  --dp-month-year-row-height: 32px; /*Height of the month-year select row*/
  --dp-month-year-row-button-size: 32px; /*Specific height for the next/previous buttons*/
  --dp-button-icon-height: 24px; /*Icon sizing in buttons*/
  --dp-cell-size: 32px; /*Width and height of calendar cell*/
  --dp-cell-padding: 4px; /*Padding in the cell*/
  --dp-common-padding: var(--spacing-xs); /*Common padding used*/
  --dp-input-icon-padding: 24px; /*Padding on the left side of the input if icon is present*/
  --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
  --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
  --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
  --dp-row-maring: 5px 0; /*Adjust the spacing between rows in the calendar*/
  --dp-calendar-header-cell-padding: 0.5rem; /*Adjust padding in calendar header cells*/
  --dp-two-calendars-spacing: 10px; /*Space between multiple calendars*/
  --dp-overlay-col-padding: 3px; /*Padding in the overlay column*/
  --dp-time-inc-dec-button-size: 32px; /*Sizing for arrow buttons in the time picker*/

  /*Font sizes*/
  --dp-font-size: 14px; /*Default font-size*/
  --dp-preview-font-size: 12px; /*Font size of the date preview in the action row*/
  --dp-time-font-size: 12px; /*Font size in the time picker*/

  /*Transitions*/
  --dp-animation-duration: var(--transition); /*Transition duration*/
  --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1); /*Timing on menu appear animation*/
  --dp-transition-timing: ease-out; /*Timing on slide animations*/
}

.wt-datepicker {
  .dp__arrow_top {
    display: none;
  }

  .dp__menu {
    border-radius: var(--border-radius);
  }

  .dp__calendar_header,
  .dp__calendar_row {
    gap: var(--spacing-xs);
  }
}
</style>

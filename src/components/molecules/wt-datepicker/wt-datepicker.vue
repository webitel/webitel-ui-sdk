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
      format="dd.mm.yyyy"
      :locale="locale"
      @closed="isOpened = false"
      @open="isOpened = true"
      @update:model-value="emit('input', $event.getTime())"
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
          wide
          @click="datepicker.selectDate()"
        >{{ $t('reusable.ok') }}
        </wt-button>
        <wt-button
          color="secondary"
          wide
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
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

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
const emit = defineEmits(['input']);

const i18n = useI18n();

const isOpened = ref(false);
const datepicker = ref(null); // template ref

const locale = computed(() => {
  const { locale } = i18n;
  if (locale === 'ua') return 'uk';
  return locale;
});
</script>

<style lang="scss" scoped>
.wt-datepicker :deep(.dp__main) {
  .dp__input_icon {
    line-height: 0;
    left: var(--spacing-xs);
  }

  .dp__clear_icon {
    line-height: 0;
    right: var(--spacing-xs);
  }

  .dp__input {
    line-height: 24px;
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

  // reset right/left arrow hover
  .dp__inner_nav:hover {
    background: inherit;
  }

  .dp__menu {
    box-shadow: var(--elevation-10);
    border-radius: var(--border-radius);
  }

  .dp__calendar_header_separator {
    background: var(--secondary-color);
  }

  .dp__calendar_header,
  .dp__calendar_row {
    gap: var(--spacing-xs);
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
</style>

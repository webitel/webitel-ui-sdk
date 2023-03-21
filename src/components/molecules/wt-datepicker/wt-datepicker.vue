<template>
  <div
    :class="{
      'wt-datepicker--disabled': disabled,
    }"
    class="wt-datepicker"
  >
    <wt-label v-bind="labelProps" :disabled="disabled">
      <!-- @slot Custom input label -->
      <slot v-bind="{ label }" name="label">{{ label }}</slot>
    </wt-label>
    <vue-datepicker
      v-bind="{ ...$attrs, ...$props }"
      :placeholder="label || placeholder"
      :value="+value"
      class="wt-datepicker__datepicker"
      monday-first
      @input="$emit('change', $event.getTime())"
    >
      <template v-slot:afterDateInput>
        <wt-icon
          :color="disabled ? 'disabled' : 'default'"
          class="wt-datepicker__calendar-icon"
          icon="calendar"
        ></wt-icon>
        <wt-icon
          :color="disabled ? 'disabled' : 'default'"
          class="wt-datepicker__arrow-icon"
          icon="arrow-down"
        ></wt-icon>
      </template>
      <template v-slot:beforeCalendarHeader>
        <wt-icon
          class="wt-datepicker__month-arrow wt-datepicker__month-arrow--left"
          icon="arrow-left"
        ></wt-icon>
        <wt-icon
          class="wt-datepicker__month-arrow wt-datepicker__month-arrow--right"
          icon="arrow-right"
        ></wt-icon>
      </template>
    </vue-datepicker>
  </div>
</template>

<script>
import VueDatepicker from 'vuejs-datepicker';

export default {
  name: 'wt-datepicker',
  components: {
    VueDatepicker,
  },
  props: {
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
    format: {
      type: [String, Function],
    },
    maximumView: {
      type: String,
      default: 'day',
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
  },
  model: {
    prop: 'value',
    event: 'change',
  },
};
</script>

<style lang="scss" scoped>
.wt-datepicker__calendar-icon {
  position: absolute;
  top: var(--spacing-xs);
  left: var(--input-padding);
  pointer-events: none;
}

.wt-datepicker__arrow-icon {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--input-padding);
  pointer-events: none;
}

.wt-datepicker__month-arrow {
  position: absolute;
  top: var(--spacing-xs);
  pointer-events: none;

  &--right {
    right: var(--spacing-xs);
  }

  &--left {
    left: var(--spacing-xs);
  }
}

::v-deep .vdp-datepicker {
  min-width: var(--datepicker-width);

  // preview input
  > div:first-child {
    position: relative;

    input {
      @extend %typo-body-1;
      @include wt-placeholder;
      box-sizing: border-box;
      width: 100%;
      padding: var(--datepicker-padding);
      border: var(--datepicker-border);
      border-color: var(--form-border-color);
      border-radius: var(--border-radius);

      &:focus {
        @include wt-placeholder('focus');
      }
    }

    .vdp-datepicker__calendar-button {
      display: none;
    }
  }

  @import '../../../css/components/molecules/wt-datepicker/datepicker-calendar';
}

.wt-datepicker:hover,
.wt-datepicker:focus-within {
  .wt-label {
    color: var(--form-label--hover-color);
  }

  ::v-deep .vdp-datepicker {
    min-width: var(--datepicker-width);

    // preview input
    > div:first-child {

      input {
        border-color: var(--form-border--hover-color);
      }
    }
  }
}

.wt-datepicker:focus-within {
  ::v-deep .vdp-datepicker {
    // arrow down icon
    .vdp-datepicker__calendar-button:before {
      transform: rotate(180deg);
    }
  }
}

.wt-datepicker--disabled {
  pointer-events: none;

  ::v-deep .vdp-datepicker {
    min-width: var(--datepicker-width);

    // preview input
    > div:first-child {

      input {
        border-color: var(--form-border--disabled-color);
        background: var(--form-border--disabled-color);
      }
    }
  }
}
</style>

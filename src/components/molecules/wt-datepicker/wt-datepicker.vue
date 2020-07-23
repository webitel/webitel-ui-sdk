<template>
  <div
    class="wt-datepicker"
    :class="{
      'wt-datepicker--disabled': disabled,
    }"
  >
    <wt-label :disabled="disabled">
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </wt-label>
    <vue-datepicker
      class="wt-datepicker__datepicker"
      :value="+value"
      :format="format"
      :maximum-view="maximumView"
      :disabled="disabled"
      :disabled-dates="disabledDates"
      :lang="lang"
      calendar-button
      monday-first
      @input="$emit('input', $event.getTime())"
    >
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
        default: Date.now(),
      },
      /**
       * label above calendar input
       */
      label: {
        type: String,
      },
      format: {
        type: String,
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
    },
  };
</script>

<style lang="scss" scoped>
  .wt-label {
    margin-bottom: var(--label-margin);
    cursor: text;
  }

  ::v-deep .vdp-datepicker {
    min-width: var(--datepicker-width);

    // preview input
    > div:first-child {
      position: relative;

      input {
        @extend %typo-body-lg;
        box-sizing: border-box;
        width: 100%;
        padding: var(--datepicker-padding);
        border: var(--datepicker-border);
        border-color: var(--form-border-color);
        border-radius: var(--border-radius);
      }

      // arrow down icon
      .vdp-datepicker__calendar-button {
        position: absolute;
        top: 50%;
        right: var(--datepicker-icon-margin);
        width: 24px;
        height: 24px;
        transform: translateY(-50%);

        &:before {
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          background: url("../../../assets/icons/arrow-down--md.svg") center center;
          background-size: contain;
          transition: var(--transition);
        }

        // hide defaults
        span {
          display: none;
        }
      }

      // calendar icon
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: var(--datepicker-icon-margin);
        width: 24px;
        height: 24px;
        background: url("../../../assets/icons/calendar--md.svg") center center;
        background-size: contain;
        transform: translateY(-50%);
        pointer-events: none;
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

        // arrow down icon
        .vdp-datepicker__calendar-button:before {
          background: url("../../../assets/icons/arrow-down--active--md.svg") center center;
          background-size: contain;
        }

        // calendar icon
        &:before {
          background: url("../../../assets/icons/calendar--active--md.svg") center center;
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
          background: var(--form-border--disabled-color);
          border-color: var(--form-border--disabled-color);
        }

        // arrow down icon
        .vdp-datepicker__calendar-button:before {
          background: url("../../../assets/icons/arrow-down--disabled--md.svg") center center;
          background-size: contain;
        }

        // calendar icon
        &:before {
          background: url("../../../assets/icons/calendar--disabled--md.svg") center center;
        }
      }
    }
  }
</style>

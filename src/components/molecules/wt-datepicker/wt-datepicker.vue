<template>
  <div
    class="wt-datepicker"
    :class="{
      'wt-datepicker--active': isOpened,
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

    .vdp-datepicker__calendar {
      width: var(--datepicker-width);
      right: 0;
      padding: var(--datepicker-calendar-padding);
      margin-top: var(--datepicker-calendar-margin-top);
      line-height: var(--datepicker-cell-size);
      border-radius: var(--border-radius);

      header {
        display: flex;
        justify-content: space-between;
        align-content: flex-end;
        margin-bottom: var(--datepicker-calendar-header-margin);
        line-height: 0;

        .day__month_btn {
          @extend %typo-strong-lg;
          padding-top: 5px;
        }

        .prev, .next {
          float: none;
          text-indent: 0;
          color: transparent;
          cursor: pointer;

          &:hover {
            background-color: transparent !important;
          }

          &:after {
            content: '';
            position: absolute;
            top: 5px;
            width: 24px;
            height: 24px;
            background: url("../../../assets/icons/arrow-down--md.svg") center center;
            background-size: contain;
            border: none !important; // hide default arrows
            transform: translateX(-50%) rotate(90deg);
          }

          &:hover:after {
            background: url("../../../assets/icons/arrow-down--active--md.svg") center center;
          }
        }

        .next:after {
          transform: translateX(-50%) rotate(-90deg);
        }
      }

      .cell {
        @extend %typo-body-lg;
        width: var(--datepicker-cell-size);
        height: var(--datepicker-cell-size);
        padding: 0;
        line-height: var(--datepicker-cell-size);
        transition: var(--transition);

        &.day-header {
          @extend %typo-body-sm;
          height: auto;
          letter-spacing: 0.4px;
          color: var(--form-label-color);
        }

        &.day {
          border-radius: var(--border-radius);
          margin: 1px;

          &.selected {
            @extend %typo-strong-lg;
            color: var(--datepicker-selected-cell-text-color);
            background: var(--datepicker-selected-cell-bg-color) !important;
            line-height: var(--datepicker-cell-size);
          }

          &:not(.blank):not(.disabled).day:hover,
          &:not(.blank):not(.disabled).month:hover,
          &:not(.blank):not(.disabled).year:hover {
            background: var(--datepicker-cell--hover-color);
            border-color: transparent;
          }
        }

        &.month {
          &.selected {
            &:hover {
              background: var(--datepicker-selected-cell-bg-color) !important;
            }
          }

          &:not(.blank):not(.disabled).day:hover,
          &:not(.blank):not(.disabled).month:hover,
          &:not(.blank):not(.disabled).year:hover {
            background: var(--datepicker-selected-cell-bg-color) !important;
          }
        }
      }
    }
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

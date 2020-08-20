<template>
  <div
    class="wt-datetimepicker"
    :class="{
      'wt-datetimepicker--active': isOpened,
      'wt-datetimepicker--disabled': disabled,
    }"
    v-clickaway="close"
  >
    <wt-label :disabled="disabled">
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </wt-label>
    <div
      class="wt-datetimepicker__preview"
      :class="{'wt-datetimepicker__preview--opened': isOpened}"
      tabindex="0"
      @click="isOpened = !isOpened"
      @keyup.enter="isOpened = !isOpened"
      @keyup.esc="isOpened = false"
    >
      <wt-icon class="wt-datetimepicker__calendar-icon" icon="calendar"></wt-icon>
      <input
        class="wt-datetimepicker__preview__input"
        :value="displayValue"
        autocomplete="off"
        readonly
      >
      <wt-icon class="wt-datetimepicker__arrow-icon" icon="arrow-down"></wt-icon>
    </div>

    <div
      class="wt-datetimepicker__form"
      v-show="isOpened"
    >
      <div class="wt-datetimepicker__quick-filters-wrapper">
        <span class="wt-datetimepicker__quick-filter" @click="setLastHour">
          {{$t('webitelUI.datetimepicker.lastHour')}}
        </span>
        <span class="wt-datetimepicker__quick-filter" @click="setLastDay">
                {{$t('webitelUI.datetimepicker.lastDay')}}
        </span>
      </div>
      <div class="wt-datetimepicker__form-wrapper">
        <datepicker
          class="wt-datetimepicker__datepicker"
          :value="draft"
          :maximum-view="'day'"
          monday-first
          inline
          @input="setDraft($event.getTime())"
        ></datepicker>
        <wt-timepicker
          class="wt-datetimepicker__timepicker"
          v-model="draft"
          format="hh:mm"
        ></wt-timepicker>
      </div>
      <div class="wt-datetimepicker__actions">
        <wt-button color="primary" @click.native="input">
          {{$t('reusable.add')}}
        </wt-button>
        <wt-button color="secondary" @click.native="close">
          {{$t('reusable.cancel')}}
        </wt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';

  export default {
    name: 'wt-datetimepicker',
    components: {
      Datepicker,
    },

    props: {
      value: {
        type: [String, Number],
        default: 0,
      },
      label: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    model: {
      prop: 'value',
      event: 'change',
    },

    watch: {
      isOpened: {
        handler() {
          this.draft = this.value;
        },
        immediate: true,
      },
    },

    data: () => ({
      isOpened: false,
      draft: 0,
    }),

    computed: {
      // prop value representation on picker preview
      displayValue() {
        const date = new Date(+this.value).toLocaleDateString();
        const time = new Date(+this.value).toTimeString()
          .slice(0, 5);
        return `${date} ${time}`;
      },
    },

    methods: {
      setLastHour() {
        const value = Date.now() - 60 * 60 * 10 ** 3; // 60 min x 60 sec x 1000 ms
        this.$emit('change', value);
        this.close();
      },
      setLastDay() {
        const value = Date.now() - 24 * 60 * 60 * 10 ** 3; // 24hour x 60 min x 60 sec x 1000 ms
        this.$emit('change', value);
        this.close();
      },

      input() {
        this.$emit('change', this.draft);
        this.close();
      },

      setDraft(value) {
        this.draft = value;
      },

      close() {
        this.isOpened = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-datetimepicker {
    position: relative;
  }

  .wt-label {
    margin-bottom: var(--label-margin);
    cursor: text;
  }

  .wt-datetimepicker__preview {
    position: relative;
    cursor: text;
    outline: none;

    &__input {
      @extend %typo-body-lg;
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: var(--datetimepicker-padding);
      border: var(--datetimepicker-border);
      border-color: var(--form-border-color);
      border-radius: var(--border-radius);
    }

    .wt-datetimepicker__calendar-icon {
      position: absolute;
      top: 50%;
      left: var(--datetimepicker-icon-margin);
      transform: translateY(-50%);
      pointer-events: none;
    }

    .wt-datetimepicker__arrow-icon {
      position: absolute;
      top: 50%;
      right: var(--datetimepicker-icon-margin);
      transform: translateY(-50%);
      pointer-events: none;
    }
  }

  .wt-datetimepicker__form {
    position: absolute;
    top: 100%;
    right: 0;
    padding: var(--datetimepicker-form-padding);
    background: var(--datetimepicker-form-bg-color);
    box-sizing: border-box;
    border: var(--datetimepicker-border);
    border-color: var(--form-border-color);
    border-radius: var(--border-radius);
    z-index: var(--datetimepicker-form-z-index);
  }

  .wt-datetimepicker__quick-filters-wrapper {
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: var(--datetimepicker-form-content-margin);
  }

  .wt-datetimepicker__quick-filter {
    @extend %typo-body-sm;
    text-decoration: underline;
    cursor: pointer;
  }

  .wt-datetimepicker__form-wrapper {
    display: flex;
    flex-direction: column;

    .wt-datetimepicker__datepicker {
      input {
        display: none;
      }

      ::v-deep {
        @import '../../../css/components/molecules/wt-datepicker/datepicker-calendar';

        .vdp-datepicker__calendar {
          margin: auto;
          border: none;
        }
      }
    }

    .wt-datetimepicker__timepicker {
      margin: var(--datetimepicker-form-content-margin) auto 0;
    }
  }

  .wt-datetimepicker__actions {
    display: flex;
    justify-content: center;
    margin-top: var(--datetimepicker-form-content-margin);

    .wt-button {
      &.secondary {
        margin-left: var(--datetimepicker-form-content-margin);
      }
    }
  }

  .wt-datetimepicker:hover {
    .wt-label {
      color: var(--form-label--hover-color);
    }

    .wt-datetimepicker__preview__input {
      border-color: var(--form-border--hover-color);
    }

    .wt-datetimepicker__arrow-icon {
      transform: translateY(-50%) rotate(180deg);
    }

    .wt-datetimepicker__calendar-icon ::v-deep .wt-icon__icon,
    .wt-datetimepicker__arrow-icon ::v-deep .wt-icon__icon {
      fill: var(--icon--hover-color);
    }
  }

  .wt-datetimepicker:focus-within,
  .wt-datetimepicker--active {
    .wt-label {
      color: var(--form-label--active-color);
    }

    .wt-datetimepicker__preview__input {
      border-color: var(--form-border--active-color);
    }

    .wt-datetimepicker__arrow-icon {
      transform: translateY(-50%) rotate(180deg);
    }

    .wt-datetimepicker__calendar-icon ::v-deep .wt-icon__icon,
    .wt-datetimepicker__arrow-icon ::v-deep .wt-icon__icon {
      fill: var(--icon--active-color);
    }
  }

  .wt-datetimepicker--disabled {
    pointer-events: none;

    .wt-datetimepicker__preview__input {
      border-color: var(--form-border--disabled-color);
      background: var(--form-border--disabled-color);
    }

    .wt-datetimepicker__calendar-icon ::v-deep .wt-icon__icon,
    .wt-datetimepicker__arrow-icon ::v-deep .wt-icon__icon {
      fill: var(--icon--disabled-color);
    }
  }
</style>

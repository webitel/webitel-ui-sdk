<template>
  <div
    class="wt-radio"
    :class="{
      'wt-radio--active': isChecked,
      'wt-radio--outline': outline,
      'wt-radio--disabled': disabled,
    }"
  >
    <wt-label class="wt-radio__wrapper">
      <input
        class="wt-radio__input"
        type="radio"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        @input="inputHandler"
      >
      <span class="wt-radio__checkmark"></span>
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label, isChecked, disabled }">
        <div v-if="label" class="wt-radio__label">{{ label }}</div>
      </slot>
    </wt-label>
  </div>
</template>

<script>
  export default {
    name: 'wt-radio',
    props: {
      // value, set by radio
      value: {
        type: String,
        default: '',
      },
      // currently selected value
      selected: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      outline: {
        type: Boolean,
        default: false,
      },
    },
    model: {
      prop: 'selected',
      event: 'input',
    },
    computed: {
      isChecked() {
        return this.value === this.selected;
      },
    },
    methods: {
      inputHandler() {
        this.$emit('input', this.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  /* Customize the label (the container) */
  .wt-radio {
    @include width-fit-content;
    box-sizing: border-box;
  }

  .wt-radio__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }

  .wt-radio__label {
    padding-left: var(--radio-icon-margin);
    transition: var(--transition);
  }

  /* Hide the browser's default radio button */
  .wt-radio__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  /* Create a custom radio button */
  .wt-radio__checkmark {
    display: block;
    position: relative;
    box-sizing: border-box;
    height: var(--radio-checkmark-size);
    width: var(--radio-checkmark-size);
    border: 2px solid;
    border-color: var(--icon-primary-color);
    background-color: transparent;
    border-radius: 50%;
    transition: var(--transition);

    /* Create the indicator (the dot/circle - hidden when not checked) */
    /* Style the indicator (dot/circle) */
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: var(--radio-bullet-size);
      height: var(--radio-bullet-size);
      transform: translate(-52%, -48%);
     // transform: translate(-50%, -50%);
      background: var(--icon--active-color);
      box-sizing: border-box;
      border-radius: 50%;
      transition: var(--transition);
      opacity: 0;
    }
  }

  .wt-radio:hover {
    .wt-radio__label {
      color: var(--form-label--hover-color);
    }

    .wt-radio__checkmark {
      border-color: var(--icon--hover-color);
    }
  }

  .wt-radio--active {
    .wt-radio__label {
      color: var(--form-label--active-color);
    }

    .wt-radio__checkmark {
      border-color: var(--icon--active-color);

      /* Show the indicator (dot/circle) when checked */
      &:after {
        opacity: 1;
      }
    }
  }

  .wt-radio--outline {
    .wt-radio__label {
      color: var(--form-outline-label-color);
    }

    .wt-radio__checkmark {
      border-color: var(--icon-outline-color);

      /* Show the indicator (dot/circle) when checked */
      &:after {
        background: var(--icon-outline-color);
      }
    }

    &:hover .wt-radio__checkmark:after {
      background: var(--icon--active-color);
    }
  }

  .wt-radio--disabled {
    pointer-events: none;

    .wt-radio__label {
      color: var(--form-label--disabled-color);
    }

    .wt-radio__checkmark {
      border-color: var(--icon--disabled-color);

      /* Show the indicator (dot/circle) when checked */
      &:after {
        background: var(--icon--disabled-color);
      }
    }
  }
</style>

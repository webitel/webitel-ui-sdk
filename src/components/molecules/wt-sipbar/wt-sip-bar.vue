<template>
  <div
    class="wt-sip-bar"
    :class="{ 'wt-sip-bar--disabled': disabled }"
    :style="{ width: verticalHeight }"
  >
    <div
      class="slider-container"
      :class="{ 'wt-sip-bar__slider--vertical': vertical }"
    >
      <input type="range"
             class="wt-sip-bar__slider"
             :style="{ background: `linear-gradient(to right, var(--accent-color) ${this.percentValue}%, var(--secondary-color) 0%)` }"
             :min="min"
             :max="max"
             :step="step"
             :value="value"
             :disabled="disabled"
             @input="changeHandler"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'wt-sip-bar',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    height: {
      type: String,
      default: '',
    },
  },
  computed: {
    percentValue() {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },
    verticalHeight() {
      return this.vertical ? this.height : '100%';
    },
  },
  methods: {
    changeHandler(event) {
      const value = +event.target.value;
      this.$emit('change', value);
    },
  },
};
</script>

<style scoped lang="scss">

.wt-sip-bar {
  position: relative;
}

.slider-container {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.wt-sip-bar__slider {
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;
  width: 100%;
  height: 8px;
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid var(--secondary-color);
    border-radius: 50%;
    background: var(--main-color);
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
  }

  &::-moz-range-thumb {
    -moz-appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid var(--secondary-color);
    border-radius: 50%;
    background: var(--main-color);
  }

  &::-moz-range-track {
    -moz-appearance: none;
  }

  &::-ms-thumb {
    appearance: none;
  }

  &::-ms-track {
    appearance: none;
  }
}

.wt-sip-bar--disabled {
  .wt-sip-bar__slider {
    pointer-events: none;

    &::-webkit-slider-thumb {
      opacity: 0;
    }

    &::-moz-range-thumb {
      opacity: 0;
    }
  }
}

.wt-sip-bar__slider--vertical {
  transform: translate(-100%, -50%) rotate(-90deg);
  transform-origin: 100%;
}

</style>

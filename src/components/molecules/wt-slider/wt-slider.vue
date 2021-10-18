<template>
  <div
    class="wt-slider"
    :class="{
    'wt-slider--disabled': disabled,
    'wt-slider--vertical': vertical,
    }"
    :style="{ width: verticalHeight }"
  > <!-- The row above is needed in order to set correct component width when slider is vertical -->
    <input
      type="range"
      class="wt-slider__slider"
      :style="{ background: progressStyle }"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      :disabled="disabled"
      @input="inputHandler"
    />
  </div>
</template>

<script>
export default {
  name: 'wt-slider',
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
    // Height of vertical slider (px):
    height: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    progressStyle() { // To achieve the correct color styling:
      const progressPercent = ((this.value - this.min) / (this.max - this.min)) * 100;
      return `linear-gradient(to right, var(--accent-color) ${progressPercent}%, var(--secondary-color) 0%)`;
    },
    verticalHeight() { // in order to have correct parent height after slider rotation
      return this.vertical ? `${this.height}px` : '100%';
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit('input', +event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>

.wt-slider {
  width: var(--wt-slider-width)
}

.wt-slider__slider {
  box-sizing: var(--wt-slider-box-sizing);
  width: var(--wt-slider-width);
  height: var(--wt-slider-height);
  border: var(--wt-slider-border);
  border-radius: var(--border-radius);
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;

  &::-webkit-slider-thumb {
    width: var(--wt-slider-pointer-size);
    height: var(--wt-slider-pointer-size);
    border: var(--wt-slider-border);
    border-radius: var(--wt-slider-pointer-radius);
    background: var(--main-color);
    -webkit-appearance: none;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
  }

  &::-moz-range-thumb {
    width: var(--wt-slider-pointer-size);
    height: var(--wt-slider-pointer-size);
    border: var(--wt-slider-border);
    border-radius: var(--wt-slider-pointer-radius);
    background: var(--main-color);
    -moz-appearance: none;
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

.wt-slider--disabled {
  .wt-slider__slider {
    pointer-events: none;

    &::-webkit-slider-thumb {
      display: none;
    }

    &::-moz-range-thumb {
      display: none;
    }
  }
}

.wt-slider--vertical {
  transform: var(--wt-slider-vertical-transform);
  transform-origin: var(--wt-slider-vertical-transform-origin);
}

</style>

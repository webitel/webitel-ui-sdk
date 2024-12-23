<!-- We were trying to draw our own slider using <div> tags, but realizing all the limitations decided to use
the native input of type 'range', styling it as per Webitel needs for every of the most popular web browsers.

The biggest issue to solve was the vertical input. At the moment browsers do not support vertical input range having
custom styling, so we are using css rotation.
Dealing with rotation we realized rotated element is very hard to position correctly with no fixed height of the parent element.
Considering the fact parent height is always relative to it's childs height, we are manipulating the child width/height on rotation.
To achieve correct slider height we:
 1. Rotate slider by 90deg, so the width of slider becomes 'heigth' of the parent.
 2. Set the new slider width (which is now positioned from bottom to top) using fixed number of pixels, received with props.
 3. Set the container element height to 100% so it is always calculated correctly depending on it`s child dimensions.

Until there are no possibility to style input range and position it vertically, we are rotating our slider with css
and swapping height/width of this component in order to have the correct output.
-->

<template>
  <div
    :class="{
      'wt-slider--disabled': disabled,
      'wt-slider--vertical': vertical,
    }"
    :style="{ height: vertical && verticalHeight }"
    class="wt-slider"
  >
    <div
      :style="{ width: vertical && verticalHeight }"
      class="wt-slider__wrapper"
    >
      <!-- The row above is needed in order to set correct component width when slider is vertical -->
      <input
        :disabled="disabled"
        :max="max"
        :min="min"
        :step="step"
        :style="{ background: progressStyle }"
        :value="value"
        class="wt-slider__slider"
        type="range"
        @input="inputHandler"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WtSlider',
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
  emits: ['input'],
  computed: {
    progressStyle() {
      // To achieve the correct color styling:
      const progressPercent =
        ((this.value - this.min) / (this.max - this.min)) * 100;
      return `linear-gradient(to right, var(--wt-slider-background-completed-color) ${progressPercent}%, var(--wt-slider-background-color) 0%)`;
    },
    verticalHeight() {
      // in order to have correct parent height after slider rotation
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

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-slider__wrapper {
  display: flex;
  align-items: center;
  width: var(--wt-slider-width);
  height: var(--wt-slider-height);
}

.wt-slider__slider {
  box-sizing: border-box;
  width: var(--wt-slider-width);
  height: var(--wt-slider-input-height);
  margin: 0;
  cursor: pointer;
  border: var(--wt-slider-border);
  border-radius: var(--border-radius);
  -webkit-appearance: none;
  -moz-appearance: none;

  &::-webkit-slider-thumb {
    width: var(--wt-slider-pointer-size);
    height: var(--wt-slider-pointer-size);
    transition: var(--transition);
    border: var(--wt-slider-border);
    border-radius: var(--wt-slider-pointer-radius);
    background: var(--wt-slider-pointer-background-color);
    -webkit-appearance: none;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
  }

  &::-moz-range-thumb {
    width: var(--wt-slider-pointer-size);
    height: var(--wt-slider-pointer-size);
    transition: var(--transition);
    border: var(--wt-slider-border);
    border-color: var(--wt-slider-pointer-border-color);
    border-radius: var(--wt-slider-pointer-radius);
    background: var(--wt-slider-pointer-background-color);
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

.wt-slider:hover {
  .wt-slider__slider {
    &::-webkit-slider-thumb {
      background: var(--wt-slider-pointer-background-hover-color);
    }

    &::-moz-range-thumb {
      background: var(--wt-slider-pointer-background-hover-color);
    }
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
  width: var(--wt-slider-height);
  transform: var(--wt-slider-vertical-container-translation);

  .wt-slider__wrapper {
    transform: var(--wt-slider-vertical-transform);
    transform-origin: var(--wt-slider-vertical-transform-origin);
  }
}
</style>

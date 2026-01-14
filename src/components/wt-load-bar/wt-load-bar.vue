<template>
  <div
    :class="['wt-load-bar',
    `wt-load-bar--color-${color}`]">
    <span
      :style="`width: ${progressWidth}%;`"
      class="wt-load-bar__progress"
    />
  </div>
</template>

<script>
import { IconColor } from '../../enums';

export default {
	name: 'WtLoadBar',
	props: {
		/**
		 * Max load bar value
		 * @type {number | string}
		 * @default 100
		 */
		max: {
			type: [
				Number,
				String,
			],
			default: 100,
		},
		/**
		 * Current load bar value
		 * @type {number | string}
		 * @default 0
		 */
		value: {
			type: [
				Number,
				String,
			],
			default: 0,
		},
		/**
		 * Load bar color
		 * @type {string}
		 * @default IconColor.PRIMARY
		 */
		color: {
			type: String,
			default: IconColor.PRIMARY,
			validator: (value) =>
				[
					IconColor.PRIMARY,
					IconColor.ERROR,
					IconColor.WARNING,
					IconColor.SUCCESS,
					IconColor.INFO,
				].includes(value),
		},
	},
	computed: {
		progress() {
			return (this.value * 100) / this.max;
		},
		progressWidth() {
			return this.isOverflow ? 100 : this.progress;
		},
	},
};
</script>

<style scoped>
.wt-load-bar {
  position: relative;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: var(--border-radius);
  padding: var(--load-bar-padding);
  width: 100%;
  line-height: 0;
}

.wt-load-bar--color-primary {
  border-color: var(--wt-load-bar-primary-color);
}

.wt-load-bar--color-primary .wt-load-bar__progress {
  background: var(--wt-load-bar-primary-color);
}

.wt-load-bar--color-error {
  border-color: var(--wt-load-bar-error-color);
}

.wt-load-bar--color-error .wt-load-bar__progress {
  background: var(--wt-load-bar-error-color);
}

.wt-load-bar--color-warning {
  border-color: var(--wt-load-bar-warning-color);
}

.wt-load-bar--color-warning .wt-load-bar__progress {
  background: var(--wt-load-bar-warning-color);
}

.wt-load-bar--color-success {
  border-color: var(--wt-load-bar-success-color);
}

.wt-load-bar--color-success .wt-load-bar__progress {
  background: var(--wt-load-bar-success-color);
}

.wt-load-bar--color-info {
  border-color: var(--wt-load-bar-info-color);
}

.wt-load-bar--color-info .wt-load-bar__progress {
  background: var(--wt-load-bar-info-color);
}

.wt-load-bar__progress {
  display: inline-block;
  transition: var(--transition);
  will-change: width;
  border-radius: var(--load-bar-border-radius);
  height: var(--load-bar-height);
}
</style>

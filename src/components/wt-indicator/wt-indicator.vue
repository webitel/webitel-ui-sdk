<template>
  <div :class="[`wt-indicator--size-${size}`]" class="wt-indicator typo-body-1">
    <span :class="[`wt-indicator__indicator--${color}`]" class="wt-indicator__indicator" />
    <div v-if="isText" :class="size === 'sm' ? 'typo-caption' : 'typo-body-1'" class="wt-indicator__text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
	name: 'WtIndicator',
	props: {
		/**
		 * The color variant for the component
		 * @values 'primary', 'secondary', 'disabled', 'success', 'error', 'transfer', 'break-out', 'info', 'final-status', 'other-status', 'initial-status'
		 * @example '<wt-indicator color="primary"></wt-indicator>'
		 */
		color: {
			type: String,
			default: 'secondary',
			options: [
				'primary',
				'secondary',
				'disabled',
				'success',
				'error',
				'transfer',
				'break-out',
				'info',
				'final-status',
				'other-status',
				'initial-status',
			],
		},
		/**
		 * The text content for the component
		 * Can be a string or a number
		 * @example '<wt-indicator text="Sample Text"></wt-indicator>'
		 */
		text: {
			type: [String, Number],
		},
		/**
		 * The size of the component
		 * @values 'sm', 'md'
		 * @default 'md'
		 * @example '<wt-indicator size="sm"></wt-indicator>'
		 */
		size: {
			type: String,
			default: 'md',
			options: ['sm', 'md'],
		},
	},

	computed: {
		isText() {
			return this.text !== undefined && this.text !== null && this.text !== '';
		},
	},
};
</script>

<style scoped>
.wt-indicator {
  display: flex;
  align-items: center;
}

.wt-indicator__text {
  margin-left: var(--wt-indicator-text-margin);
  color: var(--wt-indicator-text-color);
}

.wt-indicator__indicator {
  margin: var(--wt-indicator-dot-offset);
  border-radius: 50%;
  background: var(--wt-indicator-disabled-color);
  min-width: var(--wt-indicator-dot-size);
  height: var(--wt-indicator-dot-size);
}

.wt-indicator__indicator--primary {
  background: var(--wt-indicator-primary-color);
}

.wt-indicator__indicator--secondary {
  background: var(--wt-indicator-secondary-color);
}

.wt-indicator__indicator--disabled {
  background: var(--wt-indicator-disabled-color);
}

.wt-indicator__indicator--success {
  background: var(--wt-indicator-success-color);
}

.wt-indicator__indicator--error {
  background: var(--wt-indicator-error-color);
}

.wt-indicator__indicator--transfer {
  background: var(--wt-indicator-transfer-color);
}

.wt-indicator__indicator--break-out {
  background: var(--wt-indicator-break-out-color);
}

.wt-indicator__indicator--info {
  background: var(--wt-indicator-info-color);
}

.wt-indicator__indicator--final-status {
  background: var(--wt-indicator-final-status-color);
}

.wt-indicator__indicator--other-status {
  background: var(--wt-indicator-other-status-color);
}

.wt-indicator__indicator--initial-status {
  background: var(--wt-indicator-initial-status-color);
}

.wt-indicator--size-sm .wt-indicator__indicator {
  min-width: var(--wt-indicator-dot-size--size-sm);
  height: var(--wt-indicator-dot-size--size-sm);
}

.wt-indicator--size-md .wt-indicator__indicator {
  min-width: var(--wt-indicator-dot-size--size-md);
  height: var(--wt-indicator-dot-size--size-md);
}
</style>

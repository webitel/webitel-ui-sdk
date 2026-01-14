<template>
  <footer class="wt-pagination typo-body-1">
    <div class="wt-pagination__size">
      <div class="wt-pagination__size-text">
        {{ $t('webitelUI.pagination.sizeText') }}
      </div>
      <wt-input
        :number-max="1000"
        :number-min="1"
        :value="size"
        class="wt-pagination__size-input"
        type="number"
        @input="inputHandler"
      />
    </div>
    <div class="wt-pagination__page-controls">
      <wt-icon-btn
        v-tooltip="$t('webitelUI.pagination.prev')"
        :disabled="!prev"
        class="wt-pagination__page-control"
        icon="arrow-left"
        @click="goPrev"
      />

      <wt-icon-btn
        v-tooltip="$t('webitelUI.pagination.next')"
        :disabled="!next"
        class="wt-pagination__page-control"
        icon="arrow-right"
        @click="goNext"
      />
    </div>
  </footer>
</template>

<script>
import debounce from '../../scripts/debounce.js';

export default {
	name: 'WtPagination',
	model: {
		prop: 'size',
		event: 'change',
	},
	/**
	 * @emits {string | number} change - Fires when size changes. The same as input, but if "debounce" is true, event is debounced
	 * @emits {string | number} input - Fires when size changes. SIZE CHANGE IS DEBOUNCED
	 * @emits {void} next - Event is triggered on "next" arrow click
	 * @emits {void} prev - Event is triggered on "prev" arrow click
	 */
	props: {
		/**
		 * SIZE CHANGE IS DEBOUNCED
		 * @type {string | number}
		 * @model size
		 */
		size: {
			type: [
				String,
				Number,
			],
		},
		/**
		 * Is false, disables paging arrow
		 * @type {boolean}
		 * @default false
		 */
		next: {
			type: Boolean,
			default: false,
		},
		/**
		 * Is false, disables paging arrow
		 * @type {boolean}
		 * @default false
		 */
		prev: {
			type: Boolean,
			default: false,
		},
		/**
		 * If true, @change event is delayed for debounceDelay from last change
		 * @type {boolean}
		 * @default false
		 */
		debounce: {
			type: Boolean,
			default: false,
		},
		/**
		 * Debounce delay in milliseconds
		 * @type {number}
		 * @default 1000
		 */
		debounceDelay: {
			type: Number,
			default: 1000,
		},
	},
	emits: [
		'change',
		'input',
		'prev',
		'next',
	],

	data: () => ({
		defaultSize: '10',
	}),

	watch: {
		size(value) {
			this.changeSize(value);
		},
	},

	created() {
		if (this.debounce)
			this.changeSize = debounce(this.changeSize, this.debounceDelay);
	},

	methods: {
		inputHandler(value) {
			const size = value >= 0 && value <= 1000 ? value : this.defaultSize;
			this.$emit('input', size);
			this.changeSize(size);
		},
		changeSize(value) {
			this.$emit('change', value);
		},
		goNext() {
			this.$emit('next');
		},
		goPrev() {
			this.$emit('prev');
		},
	},
};
</script>

<style  scoped>
.wt-pagination {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
}

.wt-pagination__size {
display: flex;
  align-items: center;
  margin-right: var(--pagination-gap);
}

.wt-pagination__size-text {
margin-right: var(--pagination-gap);
}

.wt-pagination__size-input {
width: var(--pagination-size-input-width);
}

.wt-pagination__page-controls {
display: flex;
  align-items: center;
}

.wt-pagination__page-control {
margin-left: var(--pagination-gap);
}

.wt-pagination__page-control .wt-pagination:first-child {
margin-left: 0;
}
</style>

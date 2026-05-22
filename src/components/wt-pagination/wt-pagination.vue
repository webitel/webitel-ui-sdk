<template>
  <footer class="wt-pagination typo-body-1">
    <div class="wt-pagination__size">
      <div class="wt-pagination__size-text">
        {{ $t('webitelUI.pagination.sizeText') }}
      </div>
      <wt-input-number
        :max="1000"
        :min="1"
        :model-value="internalSize"
        class="wt-pagination__size-input"
        @update:model-value="inputHandler"
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

const DEFAULT_SIZE = 10;

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

	data() {
		return {
			internalSize: this.size != null ? +this.size : DEFAULT_SIZE,
		};
	},

	watch: {
		internalSize(value) {
			if (value === null) return;
			this.changeSize(value);
		},
		size(value) {
			this.internalSize = value != null ? +value : DEFAULT_SIZE;
		},
	},

	created() {
		if (this.debounce)
			this.changeSize = debounce(this.changeSize, this.debounceDelay);
	},

	methods: {
		inputHandler(value) {
			if (value === null) {
				// @author r.zaritskyi
				// https://github.com/webitel/webitel-ui-sdk/pull/1283#issue-4194972887
				// If internalSize is already DEFAULT_SIZE, Vuex won't detect a change,
				// Vue won't re-render wt-input-number, and the field stays empty.
				// Setting null first forces a DOM update; nextTick restores the value.
				this.internalSize = null;
				this.$nextTick(() => {
					this.internalSize = DEFAULT_SIZE;
					this.$emit('input', DEFAULT_SIZE);
				});
				return;
			}
			const size = value >= 0 && value <= 1000 ? value : DEFAULT_SIZE;
			this.internalSize = size;
			this.$emit('input', size);
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

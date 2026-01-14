<template>
  <div class="wt-table-column-select">
    <wt-icon-btn
      v-tooltip="$t('webitelUI.tableColumnSelect.title')"
      icon="column-select"
      @click="openPopup"
    />

    <wt-popup
      :shown="isColumnSelectPopup"
      class="wt-table-column-select__popup"
      @close="close"
    >
      <template #title>
        {{ $t('webitelUI.tableColumnSelect.title') }}
      </template>
      <template #main>
        <div class="wt-table-column-select__popup-list-wrap">
          <ul
            :class="{
              'wt-table-column-select__popup-list--md':
                changeableDraft.length > 10 && changeableDraft.length <= 20,
              'wt-table-column-select__popup-list--lg':
                changeableDraft.length > 20,
            }"
            class="wt-table-column-select__popup-list"
          >
            <li
              v-for="(column, key) of changeableDraft"
              :key="key"
              class="wt-table-column-select__popup-item"
              @click.capture.prevent="column.show = !column.show"
            >
              <wt-checkbox
                :label="shownColLabel(column)"
                :selected="column.show"
                @update:selected="column.show = $event"
              />
            </li>
          </ul>
        </div>
      </template>
      <template #actions>
        <wt-button @click="setShownColumns">
          {{ $t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >
          {{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script>
import deepCopy from 'deep-copy';

export default {
	name: 'WtTableColumnSelect',

	model: {
		prop: 'headers',
		event: 'change',
	},
	/**
	 * @emits {Array} change - Fires when headers are changed. Emits mutated headers
	 */
	props: {
		/**
		 * Each header should have following schema: { value: String, show: Boolean, text: String }
		 * @type {Array}
		 * @required
		 * @model headers
		 */
		headers: {
			type: Array,
			required: true,
			description:
				'Each header should have following schema: { value: String, show: Boolean, text: String }',
		},
		/**
		 * Header values to exclude from selection
		 * @type {Array}
		 * @default []
		 */
		staticHeaders: {
			type: Array,
			default: () => [],
			description: 'Header values to exclude from selection',
		},
	},
	emits: [
		'change',
	],
	data: () => ({
		draft: [], // headers draft
		isColumnSelectPopup: false,
	}),
	computed: {
		changeableDraft() {
			return this.draft
				.filter((header) => !this.staticHeaders.includes(header.value))
				.sort((a, b) => {
					return this.shownColLabel(a)?.localeCompare(this.shownColLabel(b));
					// sorting headers for alphabet just in popup
				});
		},
	},

	watch: {
		isColumnSelectPopup: {
			handler() {
				this.fillHeadersDraft();
			},
		},
	},
	methods: {
		shownColLabel({ text, locale }) {
			if (!text && locale)
				return typeof locale === 'string'
					? this.$t(locale)
					: this.$t(...locale);
			return text;
		},
		openPopup() {
			this.isColumnSelectPopup = true;
		},
		close() {
			this.isColumnSelectPopup = false;
		},
		fillHeadersDraft() {
			this.draft = deepCopy(this.headers);
		},
		setShownColumns() {
			this.$emit('change', this.draft);
			this.close();
		},
	},
};
</script>

<style scoped>
.wt-table-column-select {
  line-height: 0; /* prevent 24x28 icon height :/ */
  text-align: center;
}

.wt-table-column-select__popup-list-wrap {
  max-height: 400px;
}

.wt-table-column-select__popup-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: calc(500px - var(--spacing-xl)); /* all popup width - (paddings + overflow-padding) */
  max-height: 400px;
  overflow-x: hidden;
}

/* for 10-30 items */
.wt-table-column-select__popup-list--md {
  display: block;
  column-count: 2;
  width: calc(800px - var(--spacing-xl)); /* all popup width - (paddings + overflow-padding) */
}

/* for 30+ items */
.wt-table-column-select__popup-list--lg {
  display: block;
  column-count: 3;
  width: calc(800px - var(--spacing-xl)); /* all popup width - (paddings + overflow-padding) */
  max-height: none;
  overflow-y: auto;
}

.wt-table-column-select__popup-item {
  display: flex;
  align-items: center;
  margin-right: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}
</style>

<template>
  <div class="wt-table-column-select">
    <wt-tooltip>
      <template #activator>
        <wt-icon-btn
          icon="column-select"
          @click="openPopup"
        />
      </template>
      {{ $t('webitelUI.tableColumnSelect.title') }}
    </wt-tooltip>
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
                @change="column.show = $event"
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
  props: {
    headers: {
      type: Array,
      required: true,
      description:
        'Each header should have following schema: { value: String, show: Boolean, text: String }',
    },
    staticHeaders: {
      type: Array,
      default: () => [],
      description: 'Header values to exclude from selection',
    },
  },
  emits: ['change'],
  data: () => ({
    draft: [], // headers draft
    isColumnSelectPopup: false,
  }),
  computed: {
    changeableDraft() {
      return this.draft
        .filter((header) => !this.staticHeaders.includes(header.value))
        .sort((a, b) => {
          return this.shownColLabel(a).localeCompare(this.shownColLabel(b));
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
      if (!text && locale) {
        return typeof locale === 'string'
          ? this.$t(locale)
          : this.$t(...locale);
      }
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

<style lang="scss" scoped>
@use '../../css/main.scss';

$list-height: 400px;
$list-width-sm: calc(
  500px - var(--spacing-xl)
); // all popup width - (paddings + overflow-padding)
$list-width-md: calc(
  800px - var(--spacing-xl)
); // all popup width - (paddings + overflow-padding)

.wt-table-column-select {
  line-height: 0; // prevent 24x28 icon height :/
}

.wt-table-column-select {
  &__heading {
    text-align: center;
  }

  &__popup-list-wrap {
    max-height: $list-height;
  }

  &__popup-list {
    @extend %wt-scrollbar;
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    flex-wrap: wrap;
    width: $list-width-sm;
    max-height: $list-height;

    // for 10-30 items
    &--md {
      display: block;
      width: $list-width-md;
      column-count: 2;
    }

    // for 30+ items
    &--lg {
      display: block;
      overflow-y: auto;
      width: $list-width-md;
      max-height: none;
      column-count: 3;
    }
  }

  &__popup-item {
    display: flex;
    align-items: center;
    margin-right: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }
}
</style>

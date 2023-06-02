<template>
  <div class="wt-table-column-select">
    <wt-tooltip>
      <template v-slot:activator>
        <wt-icon-btn
          icon="column-select"
          @click="openPopup"
        ></wt-icon-btn>
      </template>
      {{ $t('webitelUI.tableColumnSelect.title') }}
    </wt-tooltip>
    <wt-popup
      v-if="isColumnSelectPopup"
      class="wt-table-column-select__popup"
      @close="close"
    >
      <template v-slot:title>
        {{ $t('webitelUI.tableColumnSelect.title') }}
      </template>
      <template v-slot:main>
        <div class="wt-table-column-select__popup-list-wrap">
          <ul
            class="wt-table-column-select__popup-list"
            :class="{
            'wt-table-column-select__popup-list--sm': changeableDraft.length > 20,
            'wt-table-column-select__popup-list--md': changeableDraft.length > 30
            }"
          >
            <li
              v-for="(column, key) of changeableDraft"
              :key="key"
              class="wt-table-column-select__popup-item"
              @click.capture.prevent="column.show = !column.show"
            >
              <wt-checkbox
                v-model="column.show"
                :label="shownColLabel(column)"
              ></wt-checkbox>
            </li>
          </ul>
        </div>
      </template>
      <template v-slot:actions>
        <wt-button
          @click="setShownColumns"
        >{{ $t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >{{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script>
import deepCopy from 'deep-copy';

export default {
  name: 'wt-table-column-select',
  props: {
    headers: {
      type: Array,
      required: true,
      description: 'Each header should have following schema: { value: String, show: Boolean, text: String }',
    },
    staticHeaders: {
      type: Array,
      default: () => [],
      description: 'Header values to exclude from selection',
    },
    popupWidth: {
      type: [Number, String],
    },
  },

  model: {
    prop: 'headers',
    event: 'change',
  },

  data: () => ({
    draft: [], // headers draft
    isColumnSelectPopup: false,
  }),

  watch: {
    isColumnSelectPopup: {
      handler() {
        this.fillHeadersDraft();
      },
    },
  },
  computed: {
    changeableDraft() {
      return this.draft.filter((header) => !this.staticHeaders.includes(header.value)).sort((a, b) => {
        return a.text > b.text ? 1 : -1;
        // sorting headers for alphabet just in popup
      });
    },
  },
  methods: {
    shownColLabel({ text, locale }) {
      if (!text && locale) {
        return typeof locale === 'string' ? this.$t(locale) : this.$t(...locale);
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
$list-height: 400px;
$list-width-sm: calc(500px - var(--spacing-xl)); // all popup width - (paddings + overflow-padding)
$list-width-md: calc(800px - var(--spacing-xl)); // all popup width - (paddings + overflow-padding)

.wt-table-column-select {
  line-height: 0; // prevent 24x28 icon height :/
}
.wt-table-column-select {
  &__heading {
    text-align: center;
  }

  &__popup-list-wrap {
    max-height: $list-height; // fixme popup fixed sizes
  }

  &__popup-list {
    @extend %wt-scrollbar;
    max-height: $list-height;
    width: $list-width-sm;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow-x: hidden;

    // for 20-30 items
    &--sm {
      width: $list-width-md;
    }

    // for 30+ items
    &--md {
      max-height: none;
      display: block;
      -webkit-column-count: 3; // Chrome, Safari, Opera
      -moz-column-count: 3; // Firefox
      column-count: 3;
      overflow-y: auto;
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


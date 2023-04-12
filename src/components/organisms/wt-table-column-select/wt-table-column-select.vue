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
        <ul class="wt-table-column-select__popup__list">
          <li
            v-for="(col, key) of changeableDraft"
            :key="key"
            class="wt-table-column-select__popup__item"
            @click.capture.prevent="col.show = !col.show"
          >
            <wt-checkbox
              v-model="col.show"
              :label="shownColLabel(col)"
            ></wt-checkbox>
          </li>
        </ul>
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
      return this.draft.filter((header) => !this.staticHeaders.includes(header.value));
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
.wt-table-column-select {
  line-height: 0; // prevent 24x28 icon heght :/
}

.wt-table-column-select__popup__list {
  @extend %wt-scrollbar;
  overflow: auto;
  width: 550px; // fixme popup fixed sizes
  max-height: 35vh; // fixme popup fixed sizes
}

.wt-table-column-select__popup__item {
  margin-bottom: var(--spacing-xs);
}
</style>

<template>
  <div class="wt-table-column-select">
    <wt-icon-btn
      icon="column-select"
      :tooltip="$t('webitelUI.tableColumnSelect.title')"
      @click="openPopup"
    ></wt-icon-btn>
    <wt-popup
      v-if="isColumnSelectPopup"
      class="wt-table-column-select__popup"
      @close="close"
    >
      <template slot="title">
        {{ $t('webitelUI.tableColumnSelect.title') }}
      </template>
      <template slot="main">
        <ul class="wt-table-column-select__popup__list">
          <li
            class="wt-table-column-select__popup__item"
            v-for="(col, key) of changeableDraft"
            :key="key"
            @click.capture.prevent="col.show = !col.show"
          >
            <wt-checkbox v-model="col.show" :label="col.text"/>
          </li>
        </ul>
      </template>
      <template slot="actions">
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
    headers: {
      handler() {
        this.fillHeadersDraft();
      },
      immediate: true,
    },
  },
  computed: {
    changeableDraft() {
      return this.draft.filter((header) => !this.staticHeaders.includes(header.value));
    },
  },
  methods: {
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
.wt-table-column-select__popup__list {
  @extend %wt-scrollbar;
  max-height: 35vh; // fixme popup fixed sizes
  width: 550px; // fixme popup fixed sizes
  overflow: auto;
}

.wt-table-column-select__popup__item {
  margin-bottom: var(--component-spacing);
}
</style>

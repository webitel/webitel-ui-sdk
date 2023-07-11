<template>
  <footer class="wt-pagination">
    <div class="wt-pagination__size">
      <div class="wt-pagination__size-text">{{ $t('webitelUI.pagination.sizeText') }}</div>
      <wt-input
        :number-max="1000"
        :number-min="1"
        :value="size"
        class="wt-pagination__size-input"
        type="number"
        @input="inputHandler"
      ></wt-input>
    </div>
    <div class="wt-pagination__page-controls">
      <wt-tooltip>
        <template v-slot:activator>
          <wt-icon-btn
            :disabled="!prev"
            class="wt-pagination__page-control"
            icon="arrow-left"
            @click="goPrev"
          ></wt-icon-btn>
        </template>
        {{ $t('webitelUI.pagination.prev') }}
      </wt-tooltip>
      <wt-tooltip>
        <template v-slot:activator>
          <wt-icon-btn
            :disabled="!next"
            class="wt-pagination__page-control"
            icon="arrow-right"
            @click="goNext"
          ></wt-icon-btn>
        </template>
        {{ $t('webitelUI.pagination.next') }}
      </wt-tooltip>
    </div>
  </footer>
</template>

<script>
import debounce from '../../../scripts/debounce';

export default {
  name: 'wt-pagination',
  props: {
    size: {
      type: [String, Number],
    },
    next: {
      type: Boolean,
      default: false,
    },
    prev: {
      type: Boolean,
      default: false,
    },
    debounce: {
      type: Boolean,
      default: false,
    },
    debounceDelay: {
      type: Number,
      default: 1000,
    },
  },
  emits: ['change', 'input', 'prev', 'next'],
  model: {
    prop: 'size',
    event: 'change',
  },

  watch: {
    size(value) {
      this.changeSize(value);
    },
  },

  data: () => ({
    defaultSize: '10',
  }),

  created() {
    if (this.debounce) this.changeSize = debounce(this.changeSize, this.debounceDelay);
  },

  methods: {
    inputHandler(value) {
      const size = (value >= 0 && value <= 1000)
        ? value
        : this.defaultSize;
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

<style lang="scss" scoped>
.wt-pagination {
  @extend %typo-body-1;

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

  &:first-child {
    margin-left: 0;
  }
}
</style>

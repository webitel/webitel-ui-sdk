<template>
  <footer class="wt-pagination">
    <div class="wt-pagination__size">
      <div class="wt-pagination__size-text">{{ $t('webitelUI.pagination.sizeText') }}</div>
      <wt-input
        class="wt-pagination__size-input"
        :value="size"
        type="number"
        :number-min="1"
        :number-max="1000"
        @input="inputHandler"
      ></wt-input>
    </div>
    <div class="wt-pagination__page-controls">
      <wt-icon-btn
        class="wt-pagination__page-control"
        :icon="'arrow-left'"
        :tooltip="$t('webitelUI.pagination.prev')"
        :disabled="!prev"
        @click.native="goPrev"
      ></wt-icon-btn>
      <wt-icon-btn
        class="wt-pagination__page-control"
        :icon="'arrow-right'"
        :tooltip="$t('webitelUI.pagination.next')"
        :disabled="!next"
        @click.native="goNext"
      ></wt-icon-btn>
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
      required: true,
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
  model: {
    prop: 'size',
    event: 'change',
  },

  watch: {
    value() {
      this.inputHandler.call(this);
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
      const size = (value > 0 && value <= 1000)
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
  @extend %typo-body-md;

  display: inline-flex;
  align-items: center;
  margin-left: auto;
}

.wt-pagination__size {
  display: flex;
  align-items: center;
  margin-right: var(--pagination-margin-right);
}

.wt-pagination__size-text {
  margin-right: var(--pagination-size-text-margin-right);
}

.wt-pagination__size-input {
  width: var(--pagination-size-input-width);
}

.wt-pagination__page-controls {
  display: flex;
  align-items: center;
}

.wt-pagination__page-control {
  margin-left: var(--pagination-page-controls-margin);

  &:first-child {
    margin-left: 0;
  }
}
</style>

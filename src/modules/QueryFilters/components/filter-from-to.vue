<template>
  <div class="filter-from-to">
    <wt-label>{{ label }}</wt-label>
    <div class="filter-from-to__inputs-wrapper">
      <div class="filter-from-to__input-wrapper">
        <wt-label
          class="filter-from-to__input-label"
          for="filter-from-to-from"
        >
          {{ $t('reusable.from') }}
        </wt-label>
        <wt-input
          class="filter-from-to-input"
          name="filter-from-to-from"
          :value="filterSchema.value.from"
          type="number"
          :number-min="0"
          :number-max="numberMax"
          @input="setFrom"
        />
      </div>
      <div class="filter-from-to__input-wrapper">
        <wt-label
          class="filter-from-to__input-label"
          for="filter-from-to-to"
        >
          {{ $t('reusable.to') }}
        </wt-label>
        <wt-input
          class="filter-from-to-input"
          name="filter-from-to-to"
          :value="filterSchema.value.to"
          type="number"
          :number-min="0"
          :number-max="numberMax"
          @input="setTo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from '../../../scripts/debounce';
import baseFilterMixin from '../mixins/baseFilterMixin/baseFilterMixin';

export default {
  name: 'FilterFromTo',
  mixins: [baseFilterMixin],
  props: {
    filterQuery: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    numberMax: {
      type: Number,
    },
  },

  created() {
    this.setFrom = debounce(this.setFrom);
    this.setTo = debounce(this.setTo);
  },
  methods: {
    restore() {
      this.restoreFrom();
      this.restoreTo();
    },

    restoreFrom() {
      const from = 0;
      const queryValue = this.$route.query[`${this.filterQuery}From`];
      // this.value.from = +queryValue || from;
      const value = { from: +queryValue || from, to: this.value.to };
      return this.setValue({ filter: this.filterQuery, value });
    },

    restoreTo() {
      const to = null;
      const queryValue = this.$route.query[`${this.filterQuery}To`];
      // this.value.to = +queryValue || to;
      const value = { from: this.value.from, to: +queryValue || to };
      return this.setValue({ filter: this.filterQuery, value });
    },

    async setFrom(value) {
      const filterValue = { from: value, to: this.value.to };
      await this.setValue({ filter: this.filterQuery, value: filterValue });
      await this.setValueToQuery({
        filterQuery: `${this.filterQuery}From`,
        value,
      });
    },

    async setTo(value) {
      const filterValue = { from: this.value.from, to: value };
      await this.setValue({ filter: this.filterQuery, value: filterValue });
      await this.setValueToQuery({
        filterQuery: `${this.filterQuery}To`,
        value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-from-to {
  &:hover > .wt-label {
    color: var(--form-label--hover-color);
  }

  &:focus-within > .wt-label {
    color: var(--form-label--active-color);
  }
}

.filter-from-to__inputs-wrapper,
.filter-from-to__input-wrapper {
  display: flex;
  align-items: center;
}

.filter-from-to__input-label {
  @extend %typo-subtitle-1;
  margin-right: 5px;
}

.filter-from-to__input-wrapper {
  &:focus-within .wt-label {
    color: var(--form-label--active-color)
  }

  .filter-from-to-input {
    width: 70px;
  }

  &:first-child {
    margin-right: 10px;
  }
}
</style>

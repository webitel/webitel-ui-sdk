<template>
  <wt-select
    :clearable="false"
    :options="availableOptions"
    :searchable="false"
    :value="selectedOption"
    class="wt-status-select"
    track-by="value"
    @closed="closedHandler"
    @input="inputHandler"
  >
    <template #singleLabel="{ option }">
      <wt-indicator
        :color="option.color"
        :text="duration"
      />
    </template>
    <template #option="{ option }">
      <wt-indicator
        :color="option.color"
        :text="option.text"
      />
    </template>
  </wt-select>
</template>

<script>
import AgentStatus from '../../enums/AgentStatus/AgentStatus.enum.js';
import convertDuration from '../../scripts/convertDuration.js';
import StatusOptions from './_internals/StatusOptions.lookup.js';

export default {
  name: 'WtStatusSelect',
  model: {
    prop: 'status',
    event: 'change',
  },
  props: {
    status: {
      type: String,
      default: AgentStatus.OFFLINE,
    },
    statusDuration: {
      type: [String, Number],
      default: 0,
    },
    options: {
      type: Array,
    },
    // size: {
    //   type: String,
    //   default: 'md',
    //   options: ['sm', 'md'],
    // },
  },
  emits: ['change', 'closed'],
  computed: {
    selectedOption() {
      return this.statusOptions.find((option) => option.value === this.status);
    },
    statusOptions() {
      return this.options
        ? this.options
        : StatusOptions.map((opt) => ({
            ...opt,
            text: this.$t(opt.locale),
          }));
    },
    availableOptions() {
      return this.statusOptions.reduce((options, opt) => {
        // PAUSE option is always passed
        if (
          (this.status === opt.value && opt.value !== AgentStatus.PAUSE) ||
          opt.value === AgentStatus.BREAK_OUT
        ) {
          // skip breakout option
          return options;
        }
        return [...options, opt];
      }, []);
    },
    duration() {
      /* The check commented below limits the display of time in the status to 8 characters.
      Accordingly, if the agent is in the status of 100 hours (100: 00: 00),
      then this time will be displayed as NaN:NaN:NaN */

      // if (typeof this.statusDuration === 'string' && this.statusDuration.length === 8) return this.statusDuration;
      if (typeof this.statusDuration === 'string') return this.statusDuration;
      if (this.statusDuration !== undefined) {
        return convertDuration(this.statusDuration);
      }
      return this.selectedOption.text;
    },
  },
  methods: {
    inputHandler(value) {
      this.$emit('change', value.value);
    },
    closedHandler(event) {
      this.$emit('closed', event);
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-status-select.wt-select {
  box-shadow: var(--elevation-5);

  :deep(.multiselect) {
    min-height: 0;

    .multiselect__tags {
      min-height: 0;
      padding: var(--wt-status-select-padding);
      border: none;
      background: var(--wt-status-select-background-color);
    }

    .multiselect__select {
      top: 0;
      right: 0;
    }

    .multiselect__content-wrapper {
      border: none;
      background: transparent;

      .multiselect__option {
        min-height: 0;
        padding: 0;
        color: var(--wt-status-select-option-text-color);
        background: var(--wt-status-select-option-background-color);
      }

      .multiselect__option--highlight {
        background: var(--wt-status-select-option-background-hover-color);
      }

      .multiselect__option--selected {
        //background: var(--wt-status-select-option-background-selected-color);
      }
    }
  }
}
</style>

<template>
  <wt-select
    class="wt-status-select"
    :value="selectedOption"
    :options="availableOptions"
    track-by="value"
    :clearable="false"
    :searchable="false"
    @input="inputHandler"
  >
    <template v-slot:singleLabel="{ option }">
      <wt-indicator
        :color="option.color"
        :text="duration"
      ></wt-indicator>
    </template>
    <template v-slot:option="{ option }">
      <wt-indicator
        :color="option.color"
        :text="option.text"
      ></wt-indicator>
    </template>
  </wt-select>
</template>

<script>
import AgentStatus from '../../enums/AgentStatus/AgentStatus.enum';
import convertDuration from '../../scripts/convertDuration';
import StatusOptions from './_internals/StatusOptions.lookup';

export default {
  name: 'wt-status-select',
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
  model: {
    prop: 'status',
    event: 'change',
  },
  computed: {
    selectedOption() {
      return this.statusOptions.find((option) => option.value === this.status);
    },
    statusOptions() {
      return this.options ? this.options
        : StatusOptions.map((opt) => ({
          ...opt,
          text: this.$t(opt.locale),
        }));
    },
    availableOptions() {
     return this.statusOptions.reduce((options, opt) => {
       // PAUSE option is always passed
       if ((this.status === opt.value && opt.value !== AgentStatus.PAUSE)
       || opt.value === AgentStatus.BREAK_OUT) { // skip breakout option
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
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-status-select.wt-select {
  box-shadow: var(--elevation-5);

  :deep(.multiselect) {
    min-height: 0;

    .multiselect__tags {
      min-height: 0;
      padding: var(--status-select-padding);
      border: none;
    }

    .multiselect__select {
      top: 0;
      right: 0;
    }

    .multiselect__content-wrapper {
      border: none;

      .multiselect__option {
        min-height: 0;
        padding: 0;
        color: var(--status-select-option-color);
      }

      .multiselect__option--highlight {
        background: var(--status-select-bg--hover-color);
      }
    }
  }
}
</style>
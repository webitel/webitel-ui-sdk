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
    <template slot="singleLabel" slot-scope="{ option }">
      <wt-indicator
        :color="option.color"
        :text="duration"
      ></wt-indicator>
    </template>
    <template slot="option" slot-scope="{ option }">
      <wt-indicator
        :color="option.color"
        :text="option.text"
      ></wt-indicator>
    </template>
  </wt-select>
</template>

<script>
import AgentStatus from '../../../enums/AgentStatus/AgentStatus.enum';
import convertDuration from '../../../scripts/convertDuration';
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

<style lang="scss" scoped>
.wt-select ::v-deep {
  box-shadow: var(--box-shadow);

  .multiselect__tags {
    padding: var(--status-select-select-tags-padding);
    border: none;
  }

  .multiselect__content-wrapper {
    border: none;

    .multiselect__option--highlight {
      color: var(--status-select--hover-color);
      background: var(--status-select-bg--hover-color);
    }
  }
}
</style>

<template>
  <wt-select
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
        :text="option.text"
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

export default {
  name: 'wt-status-select',
  props: {
    status: {
      type: String,
      default: AgentStatus.ONLINE,
    },
  },
  model: {
    prop: 'status',
    event: 'change',
  },
  computed: {
    selectedOption() {
      return this.options.find((option) => option.value === this.status);
    },
    options() {
      return [
        {
          text: this.$t('webitelUI.statusSelect.online'),
          color: 'success',
          value: AgentStatus.ONLINE,
        },
        {
          text: this.$t('webitelUI.statusSelect.pause'),
          color: 'primary',
          value: AgentStatus.PAUSE,
        },
        {
          text: this.$t('webitelUI.statusSelect.offline'),
          color: 'danger',
          value: AgentStatus.OFFLINE,
        },
      ];
    },
    availableOptions() {
      return this.options.filter((option) => option.value !== this.status);
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

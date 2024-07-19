<template>
  <div class="status-select" v-clickaway="closeDropdown">
    <div class="status-select__selected" @click="toggleDropdown(false)"
      :class="{ 'multiselect--active': dropdownOpen }">
      <wt-indicator :color="selectedOption.color" :text="duration" />
      <wt-icon-btn :disabled="disabled" class="multiselect__select multiselect__arrow status-select__arrow open"
        :class="{ 'open': dropdownOpen }" icon="arrow-down" @mousedown.prevent />
    </div>
    <div class="status-select__dropdown" v-if="dropdownOpen">
      <div class="status-select__option" v-for="option in availableOptions" :key="option.id"
        @click="selectOption(option)" :class="option.color">
        <wt-indicator :color="option.color" :text="option.text" />
      </div>
    </div>
  </div>
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
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedOption: this.value,
      dropdownOpen: false,
    };
  },
  watch: {
    value(newValue) {
      this.selectedOption = newValue;
    },
  },
  emits: ['change'],
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
    toggleDropdown(close) {
      close ? this.dropdownOpen = false : this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.toggleDropdown(true)
    },
    selectOption(option) {
      this.selectedOption = option;
      this.$emit('change', option.value);
      this.dropdownOpen = false;
    },

  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-icon-btn.multiselect__select.multiselect__arrow {
  &:before {
    position: absolute;
    display: none;
    opacity: 0;
  }
}

.status-select {
  position: relative;
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-5);
  max-width: 200px;
  width: 150px;

  &__arrow {
    position: absolute;
    top: 0;
    right: 0;
    width: fit-content;
    height: fit-content;
    padding: 0;
    transition: var(--transition);
  }

  &__selected {
    max-width: 200px;
    width: 150px;
    background: var(--wt-status-select-background-color);
    color: var(--wt-text-field-text-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    border: none;
  }

  &__dropdown {
    position: absolute;
    width: 100%;
    background-color: #fff;
    z-index: 10;
    border-radius: var(--border-radius);
    box-shadow: var(--elevation-5);
  }

  &__option {
    padding: 0;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    &:hover {
      background-color: #f0f0f0;
    }
  }
}

:deep(.wt-indicator__text) {
  user-select: none;
}
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

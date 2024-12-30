<template>
  <div
    :class="{'wt-timepicker--invalid': invalid}"
    class="wt-timepicker"
  >
    <wt-label
      v-if="label || !noLabel"
      :invalid="invalid"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <div class="wt-timepicker__wrapper">
      <wt-time-input
        v-if="isHour"
        :disabled="disabled"
        :label="labelHours"
        :max-value="dateMode ? null : 23"
        :v="v"
        :value="hour"
        hide-input-info
        @input="hour = $event"
      />
      <wt-time-input
        v-if="isMin"
        :disabled="disabled"
        :label="labelMin"
        :max-value="59"
        :v="v"
        :value="min"
        hide-input-info
        @input="min = $event"
      />
      <wt-time-input
        v-if="isSec"
        :disabled="disabled"
        :label="labelSec"
        :max-value="59"
        :v="v"
        :value="sec"
        hide-input-info
        @input="sec = $event"
      />
    </div>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >
      {{ validationText }}
    </wt-input-info>
  </div>
</template>

<script>
import validationMixin from '../../mixins/validationMixin/validationMixin.js';

const SEC_IN_HOUR = 60 * 60;
const SEC_IN_MIN = 60;

export default {
  name: 'WtTimepicker',
  mixins: [validationMixin],
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    /**
     * Time value in seconds (not milliseconds!)
     */
    value: {
      type: [String, Number],
      default: 0,
    },
    dateMode: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'hh:mm:ss',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },
    noLabel: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
      description: 'Native input required attribute',
    },
  },

  computed: {
    isHour() {
      return this.format.includes('hh');
    },
    isMin() {
      return this.format.includes('mm');
    },
    isSec() {
      return this.format.includes('ss');
    },
    labelHours() {
      if(this.noLabel) return null;
      return this.label ? null : this.$t('webitelUI.timepicker.hour');
    },
    labelMin() {
      if(this.noLabel) return null;
      return this.label ? null : this.$t('webitelUI.timepicker.min');
    },
    labelSec() {
      if(this.noLabel) return null;
      return this.label ? null : this.$t('webitelUI.timepicker.sec');
    },
    hour: {
      get() {
        return this.dateMode
          ? new Date(+this.value).getHours()
          : Math.floor(this.value / SEC_IN_HOUR);
      },
      set(value) {
        const newValue = this.dateMode
          ? new Date(this.value).setHours(value)
          : this.value - this.hour * SEC_IN_HOUR + value * SEC_IN_HOUR;
        this.$emit('input', newValue);
      },
    },
    min: {
      get() {
        return this.dateMode
          ? new Date(+this.value).getMinutes()
          : Math.floor((this.value / SEC_IN_MIN) % 60);
      },
      set(value) {
        const newValue = this.dateMode
          ? new Date(this.value).setMinutes(value)
          : this.value - this.min * SEC_IN_MIN + value * SEC_IN_MIN;
        this.$emit('input', newValue);
      },
    },
    sec: {
      get() {
        return this.dateMode ? new Date(+this.value).getSeconds() : Math.floor(this.value % 60);
      },
      set(value) {
        const newValue = this.dateMode
          ? new Date(this.value).setSeconds(value)
          : this.value - this.sec + +value;
        this.$emit('input', newValue);
      },
    },
    requiredLabel() {
      return this.required ? `${this.label} (${this.format})*` : `${this.label} (${this.format})`;
    },
  },

  methods: {},
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>

.wt-timepicker {
  display: flex;
  flex-direction: column;
}

.wt-timepicker__wrapper {
  display: flex;
}

.wt-time-input {
  width: var(--timepicker-input-width);
  margin-right: var(--timepicker-input-margin);

  &:last-child {
    margin-right: 0;
  }
}

</style>

<template>
  <div
    class="wt-timepicker"
    :class="{'wt-timepicker--invalid': invalid}"
  >
    <wt-label
      v-if="label"
      v-bind="labelProps"
      :invalid="invalid"
    >
      {{ `${label} (${format})` }}
    </wt-label>
    <div class="wt-timepicker__wrapper">
      <wt-time-input
        v-if="isHour"
        :value="hour"
        :v="v"
        :label="label ? null : $t('webitelUI.timepicker.hour') "
        :max-value="dateMode ? null : 23"
        :disabled="disabled"
        hide-input-info
        @input="hour = $event"
      />
      <wt-time-input
        v-if="isMin"
        :value="min"
        :v="v"
        :label="label ? null : $t('webitelUI.timepicker.min')"
        :max-value="59"
        :disabled="disabled"
        hide-input-info
        @input="min = $event"
      />
      <wt-time-input
        v-if="isSec"
        :value="sec"
        :v="v"
        :label="label ? null : $t('webitelUI.timepicker.sec')"
        :max-value="59"
        :disabled="disabled"
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
import validationMixin from '../../mixins/validationMixin/validationMixin';

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
        return this.dateMode
          ? new Date(+this.value).getSeconds()
          : Math.floor(this.value % 60);
      },
      set(value) {
        const newValue = this.dateMode
          ? new Date(this.value).setSeconds(value)
          : this.value - this.sec + +value;
        this.$emit('input', newValue);
      },
    },
  },

  methods: {},
};
</script>

<style lang="scss">
@import './variables.scss';
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

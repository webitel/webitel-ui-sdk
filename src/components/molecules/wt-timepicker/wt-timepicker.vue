<template>
  <div class="wt-timepicker" :class="{'wt-timepicker--invalid': invalid}">
    <wt-label
      v-if="label"
      :invalid="invalid"
      v-bind="labelProps"
    >
      {{ `${label} (${format})` }}
    </wt-label>
    <div class="wt-timepicker__wrapper">
      <wt-time-input
        v-if="isHour"
        v-model="hour"
        :v="v"
        :label="label ? null : $t('webitelUI.timepicker.hour') "
        :maxValue="dateMode ? null : 23"
        :disabled="disabled"
        hide-input-info
      ></wt-time-input>
      <wt-time-input
        v-if="isMin"
        v-model="min"
        :v="v"
        :label="label ? null : $t('webitelUI.timepicker.min')"
        :maxValue="59"
        :disabled="disabled"
        hide-input-info
      ></wt-time-input>
      <wt-time-input
        v-if="isSec"
        v-model="sec"
        :v="v"
        :label="label ? null :  $t('webitelUI.timepicker.sec')"
        :maxValue="59"
        :disabled="disabled"
        hide-input-info
      ></wt-time-input>
    </div>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >{{ validationText }}
    </wt-input-info>
  </div>
</template>

<script>
import validationMixin from '../../../mixins/validationMixin/validationMixin';

const SEC_IN_HOUR = 60 * 60;
const SEC_IN_MIN = 60;

export default {
  name: 'wt-timepicker',
  mixins: [validationMixin],
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
  model: {
    prop: 'value',
    event: 'input',
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

<style lang="scss" scoped>
.wt-timepicker {
  display: flex;
  flex-direction: column;
}

.wt-label {
  .wt-timepicker:hover &,
  .wt-timepicker:focus-within & {
    color: var(--form-label--hover-color);
  }

  .wt-timepicker--invalid:hover &,
  .wt-timepicker--invalid:focus-within & {
    color: var(--label--invalid-color);
  }
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

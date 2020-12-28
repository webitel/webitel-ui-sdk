<template>
  <div class="wt-timepicker">
    <wt-time-input
      v-if="isHour"
      v-model="hour"
      :label="$t('webitelUI.timepicker.hour')"
      :maxValue="dateMode ? 23 : null"
      :disabled="disabled"
    ></wt-time-input>
    <wt-time-input
      v-if="isMin"
      v-model="min"
      :label="$t('webitelUI.timepicker.min')"
      :maxValue="59"
      :disabled="disabled"
    ></wt-time-input>
    <wt-time-input
      v-if="isSec"
      v-model="sec"
      :label="$t('webitelUI.timepicker.sec')"
      :maxValue="59"
      :disabled="disabled"
    ></wt-time-input>
  </div>
</template>

<script>
const SEC_IN_HOUR = 60 * 60;
const SEC_IN_MIN = 60;

export default {
  name: 'wt-timepicker',
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    dateMode: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: 'hh:mm:ss',
    },
    disabled: {
      type: Boolean,
      default: false,
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
}

.wt-time-input {
  width: var(--timepicker-input-width);
  margin-right: var(--timepicker-input-margin);

  &:last-child {
    margin-right: 0;
  }
}
</style>

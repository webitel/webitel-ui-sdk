<template>
  <div class="wt-timepicker">
    <wt-time-input
      v-if="isHour"
      v-model="hour"
      :label="$t('webitelUI.timepicker.hour')"
      :maxValue="23"
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
  export default {
    name: 'wt-timepicker',
    props: {
      value: {
        type: [String, Number],
        default: 0,
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
    },
    model: {
      prop: 'value',
      event: 'change',
    },

    created() {
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
          return new Date(+this.value).getHours();
        },
        set(value) {
          const newValue = new Date(this.value).setHours(value);
          this.$emit('change', newValue);
        },
      },
      min: {
        get() {
          return new Date(+this.value).getMinutes();
        },
        set(value) {
          const newValue = new Date(this.value).setMinutes(value);
          this.$emit('change', newValue);
        },
      },
      sec: {
        get() {
          return new Date(+this.value).getSeconds();
        },
        set(value) {
          const newValue = new Date(this.value).setSeconds(value);
          this.$emit('change', newValue);
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
    margin-right: var(--timepicker-input-margin);

    &:last-child {
      margin-right: 0;
    }
  }
</style>

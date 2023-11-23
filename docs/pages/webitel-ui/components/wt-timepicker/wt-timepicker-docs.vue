<template>
  <component-model />
  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtTimepickerDocs',
  data: () => ({
    properties: [
      {
        value: 'value',
        code: '<wt-timepicker :value="value"></wt-timepicker>',
        type: '[\'String\', \'Number\'] converts String to Number',
        default: 0,
        description: 'Time value in seconds (not milliseconds!)',
      },
      {
        value: 'date-mode',
        code: '<wt-timepicker date-mode></wt-timepicker>',
        type: 'Boolean',
        default: 'false',
        description: 'If date-mode is true, timepicker asserts value is timestamp and displays/changes timestamp value',
      },
      {
        value: 'label',
        code: '<wt-timepicker label="Timepicker"></wt-timepicker>',
        type: 'String',
        default: '',
        description: 'if passed, replaces "hour", "min", "sec" with a single label + format prop value',
      },
      {
        value: 'format',
        code: '<wt-timepicker format="hh:mm:ss"></wt-timepicker>',
        type: 'String',
        default: 'hh:mm:ss',
        description: 'Controls visibility of inputs, depending on presence of h, m, s letters',
      },
      {
        value: 'disabled',
        code: '<wt-timepicker disabled></wt-timepicker>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'labelProps',
        code: '<wt-checkbox :label-props="{}"></wt-checkbox>',
        type: 'Object',
        description: 'Object with props, passed down to wt-label as props',
      },
    ],
    events: [
      {
        value: 'input',
        params: [
          {
            name: 'value',
            type: 'Number sec value or timestamp, depending on date-mode prop value',
            description: 'Event is triggered immediately after value change.',
          },
        ],
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
</style>

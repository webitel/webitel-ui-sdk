<template>
  <component-model
    prop="selected"
    event="input"
  />
  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
  <component-slots
    :slots="slots"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtRadioDocs',
  data: () => ({
    properties: [
      {
        value: 'value',
        code: '<wt-radio :value="value"></wt-radio>',
        type: '[String, Number, Boolean]',
        default: '',
        description: 'Value, set by radio',
      },
      {
        value: 'selected',
        code: '<wt-radio :selected="value"></wt-radio>',
        type: '[String, Number, Boolean]',
        default: '',
        description: '[V-MODEL] currently selected value',
      },
      {
        value: 'label',
        code: '<wt-radio label="Label"></wt-radio>',
        type: 'String',
        default: '',
      },
      {
        value: 'disabled',
        code: '<wt-radio disabled></wt-radio>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'required',
        code: '<wt-radio required></wt-radio>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'outline',
        code: '<wt-radio outline></wt-radio>',
        type: 'Boolean',
        default: 'false',
        description: 'Changes visual style to outlined',
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
          { name: '"value" prop', type: 'String' },
        ],
      },
    ],
    slots: [
      {
        name: 'label',
        scope: [{ name: 'label' }],
        description: 'Custom label slot',
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

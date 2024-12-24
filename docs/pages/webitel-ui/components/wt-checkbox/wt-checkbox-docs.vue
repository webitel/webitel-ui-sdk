<template>
  <component-model
    event="change"
    prop="selected"
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
  name: 'WtCheckboxDocs',
  data: () => ({
    properties: [
      {
        value: 'value',
        code: '<wt-checkbox :value="value"></wt-checkbox>',
        type: ['String', 'Boolean'],
        default: '',
        description: 'Checkbox value, which should be present in checked list, if checked',
      },
      {
        value: 'selected',
        code: '<wt-checkbox :selected="value"></wt-checkbox>',
        type: ['Array', 'Boolean'],
        default: '[]',
        description: '[V-MODEL] Variable-accumulator, which contains checkbox value (or values, if array)',
      },
      {
        value: 'label',
        code: '<wt-checkbox label="Label"></wt-checkbox>',
        type: 'String',
        default: '',
      },
      {
        value: 'disabled',
        code: '<wt-checkbox disabled></wt-checkbox>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'outline',
        code: '<wt-checkbox outline></wt-checkbox>',
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
        value: 'change',
        params: [
          { name: 'selected value', type: ['Boolean', 'Array'] },
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

<template>
  <component-model />
  <component-props :properties="properties" />
  <component-events :events="events" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'wt-slider-docs.vue',
  data: () => ({
    number: 70,
    disabledValue: 50,
    verticalValue: 50,
    properties: [
      {
        value: 'value',
        code: '<wt-slider :value="value"></wt-slider>',
        type: 'Number',
        default: 0,
        description: 'Actual slider value',
      },
      {
        value: 'min',
        code: '<wt-slider :min="0"></wt-slider>',
        type: 'Number',
        default: 0,
        description: 'The smallest slider value',
      },
      {
        value: 'max',
        code: '<wt-slider :max="100"></wt-slider>',
        type: 'Number',
        default: 100,
        description: 'The biggest slider value',
      },
      {
        value: 'step',
        code: '<wt-slider :step="1"></wt-slider>',
        type: 'Number',
        default: 1,
        description: 'Step of changing value',
      },
      {
        value: 'disabled',
        code: '<wt-slider disabled></wt-slider>',
        type: 'Boolean',
        default: false,
        description: 'Slider is disabled to changes',
      },
      {
        value: 'vertical',
        code: '<wt-slider vertical></wt-slider>',
        type: 'Boolean',
        default: false,
        description:
          'Slider is positioned vertically, from bottom to top. Important: indicate slider height',
      },
      {
        value: 'height',
        code: '<wt-slider vertical :height="150"></wt-slider>',
        type: 'Number',
        default: 100,
        description:
          'Vertical slider height, only number - quantity of pixels is accepted',
      },
    ],
    events: [
      {
        value: 'input',
        params: [{ name: 'Selected value', type: 'Number' }],
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>
input {
  display: block;
}
</style>

<template>
  <component-props
    :properties="properties"
  />
  <component-slots
    :slots="slots"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtStepperDocs',
  data: () => ({
    properties: [
      {
        value: 'steps',
        code: '<wt-stepper :steps="[{ name: \'Step 1\' }]"></wt-stepper>',
        type: 'Array',
        description: 'An array of displayed steps. May include "name", "description", "completed"',
      },
      {
        value: 'active-step',
        code: '<wt-stepper :active-step="1"></wt-stepper>',
        type: ['String', 'Number'],
        default: '1',
        description: 'All past and active steps are marked with "accent-secondary-color"',
      },
    ],
    slots: [
      {
        name: 'description',
        scope: [{ name: 'description' }],
        description: 'Custom description slot',
      },
      {
        name: 'main',
        scope: [{ name: 'main' }],
        description: 'Custom main slot',
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

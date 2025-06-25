<template>
  <component-model
    event="input"
    prop="size"
  />
  <component-props :properties="properties" />
  <component-events :events="events" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtPaginationDocs',
  data: () => ({
    properties: [
      {
        value: 'size',
        code: '<wt-pagination :size="`10`"></wt-pagination>',
        type: ['String', 'Number'],
        default: '10',
        description: 'SIZE CHANGE IS DEBOUNCED',
      },
      {
        value: 'next',
        code: '<wt-pagination :next="isNext"></wt-pagination>',
        type: 'Boolean',
        default: 'true',
        description: 'Is false, disables paging arrow',
      },
      {
        value: 'debounce',
        code: '<wt-pagination ebounce></wt-pagination>',
        type: 'Boolean',
        default: 'false',
        description:
          'If true, @change event is delayed for debounceDelay from last change',
      },
      {
        value: 'debounceDelay',
        code: '<wt-pagination debounce-delay="2000" debounce></wt-pagination>',
        type: 'Number',
        default: '1000',
      },
    ],
    events: [
      {
        value: 'input',
        params: [
          {
            name: 'changed size value',
            type: 'String',
          },
        ],
      },
      {
        value: 'change',
        params: [
          {
            name: 'changed size value',
            type: 'String',
            description:
              'The same as input, but if "debounce" is true,event is debounced.',
          },
        ],
      },
      {
        value: 'next',
        params: [{ description: 'Event is triggered on "next" arrow click' }],
      },
      {
        value: 'prev',
        params: [{ description: 'Event is triggered on "prev" arrow click' }],
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>

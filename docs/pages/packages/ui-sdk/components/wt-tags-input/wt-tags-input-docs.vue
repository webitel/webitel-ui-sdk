<template>
  <component-model />
  <component-props :properties="properties" />
  <component-events :events="events" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtTagsInputDocs',
  data: () => ({
    properties: [
      {
        value: 'value',
        code: '<wt-tags-input :value="value"></wt-tags-input>',
        type: 'Array',
      },
      {
        value: 'taggable',
        code: '<wt-tags-input taggable></wt-tags-input>',
        type: 'Boolean',
        default: 'false',
        description: 'If true, user can add tags by himself',
      },
      {
        value: 'trackBy',
        code: '<wt-tags-input track-by="label"></wt-tags-input>',
        type: 'String',
        default: 'null',
        description:
          'Default mode for tags input is array of strings, not objects (that is the difference between tags input and select).',
      },
      {
        value: 'optionLabel',
        code: '<wt-tags-input option-label="label"></wt-tags-input>',
        type: 'String',
        default: 'null',
        description:
          'Represented property of select object. REQUIRED IN OBJECT-DATA TAG-INPUTS TO PREVENT OPTION DUPLICATION.',
      },
      {
        value: 'manualTagging',
        code: '<wt-tags-input manual-tagging></wt-tags-input>',
        type: 'Boolean',
        default: 'false',
        description: `
      False: "tag" method automatically pushes { optionLabel | "name", trackBy } object to value
      array and $emits "input" event.

      True: "tag" method only $emits "tag" event. Tag addition is responsibility of client side.
    `,
      },
    ],
    events: [
      {
        value: 'tag',
        params: [
          {
            name: 'tag',
            type: ['String'],
            description: 'vue-multiselect "tag" value.',
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

<style lang="scss" scoped></style>

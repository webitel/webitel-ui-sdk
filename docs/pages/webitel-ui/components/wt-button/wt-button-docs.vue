<template>
  <section>
    <component-props
      :properties="properties"
    />
    <component-events
      :events="events"
    />
    <component-slots />
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'WtButtonDocs',
    data: () => ({
      properties: [
        {
          value: 'color',
          code: '<wt-button color="primary"></wt-button>',
          type: 'String',
          options: ['primary', 'secondary', 'secondary-50', 'success', 'danger', 'transfer', 'task'],
          default: 'primary',
        },
        {
          value: 'disabled',
          code: '<wt-button disabled></wt-button>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'size',
          code: '<wt-button size="sm"></wt-button>',
          type: 'String',
          default: 'md',
          options: ['sm', 'md'],
        },
        {
          value: 'outline',
          code: '<wt-button outline></wt-button>',
          type: 'Boolean',
          default: 'false',
          description: 'Changes button style to alternative (outlined)',
        },
        {
          value: 'wide',
          code: '<wt-button wide></wt-button>',
          type: 'Boolean',
          default: 'false',
          description: 'Stretches button to all available width',
        },
        {
          value: 'contains-icon',
          code: '<wt-button contains-icon></wt-button>',
          type: 'Boolean',
          default: 'false',
          description: 'sets wt-button line-height to 0 to prevent height changing: https://stackoverflow.com/a/11126701',
        },
        {
          value: 'loading',
          code: '<wt-button loading></wt-button>',
          type: 'Boolean',
          default: 'false',
          description: 'Displays loader instead of text',
        },
      ],
      events: [
        {
          value: 'click',
          params: [
            { name: 'event', type: 'Event' },
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

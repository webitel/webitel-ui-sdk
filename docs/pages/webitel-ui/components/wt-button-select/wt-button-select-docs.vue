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
  name: 'WtButtonSelectDocs',
  data: () => ({
    properties: [
      {
        value: 'options',
        code: ' <wt-context-menu :options="options"></wt-context-menu>',
        type: 'Array',
        description: 'Just like in Context Menu component',
        required: true,
      },
      {
        value: '+ all pops witch are in wt-button component',
      },
    ],
    events: [
      {
        value: 'click',
        params: [
          { name: 'event', type: 'Event' },
        ],
      },
      {
        value: 'click:option',
        params: [
          { name: 'Option', type: 'Object' },
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
  section::v-deep {
    .wt-button-select {
      .wt-context-menu {
        // FIXME: REMOVE AFTER DEFAULT STYLES REFACTOR
        list-style: none;

        .wt-context-menu__option-wrapper {
          margin: 0;
          padding: 0;

          .wt-context-menu__option {
            text-decoration: none;
          }
        }
      }
    }
  }
</style>

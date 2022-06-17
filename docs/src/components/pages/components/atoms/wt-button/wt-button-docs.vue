<template>
  <section>
    <h2>Buttons</h2>
    <article>
      <div class="example-wrapper">
        <wt-button>Primary button</wt-button>
        <pre><code
          class="language-html">&lt;wt-button&gt;Primary button&lt;/wt-button&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-button size="sm" color="secondary">Small button</wt-button>
      </div>
      <div class="example-wrapper">
        <wt-button wide>Wide button</wt-button>
      </div>
      <div class="example-wrapper">
        <wt-button>Primary</wt-button>
        <wt-button color="secondary">Secondary</wt-button>
        <wt-button disabled>Disabled</wt-button>
        <wt-button color="success">Success</wt-button>
        <wt-button color="danger">Danger</wt-button>
        <wt-button color="transfer">Transfer</wt-button>
        <wt-button color="task">Task</wt-button>
      </div>
      <div class="example-wrapper">
        <wt-button outline>Primary</wt-button>
        <wt-button outline color="secondary">Secondary</wt-button>
        <wt-button outline disabled>Disabled</wt-button>
        <wt-button outline color="success">Success</wt-button>
        <wt-button outline color="danger">Danger</wt-button>
        <wt-button outline color="transfer">Transfer</wt-button>
        <wt-button outline color="task">Task</wt-button>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-events
      :events="events"
    ></component-events>
    <component-slots
    ></component-slots>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-button-docs',
    data: () => ({
      properties: [
        {
          value: 'color',
          code: '<wt-button color="primary"></wt-button>',
          type: 'String',
          options: ['primary', 'secondary', 'success', 'danger', 'transfer', 'task'],
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

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
        <wt-button large>Large button</wt-button>
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
      </div>
      <div class="example-wrapper">
        <wt-button outline>Primary</wt-button>
        <wt-button outline color="secondary">Secondary</wt-button>
        <wt-button outline disabled>Disabled</wt-button>
        <wt-button outline color="success">Success</wt-button>
        <wt-button outline color="danger">Danger</wt-button>
        <wt-button outline color="transfer">Transfer</wt-button>
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
          options: ['"primary", "secondary", "success", "danger", "transfer"'],
          default: 'primary',
        },
        {
          value: 'disabled',
          code: '<wt-button disabled></wt-button>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'large',
          code: '<wt-button large></wt-button>',
          type: 'Boolean',
          default: 'false',
          description: 'Makes button bigger',
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

<template>
  <section>
    <h2>Buttons</h2>
    <article>
      <div class="example-wrapper">
        <wt-button>Primary button</wt-button>
      </div>
      <div class="example-wrapper">
        <wt-button color="transfer" outline large>Large transfer button</wt-button>
      </div>
      <div class="example-wrapper">
        <wt-button color="secondary" wide>Wide secondary button</wt-button>
      </div>
      <pre><code class="language-html">&lt;wt-button&gt;Primary button&lt;/wt-button&gt;</code></pre>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'buttons',
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
      ],
    }),
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
  .example-wrapper {
    margin: 10px 0;
  }
</style>

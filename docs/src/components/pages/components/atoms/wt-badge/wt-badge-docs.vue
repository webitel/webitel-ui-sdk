<template>
  <section>
    <h2>Badge</h2>
    <article>
      <div class="example-wrapper">
        <wt-badge>+1</wt-badge>
        <pre><code class="language-html">&lt;wt-badge&gt;+1&lt;/wt-badge&gt;</code></pre>
      </div>
    </article>
    <article>
      <div class="example-wrapper">
        <wt-badge>Main color</wt-badge>
        <wt-badge color="outline">Outline color</wt-badge>
        <wt-badge color="accent">Accent color</wt-badge>
        <wt-badge color="secondary">Secondary color</wt-badge>
        <wt-badge color="success">Success color</wt-badge>
        <wt-badge color="danger">Danger color</wt-badge>
        <wt-badge color="transfer">Transfer color</wt-badge>
      </div>
    </article>
    <article>
      <h3>Badge class</h3>
      <p>Badge has it's own class, <code class="language-css">.wt-badge</code>. It can be
      reused on other elements to make them look like wt-badge:</p>
      <div class="my-div">1010</div>
      <pre><code class="language-html">
          &lt;div class="my-div"&gt;1010&lt;/div&gt;
        </code><code class="language-css">
          @import '~@webitel/ui-sdk/src/css/components/atoms/wt-badge/wt-badge';
          .my-div { @extend .wt-badge; }
        </code></pre>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-slots
    ></component-slots>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-badge-docs',
    data: () => ({
      properties: [
        {
          value: 'color',
          code: '<wt-badge color="primary"></wt-badge>',
          type: 'String',
          options: ['main', 'outline', 'accent', 'secondary', 'success', 'danger', 'transfer'],
          default: 'main',
          description: '"main" and "outline" are badge-specific colors',
        },
      ],
    }),
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@webitel/ui-sdk/src/css/components/atoms/wt-badge/wt-badge';
  .my-div {
    @extend .wt-badge;
  }
</style>

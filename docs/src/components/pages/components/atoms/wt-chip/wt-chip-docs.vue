<template>
  <section>
    <h2>Chip</h2>
    <article>
      <div class="example-wrapper">
        <wt-chip>+1</wt-chip>
        <pre><code class="language-html">&lt;wt-chip&gt;+1&lt;/wt-chip&gt;</code></pre>
      </div>
    </article>
    <article>
      <div class="example-wrapper">
        <wt-chip>Main color</wt-chip>
        <wt-chip color="outline">Outline color</wt-chip>
        <wt-chip color="accent">Accent color</wt-chip>
        <wt-chip color="secondary">Secondary color</wt-chip>
        <wt-chip color="secondary-50">Secondary-50 color</wt-chip>
        <wt-chip color="success">Success color</wt-chip>
        <wt-chip color="danger">Danger color</wt-chip>
        <wt-chip color="transfer">Transfer color</wt-chip>
      </div>
    </article>
    <article>
      <h3>Chip class</h3>
      <p>Chip has it's own class, <code class="language-css">.wt-chip</code>. It can be
      reused on other elements to make them look like wt-chip:</p>
      <div class="my-div">1010</div>
      <pre><code class="language-html">
          &lt;div class="my-div"&gt;1010&lt;/div&gt;
        </code><code class="language-css">
          @import '~@webitel/ui-sdk/src/css/components/atoms/wt-chip/wt-chip';
          .my-div { @extend .wt-chip; }
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
    name: 'wt-chip-docs',
    data: () => ({
      properties: [
        {
          value: 'color',
          code: '<wt-chip color="primary"></wt-chip>',
          type: 'String',
          options: ['main', 'outline', 'accent', 'secondary', 'secondary-50', 'success', 'danger', 'transfer'],
          default: 'main',
          description: '"main" and "outline" are chip-specific colors',
        },
      ],
    }),
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@webitel/ui-sdk/src/css/components/atoms/wt-chip/wt-chip';
  .my-div {
    @extend .wt-chip;
  }
</style>

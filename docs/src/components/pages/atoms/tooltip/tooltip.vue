<template>
  <section>
    <h2>Tooltip</h2>
    <article>
      <div class="example-wrapper">
        <div class="my-div">
          Hover me!
          <wt-tooltip>Hello there!</wt-tooltip>
        </div>
        <pre><code class="language-html">
          &lt;div class="my-div"&gt; Hover me!
            &lt;wt-tooltip&gt;Hello there!&lt;/wt-tooltip&gt;
          &lt;/div&gt;
        </code><code class="language-css">
          .my-div:hover .wt-tooltip {
              opacity: 1;
              pointer-events: auto;
          }</code></pre>
        <wt-tooltip contrast visible>Contrast visible tooltip</wt-tooltip>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <article>
      <h3>Tooltip positioning</h3>
      <p>By default, tooltip positioning is static. If you want make it absolute, you should do it
        explicitly in CSS</p>
      <div class="my-div">1010</div>
      <pre><code class="language-html">
          &lt;wt-tooltip&gt;1010&lt;/wt-tooltip&gt;
        </code><code class="language-css">
          .wt-tooltip { position: absolute; }
        </code></pre>
    </article>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'tooltip',
    data: () => ({
      properties: [
        {
          value: 'contrast',
          code: '<wt-tooltip contrast></wt-tooltip>',
          type: 'Boolean',
          default: 'false',
          description: 'Inverts tooltip colors',
        },
        {
          value: 'visible',
          code: '<wt-tooltip visible></wt-tooltip>',
          type: 'Boolean',
          default: 'false',
          description: 'Makes tooltip constantly visible',
        },
      ],
    }),
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
  .my-div {
    display: inline-block;
    padding: 10px;
    border: 1px solid red;

    .wt-tooltip {
      position: absolute;
    }

    &:hover .wt-tooltip {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>

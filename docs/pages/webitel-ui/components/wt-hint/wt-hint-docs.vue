<template>
  <section>
    <h2>Hint</h2>
    <article>
      <div class="example-wrapper">
        <wt-hint>
          lorem ipsum
        </wt-hint>
        <pre><code class="language-html">&lt;wt-hint&gt;lorem ipsum&lt;/wt-hint&gt;</code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    />
    <component-slots
      :slots="slots"
    />
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'WtHintDocs',
    data: () => ({
      slots: [
        {
          name: 'default',
          description: 'Default content slot',
        },
      ],
      properties: [
        {
          value: 'iconColor',
          code: '<wt-hint :icon-сolor="iconColor"></wt-hint>',
          type: 'String',
          default: 'outline',
          description: 'This prop is changing color only for hint icon',
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

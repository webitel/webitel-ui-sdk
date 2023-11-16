<template>
  <section>
    <h2>Tooltip</h2>
    <article>
      <h3>Tooltip implementation is based on
        <a class="full-docs-link" href="https://floating-ui.com/">Floating UI</a>
        lib
      </h3>
      <div class="example-wrapper">
        <wt-tooltip>
          <template v-slot:activator>
            <div class="my-div">
              Hover me!
            </div>
          </template>
          Hello there!
        </wt-tooltip>
        <pre><code class="language-html">
          &lt;wt-tooltip&gt;
          &lt;template v-slot:activator&gt;
            Hover me!
          &lt;/template&gt;
          Hello there!
        &lt;/wt-tooltip&gt;
        </code></pre>
      </div>
      <wt-tooltip contrast>
        <template v-slot:activator>
          <div class="my-div">
            Contrast tooltip is here
          </div>
        </template>
        Hello there!
      </wt-tooltip>
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
  name: 'wt-tooltip-docs',
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
        value: 'placement',
        code: '<wt-tooltip placement="left"></wt-tooltip>',
        type: 'String',
        default: 'auto',
        description: 'see [Floating UI](https://floating-ui.com/docs/tutorial#placements) docs, + "auto" for autoPlacement',
      },
      {
        value: 'popper-class',
        code: '<wt-tooltip popper-class="my-class"></wt-tooltip>',
        type: 'String',
        description: 'add special class to a floating part of tooltip',
      },
      {
        value: 'triggers',
        code: '<wt-tooltip :triggers="[\'click\']"></wt-tooltip>',
        type: 'Array',
        default: '[\'hover\', \'focus\', \'touch\']',
        description: 'see [Floating Vue](https://floating-vue.starpad.dev/api/#triggers) docs',
      },
      {
        value: 'popper-triggers',
        code: '<wt-tooltip :popper-triggers="[\'hover\']"></wt-tooltip>',
        type: 'Array',
        description: 'see [Floating Vue](https://floating-vue.starpad.dev/api/#poppertriggers) docs',
      },
      {
        value: 'visible',
        code: '<wt-tooltip visible></wt-tooltip>',
        type: 'Boolean',
        default: 'false',
        description: 'Make tooltip visible',
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
    pointer-events: auto;
    opacity: 1;
  }
}
</style>

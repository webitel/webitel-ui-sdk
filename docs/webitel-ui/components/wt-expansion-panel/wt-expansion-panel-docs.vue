<template>
  <section>
    <h2>Expansion panel</h2>
    <article>
      <div class="example-wrapper">
        <wt-expansion-panel>
          <template v-slot:title>Title</template>
          <template>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </template>
        </wt-expansion-panel>
        <pre><code
          class="language-html">
          &lt;wt-expansion-panel&gt;
            &lt;template v-slot:title&gt;Title&lt;/template&gt;
            &lt;template&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&lt;/template&gt;
          &lt;/wt-expansion-panel&gt;
        </code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-slots
      :slots="slots"
    ></component-slots>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'wt-expansion-panel-docs',
  data: () => ({
    properties: [
      {
        value: 'size',
        code: '<wt-expansion-panel size="sm"></wt-expansion-panel>',
        type: 'String',
        default: 'md',
        options: ['sm', 'md'],
      },
    ],
    slots: [
      {
        name: 'default',
        description: 'Displaying collapsible content',
      },
      {
        name: 'title',
        description: 'Display title for collapse panel',
      },
    ]
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <section>
    <h2>Page Wrapper</h2>
    <article>
      <div class="example-wrapper" style="padding: 30px; background: #EAEAEA;">
        <wt-page-wrapper>
          <template slot="header">
            <wt-headline>
              <template slot="title">Wt Headline</template>
            </wt-headline>
          </template>
          <template slot="actions-panel">
            <div style="height: 150px; background: lightblue;"></div>
          </template>
          <template slot="main">
            <div style="width: 100%; height: 500px; background: lightblue;"></div>
          </template>
        </wt-page-wrapper>
        <pre><code
          class="language-html">
        &lt;wt-page-wrapper&gt;
          &lt;template slot="header"&gt;
            &lt;wt-headline&gt;&lt;template slot="title">Wt Headline&lt;/template&gt;&lt;/wt-headline&gt;
          &lt;/template&gt;
          &lt;template slot="actions-panel"&gt;
            &lt;div style="height: 150px; background: lightblue;"&gt;&lt;/div&gt;
          &lt;/template&gt;
          &lt;template slot="main"&gt;
            &lt;div style="width: 100%; height: 500px; background: lightblue;"&gt;&lt;/div&gt;
          &lt;/template&gt;
        &lt;/wt-page-wrapper&gt;
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
  name: 'wt-page-wrapper-docs',
  data: () => ({
    properties: [
      {
        value: 'actionsPanel',
        code: '<wt-page-wrapper :actions-panel="false"></wt-page-wrapper>',
        type: 'Boolean',
        default: 'true',
        description: 'Controls actions panel visibility',
      },
    ],
    slots: [
      {
        name: 'header',
        description: 'Header (WT-HEADLINE component is highly recommended) slot',
      },
      {
        name: 'actions-panel',
        description: 'Actions or filters slot',
      },
      {
        name: 'main',
        description: 'Main content slot',
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

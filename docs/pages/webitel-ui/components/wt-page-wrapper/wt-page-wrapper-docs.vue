<template>
  <section>
    <h2>Page Wrapper</h2>
    <article>
      <div class="example-wrapper">
        <wt-page-wrapper style="background: var(--page-bg-color);">
          <template #header>
            <div style="height: 40px; background: lightblue;" />
          </template>
          <template #actions-panel>
            <div style="height: 80px; background: lightblue;" />
          </template>
          <template #main>
            <div style="width: 100%; height: 320px; background: lightblue;" />
          </template>
        </wt-page-wrapper>
      </div>
      <pre><code
          class="language-html"
>
        &lt;wt-page-wrapper&gt;
          &lt;template v-slot:header&gt;
            &lt;wt-headline&gt;&lt;template v-slot:title>Wt Headline&lt;/template&gt;&lt;/wt-headline&gt;
          &lt;/template&gt;
          &lt;template v-slot:actions-panel&gt;
            &lt;div style="height: 150px; background: lightblue;"&gt;&lt;/div&gt;
          &lt;/template&gt;
          &lt;template v-slot:main&gt;
            &lt;div style="width: 100%; height: 500px; background: lightblue;"&gt;&lt;/div&gt;
          &lt;/template&gt;
        &lt;/wt-page-wrapper&gt;
        </code></pre>
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
  name: 'WtPageWrapperDocs',
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

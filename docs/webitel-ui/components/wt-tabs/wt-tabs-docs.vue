<template>
  <section>
    <h2>Tabs</h2>
    <article>
      <div class="example-wrapper">
        <wt-tabs
          v-model="current"
          :tabs="tabs"
        ></wt-tabs>
        <pre><code class="language-html">&lt;wt-tabs v-model="current" :tabs="tabs"&gt;&lt;/wt-tabs&gt;</code></pre>
      </div>
    </article>
    <component-model
      prop="current"
      event="change"
    ></component-model>
    <component-props
      :properties="properties"
    ></component-props>
    <component-events
      :events="events"
    ></component-events>
    <component-slots
      :slots="slots"
    ></component-slots>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-tabs-docs',
    data: () => ({
      current: { value: '1' },
      tabs: [
        {
          text: 'Tab 1',
          value: '1',
        },
        {
          text: 'Tab 2',
          value: '2',
        },
        {
          text: 'Tab 3',
          value: '3',
        },
      ],
      properties: [
        {
          value: 'current',
          code: '<wt-tabs :current="{text: `TAB_TEXT`, value: `tab1`}"></wt-tabs>',
          type: 'Object',
          default: '{}',
        },
        {
          value: 'tabs',
          code: '<wt-tabs :tabs="[{text: `TAB_TEXT`, value: `tab1`}, {text: `TAB_TEXT2`, value: `tab2`}]"></wt-tabs>',
          type: 'Array',
          default: '[]',
        },
      ],
      events: [
        {
          value: 'change',
          params: [
            { name: 'tab', type: 'Object', description: 'Returns tab object from list of tabs' },
          ],
        },
      ],
      slots: [
        {
          name: ':tab-value',
          scope: [{ name: 'tab' }, { name: 'current' }],
          description: 'Custom tab contents slot',
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

<template>
  <section>
    <h2>Switcher</h2>
    <article>
      <div class="example-wrapper">
        <wt-switcher
          v-model="value"
          label="Switcher"
        ></wt-switcher>
        <wt-switcher
          v-model="value"
          label="Switcher with label left"
          label-left
        ></wt-switcher>
        <wt-switcher
          v-model="value"
          label="Disabled switcher"
          disabled
        ></wt-switcher>
        <pre><code class="language-html">&lt;wt-switcher v-model="value" label="Switcher"&gt;&lt;/wt-switcher&gt;</code></pre>
      </div>
    </article>
    <component-model
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
    name: 'wt-switcher-docs',
    data: () => ({
      value: false,
      properties: [
        {
          value: 'value',
          code: '<wt-switcher :value="value"></wt-switcher>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'label',
          code: '<wt-switcher label="Label"></wt-switcher>',
          type: 'String',
          default: '',
        },
        {
          value: 'labelLeft',
          code: '<wt-switcher label-left></wt-switcher>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'disabled',
          code: '<wt-switcher disabled></wt-switcher>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'labelProps',
          code: '<wt-checkbox :label-props="{}"></wt-checkbox>',
          type: 'Object',
          description: 'Object with props, passed down to wt-label as props',
        },
      ],
      events: [
        {
          value: 'change',
          params: [
            { name: 'value', type: 'Boolean', description: 'Returns inverted value' },
          ],
        },
      ],
      slots: [
        {
          name: 'label',
          scope: [{ name: 'label' }],
          description: 'Custom label slot',
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

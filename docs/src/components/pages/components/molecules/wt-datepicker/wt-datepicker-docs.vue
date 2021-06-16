<template>
  <section>
    <h2>Datepicker</h2>
    <article>
      <div class="example-wrapper">
        <wt-datepicker
          v-model="value"
          label="Datepicker"
        ></wt-datepicker>
        <pre><code class="language-html">&lt;wt-datepicker v-model="value" label="Datepicker"&gt;&lt;/wt-datepicker&gt;</code></pre>
        <span>value: {{value}}</span>
      </div>
    </article>
    <h3>Full docs: <a class="full-docs-link" href="https://www.npmjs.com/package/vuejs-datepicker">Vuejs
      Datepicker</a></h3>
    <component-model
      prop="value"
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
    name: 'wt-datepicker-docs',
    data: () => ({
      value: Date.now(),
      properties: [
        {
          value: 'value',
          code: '<wt-datepicker :value="value"></wt-datepicker>',
          type: "['String', 'Number'] -- timestamp",
          default: 'Date.now()',
        },
        {
          value: 'label',
          code: '<wt-datepicker label="Label"></wt-datepicker>',
          type: 'String',
          default: '',
        },
        {
          value: 'format',
          code: '<wt-datepicker format="dd MMM yyyy"></wt-datepicker>',
          type: ['String', 'Function'],
          default: 'dd MMM yyyy',
          description: 'Date formatting string or function',
        },
        {
          value: 'maximumView',
          code: '<wt-datepicker maximum-view="day"></wt-datepicker>',
          type: 'String',
          default: 'day',
          description: "If set, higher-level views won't show",
        },
        {
          value: 'disabled',
          code: '<wt-datepicker disabled></wt-datepicker>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'disabledDates',
          code: '<wt-datepicker :disabled-dates="{to: new Date(2016, 0, 5), from: new Date(2016, 0, 26)}"></wt-datepicker>',
          type: 'Object',
          default: 'null',
          description: 'https://www.npmjs.com/package/vuejs-datepicker#disabled-dates',
        },
        {
          value: 'lang',
          code: '<wt-datepicker :lang="en"></wt-datepicker>',
          type: 'String',
          default: 'en',
          description: 'FEATURE REQUEST: bind datepicker lang to i18n locale',
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
            { name: 'timestamp value', type: 'Number' },
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

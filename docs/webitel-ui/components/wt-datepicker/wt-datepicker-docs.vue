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
      <div class="example-wrapper">
        <wt-datepicker
          v-model="value"
          mode="datetime"
          label="Datepicker"
        ></wt-datepicker>
        <pre><code class="language-html">&lt;wt-datepicker v-model="value" label="Datepicker" mode="datetime"&gt;&lt;/wt-datepicker&gt;</code></pre>
        <span>value: {{value}}</span>
      </div>
    </article>
    <h3>Full docs: <a class="full-docs-link" href="https://vue3datepicker.com/">Vue
      Datepicker</a></h3>
    <component-model
      prop="value"
      event="input"
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
          value: 'disabled',
          code: '<wt-datepicker disabled></wt-datepicker>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'labelProps',
          code: '<wt-checkbox :label-props="{}"></wt-checkbox>',
          type: 'Object',
          description: 'Object with props, passed down to wt-label as props',
        },
        {
          value: 'PLUS ALL VUE DATEPICKER NATIVE PROPS',
          description: 'All passed but not declared props are passed to <vue-datepicker> component as attributes',
        },
      ],
      events: [
        {
          value: 'input',
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

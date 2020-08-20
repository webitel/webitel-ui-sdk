<template>
  <section>
    <h2>Datetimepicker</h2>
    <article>
      <div class="example-wrapper">
        <wt-datetimepicker
          v-model="value"
          label="Datetimepicker"
        ></wt-datetimepicker>
        <pre><code class="language-html">&lt;wt-datetimepicker v-model="value" label="Datetimepicker"&gt;&lt;/wt-datetimepicker&gt;</code></pre>
        <span>value: {{value}}</span>
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
    name: 'datetimepicker',
    data: () => ({
      value: Date.now(),
      properties: [
        {
          value: 'value',
          code: '<wt-datetimepicker :value="value"></wt-datetimepicker>',
          type: "['String', 'Number'] -- timestamp",
          default: 0,
        },
        {
          value: 'label',
          code: '<wt-datetimepicker label="Label"></wt-datetimepicker>',
          type: 'String',
          default: '',
        },
        {
          value: 'disabled',
          code: '<wt-datetimepicker disabled></wt-datetimepicker>',
          type: 'Boolean',
          default: 'false',
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

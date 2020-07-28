<template>
  <section>
    <h2>Timepicker</h2>
    <article>
      <div class="example-wrapper">
        <wt-timepicker v-model="value"></wt-timepicker>
        <pre><code class="language-html">&lt;wt-timepicker v-model="value"&gt;&lt;/wt-timepicker&gt;</code></pre>
        <span>value: {{value}}</span>
      </div>
      <div class="example-wrapper">
        <wt-timepicker
          v-model="value"
          label="Disabled timepicker"
          format="mm:ss"
          disabled
        ></wt-timepicker>
        <pre><code class="language-html">
          &lt;wt-timepicker
            v-model="value"
            label="Disabled timepicker"
            format="mm:ss"
            disabled
          &gt;
          &lt;/wt-timepicker&gt;
        </code></pre>
      </div>
    </article>
    <component-model
    ></component-model>
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'timepicker',
    data: () => ({
      value: Date.now(),
      properties: [
        {
          value: 'value',
          code: '<wt-timepicker :value="value"></wt-timepicker>',
          type: "['String', 'Number'] converts String to Number",
          default: 0,
        },
        {
          value: 'label',
          code: '<wt-timepicker label="Label"></wt-timepicker>',
          type: 'String',
          default: '',
        },
        {
          value: 'format',
          code: '<wt-timepicker format="hh:mm:ss"></wt-timepicker>',
          type: 'String',
          default: 'hh:mm:ss',
          description: 'Controls visibility of inputs, depending on presence of h, m, s letters',
        },
        {
          value: 'disabled',
          code: '<wt-timepicker disabled></wt-timepicker>',
          type: 'Boolean',
          default: 'false',
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

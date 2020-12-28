<template>
  <section>
    <h2>Timepicker</h2>
    <article>
      <div class="example-wrapper">
        <h3>Default Mode</h3>
        <wt-timepicker v-model="value"></wt-timepicker>
        <pre><code class="language-html">&lt;wt-timepicker v-model="value"&gt;&lt;/wt-timepicker&gt;</code></pre>
        <span>value: {{value}}</span>
      </div>
      <div class="example-wrapper">
        <h3>Date Mode</h3>
        <wt-timepicker v-model="dateValue" date-mode></wt-timepicker>
        <pre><code class="language-html">&lt;wt-timepicker v-model="value"&gt;&lt;/wt-timepicker&gt;</code></pre>
        <span>value: {{dateValue}}</span>
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
    <component-events
      :events="events"
    ></component-events>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-timepicker-docs',
    data: () => ({
      value: 332,
      dateValue: Date.now(),
      properties: [
        {
          value: 'value',
          code: '<wt-timepicker :value="value"></wt-timepicker>',
          type: "['String', 'Number'] converts String to Number",
          default: 0,
          description: 'Time value in seconds (not milliseconds!)',
        },
        {
          value: 'date-mode',
          code: '<wt-timepicker date-mode></wt-timepicker>',
          type: 'String',
          default: 'false',
          description: 'If date-mode is true, timepicker asserts value is timestamp and displays/changes timestamp value',
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
      events: [
        {
          value: 'input',
          params: [
            {
              name: 'value',
              type: 'Number sec value or timestamp, depending on date-mode prop value',
              description: 'Event is triggered immediately after value change.',
            },
          ],
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

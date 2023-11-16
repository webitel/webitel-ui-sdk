<template>
  <section>
    <h2>Time input</h2>
    <article>
      <div class="example-wrapper">
        <wt-time-input
          v-model="hour"
          label="hour"
          name="time-input-hour"
          :max-value="23"
        ></wt-time-input>
        <pre><code class="language-html">&lt;wt-time-input v-model="hour" label="hour" name="time-input-hour" :max-value="23"&gt;&lt;/wt-time-input&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-time-input
          v-model="min"
          label="min"
          name="time-input-min"
          :max-value="59"
        ></wt-time-input>
      </div>
      <div class="example-wrapper">
        <wt-time-input
          v-model="sec"
          label="sec"
          name="time-input-sec"
          :max-value="59"
          disabled
        ></wt-time-input>
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
    <component-slots
      :slots="slots"
    ></component-slots>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-time-input-docs',
    data: () => ({
      hour: 21,
      min: 1,
      sec: 33,
      properties: [
        {
          value: 'value',
          code: '<wt-time-input :value="value"></wt-time-input>',
          type: 'Number',
          default: 0,
        },
        {
          value: 'label',
          code: '<wt-time-input label="Label"></wt-time-input>',
          type: 'String',
          default: '',
        },
        {
          value: 'name',
          code: '<wt-time-input name="my-time-input"></wt-time-input>',
          type: 'String',
          default: '',
          description: 'Input id name for label association',
        },
        {
          value: 'maxValue',
          code: '<wt-time-input :max-value="59"></wt-time-input>',
          type: 'Number',
          default: null,
        },
        {
          value: 'required',
          code: '<wt-time-input required></wt-time-input>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'disabled',
          code: '<wt-time-input disabled></wt-time-input>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'outline',
          code: '<wt-time-input outline></wt-time-input>',
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
          value: 'input',
          params: [
            { name: 'value', type: 'Number' },
          ],
        },
        {
          value: 'PLUS ALL NATIVE INPUT EVENTS',
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

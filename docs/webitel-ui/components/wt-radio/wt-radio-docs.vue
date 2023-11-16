<template>
  <section>
    <h2>Radio</h2>
    <article>
      <div class="example-wrapper">
        <wt-radio
          v-model="selected"
          :value="value1"
          label="Radio 1"
          name="radio-opt1"
        ></wt-radio>
        <wt-radio
          v-model="selected"
          :value="value2"
          label="Radio 2"
          name="radio-opt2"
        ></wt-radio>
        <pre><code class="language-html">&lt;wt-radio v-model="selected" :value="value1" label="Radio 1"&gt;&lt;/wt-radio&gt;</code>
  <code class="language-html">&lt;wt-radio v-model="selected" :value="value2" label="Radio 2"&gt;&lt;/wt-radio&gt;</code></pre>
      </div>
    </article>
    <component-model
      prop="selected"
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
    name: 'wt-radio-docs',
    data: () => ({
      value1: 'value1',
      value2: 'value2',
      selected: 'value1',
      properties: [
        {
          value: 'value',
          code: '<wt-radio :value="value"></wt-radio>',
          type: '[String, Number, Boolean]',
          default: '',
          description: 'Value, set by radio',
        },
        {
          value: 'selected',
          code: '<wt-radio :selected="value"></wt-radio>',
          type: '[String, Number, Boolean]',
          default: '',
          description: '[V-MODEL] currently selected value',
        },
        {
          value: 'label',
          code: '<wt-radio label="Label"></wt-radio>',
          type: 'String',
          default: '',
        },
        {
          value: 'disabled',
          code: '<wt-radio disabled></wt-radio>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'required',
          code: '<wt-radio required></wt-radio>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'outline',
          code: '<wt-radio outline></wt-radio>',
          type: 'Boolean',
          default: 'false',
          description: 'Changes visual style to outlined',
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
            { name: '"value" prop', type: 'String' },
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

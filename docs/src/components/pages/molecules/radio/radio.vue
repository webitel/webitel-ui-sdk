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
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'radio',
    data: () => ({
      value1: 'value1',
      value2: 'value2',
      selected: 'value1',
      properties: [
        {
          value: 'value',
          code: '<wt-radio :value="value"></wt-radio>',
          type: 'String',
          default: '',
          description: 'Value, set by radio',
        },
        {
          value: 'selected',
          code: '<wt-radio :selected="value"></wt-radio>',
          type: 'String',
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
      ],
    }),
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
</style>

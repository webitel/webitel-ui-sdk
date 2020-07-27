<template>
  <section>
    <h2>Checkbox</h2>
    <article>
      <div class="example-wrapper">
        <wt-checkbox
          v-model="selected"
          label="Checkbox"
        ></wt-checkbox>
        <pre><code class="language-html">&lt;wt-checkbox v-model="selected" label="Checkbox"&gt;&lt;/wt-checkbox&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-checkbox
          v-model="selected"
          label="Disabled checkbox"
          disabled
        ></wt-checkbox>
      </div>
      <div class="example-wrapper">
        <wt-checkbox
          v-model="selected"
        ></wt-checkbox>
      </div>
      <div class="example-wrapper">
        <wt-checkbox
          v-model="selectedList"
          :value="options[0]"
          label="Multiple checkbox 1"
        ></wt-checkbox>
        <wt-checkbox
          v-model="selectedList"
          :value="options[2]"
          label="Multiple checkbox 2 [outlined]"
          outline
        ></wt-checkbox>
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
    name: 'checkbox',
    data: () => ({
      selected: true,
      selectedList: ['Option 1'],
      options: ['Option 1', 'Option 2'],
      properties: [
        {
          value: 'value',
          code: '<wt-checkbox :value="value"></wt-checkbox>',
          type: ['String', 'Boolean'],
          default: '',
          description: 'Checkbox value, which should be present in checked list, if checked',
        },
        {
          value: 'selected',
          code: '<wt-checkbox :selected="value"></wt-checkbox>',
          type: ['Array', 'Boolean'],
          default: '[]',
          description: '[V-MODEL] Variable-accumulator, which contains checkbox value (or values, if array)',
        },
        {
          value: 'label',
          code: '<wt-checkbox label="Label"></wt-checkbox>',
          type: 'String',
          default: '',
        },
        {
          value: 'disabled',
          code: '<wt-checkbox disabled></wt-checkbox>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'outline',
          code: '<wt-checkbox outline></wt-checkbox>',
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

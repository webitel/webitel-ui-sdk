<template>
  <section>
    <h2>Tags Input</h2>
    <article>
      <div class="example-wrapper">
        <wt-tags-input
          v-model="value"
          label="Tags Input"
          :autocomplete-items="autocomplete"
          :add-only-from-autocomplete="false"
        ></wt-tags-input>
        <pre><code class="language-html">
          &lt;wt-tags-input
                v-model="value"
                label="Tags Input"
                :autocomplete-items="autocomplete"
                :add-only-from-autocomplete="false"
          &gt;
          &lt;/wt-tags-input&gt;
        </code></pre>
      </div>
      <div class="example-wrapper">
        <wt-tags-input
          v-model="value"
          label="Disabled Tags Input"
          disabled
        ></wt-tags-input>
        <wt-tags-input
          v-model="value"
          label="Invalid Tags Input"
          :v="vInvalid"
        ></wt-tags-input>
      </div>
    </article>
    <component-model></component-model>
    <h3>Full docs: <a class="full-docs-link" href="https://vue-tags-input.com/#/">Vue
      Tags Input</a></h3>
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
  name: 'wt-tags-input-docs',
  data: () => ({
    vInvalid: {
      $error: true,
      $dirty: true,
      required: false,
    },
    value: [{ name: 'Vue.js' }],
    autocomplete: [
      { name: 'Vue.js', language: 'JavaScript' },
      { name: 'Adonis', language: 'JavaScript' },
      { name: 'Rails', language: 'Ruby' },
    ],
    properties: [
      {
        value: 'value',
        code: '<wt-tags-input :value="value"></wt-tags-input>',
        type: 'Array',
        description: 'Array of value objects. Should have "text", "name" or "value" prop to display (in this priority order)',
      },
      {
        value: 'autocompleteItems',
        code: '<wt-tags-input :options="options"></wt-tags-input>',
        type: 'Array',
        default: '[]',
        description: 'Expects an array containing objects inside. The objects can have the same properties as a tag object.',
      },
      {
        value: 'label',
        code: '<wt-tags-input label="Label"></wt-tags-input>',
        type: 'String',
        default: '',
      },
      {
        value: 'placeholder',
        code: '<wt-tags-input placeholder="placeholder"></wt-tags-input>',
        type: 'String',
        default: 'label value',
      },
      {
        value: 'autocompleteMinLength',
        code: '<wt-tags-input autocomplete-min-length="1"></wt-tags-input>',
        type: 'Number',
        default: '0',
        description: 'The minimum character length which is required until the autocomplete layer is shown. If set to 0, then it\'ll be shown on focus.',
      },
      {
        value: 'addOnlyFromAutocomplete',
        code: '<wt-tags-input :close-on-tags-input="false"></wt-tags-input>',
        type: 'Boolean',
        default: 'false',
        description: 'If false, user can enter custom values at enter keypress',
      },
      {
        value: 'autocompleteFilterDuplicates',
        code: '<wt-tags-input :autocomplete-filter-duplicates="false"></wt-tags-input>',
        type: 'Boolean',
        default: 'false',
        description: 'Filters autocomplete duplicate values',
      },
      {
        value: 'disabled',
        code: '<wt-tags-input disabled></wt-tags-input>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'required',
        code: '<wt-input required></wt-input>',
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
          {
            name: 'value', type: ['Array'], description: `tags-changed value. Important: each object
              in result array will contain "text property" as VueTagsInput component represents only this
              property in tag view`,
          },
        ],
      },
      {
        value: 'search',
        params: [
          {
            name: 'value', type: ['String'], description: 'vue-tags-input "input" value.',
          },
        ],
      },
      {
        value: 'plus all vue-tags-input native events. For more information, see vue-tags-input docs.',
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

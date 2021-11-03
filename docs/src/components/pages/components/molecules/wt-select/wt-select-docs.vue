<template>
  <section>
    <h2>Select</h2>
    <article>
      <div class="example-wrapper">
        <wt-select
          v-model="value"
          :options="options"
          label="Select"
          track-by="name"
        ></wt-select>
        <pre><code class="language-html">
          &lt;wt-select
            v-model="value"
            :options="options"
            label="Select"
            track-by="name"
          &gt;
          &lt;/wt-select&gt;
        </code></pre>
      </div>
      <div class="example-wrapper">
        <wt-select
          v-model="multipleValue"
          :options="options"
          :close-on-select="false"
          label="Multiple Select"
          track-by="name"
          :v="vValid"
          multiple
        ></wt-select>
        <pre><code class="language-html">
          &lt;wt-select
            v-model="multipleValue"
            :options="options"
            :close-on-select="false"
            label="Multiple Select"
            track-by="name"
            :v="vValid"
            multiple
          &gt;
          &lt;/wt-select&gt;
        </code></pre>
      </div>
      <div class="example-wrapper">
        <wt-select
          v-model="value"
          label="Disabled Select"
          track-by="name"
          disabled
        ></wt-select>
        <wt-select
          v-model="value"
          label="Invalid Select"
          track-by="name"
          :v="vInvalid"
        ></wt-select>
      </div>
    </article>
    <p><b>In order to work with single object value, you need to pass '' as default to see placeholder</b></p>
    <component-model
    ></component-model>
    <h3>Full docs: <a class="full-docs-link" href="https://vue-multiselect.js.org/">Vue
      Multiselect</a></h3>
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
  name: 'wt-select-docs',
  data: () => ({
    vValid: {
      $error: false,
      $dirty: true,
    },
    vInvalid: {
      $error: true,
      $dirty: true,
      required: false,
    },
    value: '',
    multipleValue: [],
    options: [
      { name: 'Vue.js1', language: 'JavaScript' },
      { name: 'Adonis2', language: 'JavaScript' },
      { name: 'Rails3', language: 'Ruby' },
      { name: 'Sinatra4', language: 'Ruby' },
      { name: 'Laravel5', language: 'PHP' },
      { name: 'Phoenix6', language: 'Elixir' },
      { name: 'Vue.js7', language: 'JavaScript' },
      { name: 'Adonis8', language: 'JavaScript' },
      { name: 'Rails9', language: 'Ruby' },
      { name: 'Sinatra10', language: 'Ruby' },
      { name: 'Laravel11', language: 'PHP' },
      { name: 'Phoenix12', language: 'Elixir' },
    ],
    properties: [
      {
        value: 'value',
        code: '<wt-select :value="value"></wt-select>',
        type: 'any',
      },
      {
        value: 'options',
        code: '<wt-select :options="options"></wt-select>',
        type: 'Array',
        default: '[]',
      },
      {
        value: 'label',
        code: '<wt-select label="Label"></wt-select>',
        type: 'String',
        default: '',
      },
      {
        value: 'placeholder',
        code: '<wt-select placeholder="placeholder"></wt-select>',
        type: 'String',
        default: 'label value',
      },
      {
        value: 'trackBy',
        code: '<wt-select trackBy="id"></wt-select>',
        type: 'String',
        default: 'id',
        description: 'Used to compare objects. IF OPTIONS ARE STRINGS, PROP "null" VALUE IS REQUIRED.',
      },
      {
        value: 'multiple',
        code: '<wt-select multiple></wt-select>',
        type: 'Boolean',
        default: 'false',
        description: 'Make multiselect',
      },
      {
        value: 'closeOnSelect',
        code: '<wt-select close-on-select></wt-select>',
        type: 'Boolean',
        default: 'true',
      },
      {
        value: 'optionLabel',
        code: '<wt-select track-by="id"></wt-select>',
        type: 'String',
        default: 'id',
        description: 'Used to compare objects. Only use if options are objects.',
      },
      {
        value: 'internalSearch',
        code: '<wt-select internal-search></wt-select>',
        type: 'Boolean',
        default: 'true',
        description: 'Decide whether to filter the results internally based on search query. Useful for async filtering, where we search through more complex data.',
      },
      {
        value: 'search',
        code: '<wt-select search="() => {}"></wt-select>',
        type: 'Function',
        description: 'External search api function',
      },
      {
        value: 'disabled',
        code: '<wt-select disabled></wt-select>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'searchable',
        code: '<wt-select searchable></wt-select>',
        type: 'Boolean',
        default: 'true',
        description: 'Add / removes search select',
      },
      {
        value: 'required',
        code: '<wt-input required></wt-input>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'allowEmpty',
        code: '<wt-select allow-empty></wt-select>',
        type: 'Boolean',
        default: 'false',
        description: 'Allows to remove all selected values. Otherwise one must be left selected.',
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
          { name: 'value', type: ['String', 'Array'] },
        ],
      },
      {
        value: 'reset',
        params: [
          { name: 'value', type: "['String', 'Array', 'Object'] -- depends on value prop datatype" },
        ],
        description: 'Emitted on "reset" icon click, along with "input" (input is emitted first) '
          + 'event with empty value',
      },
      {
        value: 'closed',
      },
      {
        value: 'Plus all vue-multiselect events',
      },
    ],
    slots: [
      {
        name: 'label',
        scope: [{ name: 'label' }],
        description: 'Custom label slot',
      },
      {
        name: 'option',
        scope: [{ name: 'option', description: 'option itself' }, { name: 'optionLabel', description: 'optionLabel prop' }],
        description: 'Watch vue-multiselect option slot',
      },
      {
        name: 'singleLabel',
        scope: [{ name: 'option', description: 'option itself' }, { name: 'optionLabel', description: 'optionLabel prop' }],
        description: 'Watch vue-multiselect singleLabel slot',
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

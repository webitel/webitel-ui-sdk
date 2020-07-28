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
    <component-model
    ></component-model>
    <h3>Full docs: <a class="full-docs-link" href="https://vue-multiselect.js.org/">Vue Multiselect</a></h3>
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
    name: 'select-page',
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
          value: 'type',
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
          code: '<wt-input label="Label"></wt-input>',
          type: 'String',
          default: '',
        },
        {
          value: 'placeholder',
          code: '<wt-input placeholder="placeholder"></wt-input>',
          type: 'String',
          default: 'label value',
        },
        {
          value: 'trackBy',
          code: '<wt-input trackBy="id"></wt-input>',
          type: 'String',
          default: 'id',
          description: 'Used to compare objects. Only use if options are objects.',
        },
        {
          value: 'multiple',
          code: '<wt-input multiple></wt-input>',
          type: 'Boolean',
          default: 'false',
          description: 'Make multiselect',
        },
        {
          value: 'closeOnSelect',
          code: '<wt-input close-on-select></wt-input>',
          type: 'Boolean',
          default: 'true',
        },
        {
          value: 'optionLabel',
          code: '<wt-input track-by="id"></wt-input>',
          type: 'String',
          default: 'id',
          description: 'Used to compare objects. Only use if options are objects.',
        },
        {
          value: 'internalSearch',
          code: '<wt-input internal-search></wt-input>',
          type: 'Boolean',
          default: 'true',
          description: 'Decide whether to filter the results internally based on search query. Useful for async filtering, where we search through more complex data.',
        },
        {
          value: 'search',
          code: '<wt-input search="() => {}"></wt-input>',
          type: 'Function',
          description: 'External search api function',
        },
        {
          value: 'disabled',
          code: '<wt-input disabled></wt-input>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'searchable',
          code: '<wt-input searchable></wt-input>',
          type: 'Boolean',
          default: 'true',
          description: 'Add / removes search input',
        },
        {
          value: 'allowEmpty',
          code: '<wt-input allow-empty></wt-input>',
          type: 'Boolean',
          default: 'false',
          description: 'Allows to remove all selected values. Otherwise one must be left selected.',
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
          value: 'closed',
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

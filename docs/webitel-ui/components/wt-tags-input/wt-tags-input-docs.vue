<template>
  <section>
    <h2>Tags Input</h2>
    <article>
      <div class="example-wrapper">
        <wt-tags-input
          v-model="value"
          label="Tags Input"
          :options="autocomplete"
          track-by="name"
          taggable
        ></wt-tags-input>
        <pre><code class="language-html">
          &lt;wt-tags-input
            v-model="value"
            label="Tags Input"
            :options="autocomplete"
            taggable
          &gt;&lt;/wt-tags-input&gt;
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
    <h3>This component is built on top of <a class="full-docs-link" href="https://vue-multiselect.js.org/">Vue
      Multiselect</a>, like wt-select component.
      There will be described only differences from wt-select component. Same props, events and slots are listed on wt-select page.
      For more information, see <a class="full-docs-link" href="https://dev.webitel.com/ui-sdk/components/select">WtSelect Docs</a></h3>
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
  name: 'wt-tags-input-docs',
  data: () => ({
    vInvalid: {
      $error: true,
      $dirty: true,
      required: false,
    },
    value: [],
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
      },
      {
        value: 'taggable',
        code: '<wt-tags-input taggable></wt-tags-input>',
        type: 'Boolean',
        default: 'false',
        description: 'If true, user can add tags by himself',
      },
      {
        value: 'trackBy',
        code: '<wt-tags-input track-by="label"></wt-tags-input>',
        type: 'String',
        default: 'null',
        description: 'Default mode for tags input is array of strings, not objects (that is the difference between tags input and select).',
      },
      {
        value: 'optionLabel',
        code: '<wt-tags-input option-label="label"></wt-tags-input>',
        type: 'String',
        default: 'null',
        description: 'Represented property of select object. REQUIRED IN OBJECT-DATA TAG-INPUTS TO PREVENT OPTION DUPLICATION.',
      },
      {
        value: 'manualTagging',
        code: '<wt-tags-input manual-tagging></wt-tags-input>',
        type: 'Boolean',
        default: 'false',
        description: `
      False: "tag" method automatically pushes { optionLabel | "name", trackBy } object to value
      array and $emits "input" event.

      True: "tag" method only $emits "tag" event. Tag addition is responsibility of client side.
    `,
      },
    ],
    events: [
      {
        value: 'tag',
        params: [
          {
            name: 'tag', type: ['String'], description: 'vue-multiselect "tag" value.',
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

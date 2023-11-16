<template>
  <section>
    <h2>Search bar</h2>
    <article>
      <div class="example-wrapper">
        <wt-search-bar
          v-model="value"
          placeholder="Search"
        ></wt-search-bar>
        <pre><code class="language-html">&lt;wt-search-bar v-model="value" label="Search"&gt;&lt;/wt-search-bar&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-search-bar
          v-model="value"
          :hint="'Hint'"
          :v="vInvalid"
          placeholder="Search"
        ></wt-search-bar>
        <pre><code class="language-html">&lt;wt-search-bar v-model="value" label="Search" :v="vInvalid" :hint="'Hint'" &gt;&lt;/wt-search-bar&gt;</code></pre>
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
    name: 'wt-search-bar-docs',
    data: () => ({
      value: '',
      properties: [
        {
          value: 'value',
          code: '<wt-search-bar :value="value"></wt-search-bar>',
          type: 'String',
          default: '',
        },
        {
          value: 'placeholder',
          code: '<wt-search-bar placeholder="placeholder"></wt-search-bar>',
          type: 'String',
          default: 'Search',
        },
        {
          value: 'debounce',
          code: '<wt-search-bar debounce></wt-search-bar>',
          type: 'Boolean',
          default: 'false',
          description: 'If true, @search event is delayed for debounceDelay from last change',
        },
        {
          value: 'debounceDelay',
          code: '<wt-search-bar debounce-delay="2000" debounce></wt-search-bar>',
          type: 'Number',
          default: '1000',
        },
        {
          value: 'outline',
          code: '<wt-search-bar outline></wt-search-bar>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'hint',
          code: '<wt-search-bar :hint="\'Hint\'"></wt-search-bar>',
          type: 'String',
        },
        {
          value: 'v',
          code: '<wt-search-bar :v="vInvalid"></wt-search-bar>',
          type: 'Object',
          default: '',
        },
        {
          value: 'customValidators',
          code: '<wt-search-bar :custom-validators="[customV]"></wt-search-bar>',
          type: 'Array',
          default: '() => []',
        },
      ],
      events: [
        {
          value: 'input',
          params: [
            { name: 'value', type: 'String', description: 'immediately sends changed value' },
          ],
        },
        {
          value: 'enter',
          params: [
            {
              name: 'value',
              type: 'String',
              description: 'immediately sends immediate changed value on Enter key press',
            },
          ],
        },
        {
          value: 'search',
          params: [
            {
              name: 'value',
              type: 'String',
              description: 'Sends changed value, immediately, or, if "debounced" is on, debounced. Recommended for api search requests',
            },
          ],
        },
        {
          value: 'PLUS ALL NATIVE INPUT EVENTS',
        },
      ],
      slots: [
        {
          name: 'search-icon',
          scope: [{ name: 'invalid', description: 'needed to change icons color in additional-actions slot' }],
          description: 'Change default search icon',
        },
        {
          name: 'additional-actions',
          scope: [{ name: 'invalid', description: 'needed to change icons color in additional-actions slot' }],
          description: 'Adding additional functionality to search bar. For example wt-context-menu',
        },
      ],
      vInvalid: {
        $error: true,
        $dirty: true,
        required: false,
      },
    }),
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
</style>

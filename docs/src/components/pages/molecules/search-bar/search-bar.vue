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
    </article>
    <component-model
    ></component-model>
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'search-bar',
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
      ],
    }),
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
</style>

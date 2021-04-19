<template>
  <section>
    <h2>Progress bar</h2>
    <article>
      <div class="example-wrapper">
        <wt-progress-bar :max="100" :value="85" color="success"></wt-progress-bar>
        <pre><code
          class="language-html">&lt;wt-progress-bar :max="100" :value="85" color="success"&gt;&lt;/wt-progress-bar&gt;</code></pre>
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
    name: 'wt-progress-bar-docs',
    data: () => ({
      properties: [
        {
          value: 'max',
          code: '<wt-progress-bar :max="10"></wt-progress-bar>',
          type: 'Number',
          default: '100',
          description: 'Max progress bar value',
        },
        {
          value: 'value',
          code: '<wt-progress-bar :value="10"></wt-progress-bar>',
          type: 'Number',
          description: 'Current progress bar value',
        },
        {
          value: 'color',
          code: '<wt-progress-bar color="success"></wt-progress-bar>',
          type: 'String',
          options: ['primary', 'secondary', 'success', 'danger'],
          description: 'Progress color',
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

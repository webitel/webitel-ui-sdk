<template>
  <section>
    <h2>Progress bar</h2>
    <article>
      <div class="example-wrapper">
        <wt-progress-bar
          :max="100"
          :value="85"
          color="success"
        />
        <pre><code
        class="language-html"
        >&lt;wt-progress-bar :max="100" :value="85" color="success"&gt;&lt;/wt-progress-bar&gt;</code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    />
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'WtProgressBarDocs',
    data: () => ({
      properties: [
        {
          value: 'max',
          code: '<wt-progress-bar :max="10"></wt-progress-bar>',
          type: ['Number', 'String'],
          default: '100',
          description: 'Max progress bar value',
        },
        {
          value: 'value',
          code: '<wt-progress-bar :value="10"></wt-progress-bar>',
          type: ['Number', 'String'],
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

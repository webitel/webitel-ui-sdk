<template>
  <section>
    <h2>Indicator</h2>
    <article>
      <div class="example-wrapper">
        <wt-indicator color="primary" text="Indicator"></wt-indicator>
        <pre><code class="language-html">&lt;wt-indicator color="primary" text="Indicator"&gt;&lt;/wt-indicator&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-indicator color="primary" text="Sm size Indicator" size="sm"></wt-indicator>
        <pre><code class="language-html">&lt;wt-indicator color="primary" text="Sm size Indicator" size="sm"&gt;&lt;/wt-indicator&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-indicator color="primary" text="Primary color"></wt-indicator>
        <wt-indicator color="secondary" text="Secondary color"></wt-indicator>
        <wt-indicator color="disabled" text="Disabled color"></wt-indicator>
        <wt-indicator color="success" text="Success color"></wt-indicator>
        <wt-indicator color="danger" text="Danger color"></wt-indicator>
        <wt-indicator color="break-out" text="Break-out color"></wt-indicator>
        <wt-indicator color="transfer" text="Transfer color"></wt-indicator>
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
    name: 'wt-indicator-docs',
    data: () => ({
      properties: [
        {
          value: 'color',
          code: '<wt-icon color="danger"></wt-icon>',
          type: ['String', 'Number'],
          options: ['primary', 'secondary', 'success', 'danger', 'transfer', 'disabled', 'break-out'],
          default: 'secondary',
        },
        {
          value: 'text',
          code: '<wt-icon text="Hello there!"></wt-icon>',
          type: 'String',
        },
        {
          value: 'size',
          code: '<wt-icon size="sm"></wt-icon>',
          type: 'String',
          options: ['sm', 'md'],
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

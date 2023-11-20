<template>
  <section>
    <h2>Indicator</h2>
    <article>
      <div class="example-wrapper">
        <wt-indicator
          color="primary"
          text="Indicator"
        />
        <pre><code class="language-html">&lt;wt-indicator color="primary" text="Indicator"&gt;&lt;/wt-indicator&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-indicator
          color="primary"
          text="Sm size Indicator"
          size="sm"
        />
        <pre><code class="language-html">&lt;wt-indicator color="primary" text="Sm size Indicator" size="sm"&gt;&lt;/wt-indicator&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-indicator
          color="primary"
          text="Primary color"
        />
        <wt-indicator
          color="secondary"
          text="Secondary color"
        />
        <wt-indicator
          color="disabled"
          text="Disabled color"
        />
        <wt-indicator
          color="success"
          text="Success color"
        />
        <wt-indicator
          color="danger"
          text="Danger color"
        />
        <wt-indicator
          color="break-out"
          text="Break-out color"
        />
        <wt-indicator
          color="transfer"
          text="Transfer color"
        />
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
    name: 'WtIndicatorDocs',
    data: () => ({
      properties: [
        {
          value: 'color',
          code: '<wt-indicator color="danger"></wt-indicator>',
          type: ['String', 'Number'],
          options: ['primary', 'secondary', 'success', 'danger', 'transfer', 'disabled', 'break-out'],
          default: 'secondary',
        },
        {
          value: 'text',
          code: '<wt-indicator text="Hello there!"></wt-indicator>',
          type: 'String',
        },
        {
          value: 'size',
          code: '<wt-indicator size="sm"></wt-indicator>',
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

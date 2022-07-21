<template>
  <section>
    <h2>Context Menu</h2>
    <article>
      <div class="example-wrapper">
        <wt-context-menu :options="options"></wt-context-menu>
        <pre><code class="language-html">&lt;wt-context-menu :options="['Option-1', 'Option-2', 'Option-3', 'Option-4']"&gt;&lt;/wt-context-menu&gt;</code></pre>
      </div>
    </article>
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
  name: 'wt-context-menu-docs',
  data: () => ({
    options: ['Option-1', 'Option-2', 'Option-3', 'Option-4'],
    properties: [
      {
        value: 'options',
        code: ' <wt-context-menu :options="options"></wt-context-menu>',
        type: 'Array',
        description: 'Can be [{ name: text }] or ["text"]. If options will be Array of objects, you can apply to name of option like "option.name" ',
        required: true,
      },
      {
        value: 'visible',
        code: ' <wt-context-menu :options="options" :visible="true"></wt-context-menu>',
        type: 'Boolean',
        default: 'true',
      },
      {
        value: 'width',
        code: ' <wt-context-menu width="300px"></wt-context-menu>',
        type: ['String'],
        default: 'auto',
      },
      {
        value: 'minWidth',
        code: ' <wt-context-menu min-width="300px"></wt-context-menu>',
        type: ['String'],
        default: '160px',
      },
      {
        value: 'width',
        code: ' <wt-context-menu max-width="300px"></wt-context-menu>',
        type: ['String'],
        default: '300px',
      },
    ],
    events: [
      {
        value: 'click',
        params: [
          { name: 'Option and index', type: 'Object' },
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
section {
  .wt-context-menu::v-deep {
    // FIXME: REMOVE AFTER DEFAULT STYLES REFACTOR
    list-style: none!important;

    .wt-context-menu__option-wrapper {
      margin: 0;
      padding: 0;

      .wt-context-menu__option {
        text-decoration: none;
      }
    }
  }
}
</style>

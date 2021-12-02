<template>
  <section>
    <h2>Button Select</h2>
    <article>
      <div class="example-wrapper">
        <wt-button-select :options="options">Primary</wt-button-select>
        <pre><code
          class="language-html">&lt;wt-button-select :options="['Option-1', 'Option-2', 'Option-3', 'Option-4']"&gt;Primary button&lt;/wt-button-select&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-button-select>Primary</wt-button-select>
        <wt-button-select color="secondary" :options="options">Secondary</wt-button-select>
        <wt-button-select disabled :options="options">Disabled</wt-button-select>
        <wt-button-select color="success" :options="options">Success</wt-button-select>
        <wt-button-select color="danger" :options="options">Danger</wt-button-select>
        <wt-button-select color="transfer" :options="options">Transfer</wt-button-select>
      </div>
      <div class="example-wrapper">
        <wt-button-select outline :options="options">Primary</wt-button-select>
        <wt-button-select outline color="secondary" :options="options">Secondary</wt-button-select>
        <wt-button-select outline disabled :options="options">Disabled</wt-button-select>
        <wt-button-select outline color="success" :options="options">Success</wt-button-select>
        <wt-button-select outline color="danger" :options="options">Danger</wt-button-select>
        <wt-button-select outline color="transfer" :options="options">Transfer</wt-button-select>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-events
      :events="events"
    ></component-events>
    <component-slots
    ></component-slots>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'wt-button-select-docs',
  data: () => ({
    options: ['Option-1', 'Option-2', 'Option-3', 'Option-4'],
    properties: [
      {
        value: 'options',
        code: ' <wt-context-menu :options="options"></wt-context-menu>',
        type: 'Array',
        description: 'Just like in Context Menu component',
        required: true,
      },
      {
        value: '+ all pops witch are in wt-button component',
      },
    ],
    events: [
      {
        value: 'click',
        params: [
          { name: 'event', type: 'Event' },
        ],
      },
      {
        value: 'click:option',
        params: [
          { name: 'Option', type: 'Object' },
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
  section::v-deep {
    .wt-button-select {
      .wt-context-menu {
        // FIXME: REMOVE AFTER DEFAULT STYLES REFACTOR
        list-style: none;

        .wt-context-menu__option-wrapper {
          margin: 0;
          padding: 0;

          .wt-context-menu__option {
            text-decoration: none;
          }
        }
      }
    }
  }
</style>

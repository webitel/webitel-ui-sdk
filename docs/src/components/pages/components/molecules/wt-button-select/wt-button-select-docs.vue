<template>
  <section>
    <h2>Buttons Select</h2>
    <article>
      <div class="example-wrapper">
        <wt-button-select :options="options">Primary</wt-button-select>
        <pre><code
          class="language-html">&lt;wt-button-select&gt;Primary button&lt;/wt-button-select&gt;</code></pre>
      </div>
      <div class="example-wrapper">
        <wt-button-select>Primary</wt-button-select>
        <wt-button-select color="secondary">Secondary</wt-button-select>
        <wt-button-select disabled>Disabled</wt-button-select>
        <wt-button-select color="success">Success</wt-button-select>
        <wt-button-select color="danger">Danger</wt-button-select>
        <wt-button-select color="transfer">Transfer</wt-button-select>
      </div>
      <div class="example-wrapper">
        <wt-button-select outline>Primary</wt-button-select>
        <wt-button-select outline color="secondary">Secondary</wt-button-select>
        <wt-button-select outline disabled>Disabled</wt-button-select>
        <wt-button-select outline color="success">Success</wt-button-select>
        <wt-button-select outline color="danger">Danger</wt-button-select>
        <wt-button-select outline color="transfer">Transfer</wt-button-select>
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
        description: 'Can be [{ name: text }] or ["text"]. If options will be Array of objects, you can apply to name of option like "option.name" ',
        required: true,
      },
      {
        value: 'color',
        code: '<wt-button-select color="primary"></wt-button-select>',
        type: 'String',
        options: ['"primary", "secondary", "success", "danger", "transfer"'],
        default: 'primary',
      },
      {
        value: 'disabled',
        code: '<wt-button-select disabled></wt-button-select>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'outline',
        code: '<wt-button-select outline></wt-button-select>',
        type: 'Boolean',
        default: 'false',
        description: 'Changes button style to alternative (outlined)',
      },
      {
        value: 'loading',
        code: '<wt-button-select loading></wt-button-select>',
        type: 'Boolean',
        default: 'false',
        description: 'Displays loader instead of text (only for button with text)',
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

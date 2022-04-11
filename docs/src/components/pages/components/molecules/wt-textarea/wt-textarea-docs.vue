<template>
  <section>
    <h2>Textarea</h2>
    <article>
      <div class="example-wrapper">
        <wt-textarea
          v-model="value"
          name="textarea-textarea"
          label="Textarea"
        ></wt-textarea>
        <pre><code class="language-html">&lt;wt-textarea v-model="value" label="Textarea" name="textarea-textarea"&gt;&lt;/wt-textarea&gt;</code></pre>
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
    name: 'wt-textarea-docs',
    data: () => ({
      value: '',
      properties: [
        {
          value: 'value',
          code: '<wt-textarea :value="value"></wt-textarea>',
          type: 'String',
          default: '',
        },
        {
          value: 'label',
          code: '<wt-textarea label="Label"></wt-textarea>',
          type: 'String',
          default: '',
        },
        {
          value: 'placeholder',
          code: '<wt-textarea placeholder="placeholder"></wt-textarea>',
          type: 'String',
          default: 'label value',
        },
        {
          value: 'disabled',
          code: '<wt-input disabled></wt-input>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'name',
          code: '<wt-textarea name="my-textarea"></wt-textarea>',
          type: 'String',
          default: '',
          description: 'Input id name for label association',
        },
        {
          value: 'chatMode',
          code: '<wt-textarea chat-mode></wt-textarea>',
          type: 'Boolean',
          default: 'false',
          description: 'If passed, "Enter" key press emits "enter" event, new line is shift+enter',
        },
        {
          value: 'labelProps',
          code: '<wt-checkbox :label-props="{}"></wt-checkbox>',
          type: 'Object',
          description: 'Object with props, passed down to wt-label as props',
        },
      ],
      events: [
        {
          value: 'input',
          params: [
            { name: 'value', type: 'String' },
          ],
        },
        {
          value: 'enter',
          description: 'fires at enter key press "if chat-mode" is on',
        },
        {
          value: 'PLUS ALL NATIVE TEXTAREA EVENTS',
        },
      ],
      slots: [
        {
          name: 'label',
          scope: [{ name: 'label' }],
          description: 'Custom label slot',
        },
        {
          name: 'after-input',
          description: 'Pass anything you want to be after input (like icon actions), but inside border',
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

<template>
  <section>
    <h2>Input</h2>
    <article>
      <div class="example-wrapper">
        <wt-input
          v-model="value"
          label="Input"
          name="label-input"
        ></wt-input>
        <pre><code class="language-html">&lt;wt-input v-model="value" label="Input" name="label-input"&gt;&lt;/wt-input&gt;</code></pre>
      </div>
        <div class="example-wrapper">
        <wt-input
          v-model="value"
          label="Disabled"
          name="disabled-input"
          type="password"
          has-show-password
          disabled
        ></wt-input>
        </div>
      <div class="example-wrapper">
      <wt-input
          v-model="value"
          label="Password"
          name="password-input"
          type="password"
          :v="vValid"
          has-show-password
        ></wt-input>
      </div>
      <div class="example-wrapper">
      <wt-input
          v-model="value"
          label="Invalid input"
          name="invalid-input"
          :v="vInvalid"
        ></wt-input>
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
    name: 'input-page',
    data: () => ({
      value: 'str value',
      vValid: {
        $error: false,
        $dirty: true,
      },
      vInvalid: {
        $error: true,
        $dirty: true,
        required: false,
      },
      properties: [
        {
          value: 'value',
          code: '<wt-input :value="value"></wt-input>',
          type: ['String', 'Number'],
          default: '',
        },
        {
          value: 'label',
          code: '<wt-input label="Label"></wt-input>',
          type: 'String',
          default: '',
        },
        {
          value: 'placeholder',
          code: '<wt-input placeholder="placeholder"></wt-input>',
          type: 'String',
          default: 'label value',
        },
        {
          value: 'name',
          code: '<wt-input name="my-input"></wt-input>',
          type: 'String',
          default: '',
          description: 'Input id name for label association',
        },
        {
          value: 'type',
          code: '<wt-input type="number"></wt-input>',
          type: 'String',
          default: 'text',
        },
        {
          value: 'required',
          code: '<wt-input required></wt-input>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'disabled',
          code: '<wt-input disabled></wt-input>',
          type: 'Boolean',
          default: 'false',
        },
        {
          value: 'hasShowPassword',
          code: '<wt-input has-show-password></wt-input>',
          type: 'Boolean',
          default: 'false',
          description: 'If type=password and this, shows eye icon',
        },
        {
          value: 'numberMin',
          code: '<wt-input :number-min="0"></wt-input>',
          type: 'Number',
          default: '0',
          description: 'Native number input restrictions',
        },
        {
          value: 'numberMax',
          code: '<wt-input :number-max="10"></wt-input>',
          type: 'Number',
          description: 'Native number input restrictions',
        },
        {
          value: 'outline',
          code: '<wt-input outline></wt-input>',
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

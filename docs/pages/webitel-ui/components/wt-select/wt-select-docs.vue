<template>
  <component-model />

  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
  <component-slots
    :slots="slots"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtSelectDocs',
  data: () => ({
    properties: [
      {
        value: 'value',
        code: '<wt-select :value="\'my value\'"></wt-select>',
        type: 'any',
      },
      {
        value: 'options',
        code: '<wt-select :options="[1, 2, 3]"></wt-select>',
        type: 'Array',
        default: '[]',
      },
      {
        value: 'label',
        code: '<wt-select label="Label"></wt-select>',
        type: 'String',
        default: '',
      },
      {
        value: 'placeholder',
        code: '<wt-select placeholder="placeholder"></wt-select>',
        type: 'String',
        default: 'label value',
      },
      {
        value: 'trackBy',
        code: '<wt-select trackBy="id"></wt-select>',
        type: 'String',
        default: 'id',
        description: 'Used to compare objects. IF OPTIONS ARE STRINGS, PROP "null" VALUE IS REQUIRED.',
      },
      {
        value: 'multiple',
        code: '<wt-select multiple></wt-select>',
        type: 'Boolean',
        default: 'false',
        description: 'VUE-MULTISELECT PROP: Make multiselect',
      },
      {
        value: 'closeOnSelect',
        code: '<wt-select close-on-select></wt-select>',
        type: 'Boolean',
        default: 'true',
        description: 'VUE-MULTISELECT PROP',
      },
      {
        value: 'optionLabel',
        code: '<wt-select track-by="id"></wt-select>',
        type: 'String',
        default: 'id',
        description: 'Used to compare objects. Only use if options are objects.',
      },
      {
        value: 'search-method',
        code: '<wt-select search="({ search, size }) => ({ items, next })"></wt-select>',
        type: 'Function',
        description: `External search api function. Select works in api mode, if passed.
         Response object should have "items" and "next" properties`,
      },
      {
        value: 'disabled',
        code: '<wt-select disabled></wt-select>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'required',
        code: '<wt-input required></wt-input>',
        type: 'Boolean',
        default: 'false',
      },
      {
        value: 'allowEmpty',
        code: '<wt-select allow-empty></wt-select>',
        type: 'Boolean',
        default: 'false',
        description: 'Allows to remove all selected values. Otherwise one must be left selected.',
      },
      {
        value: 'labelProps',
        code: '<wt-select :label-props="{}"></wt-select>',
        type: 'Object',
        description: 'Object with props, passed down to wt-label as props',
      },
      {
        value: 'allowCustomValues',
        code: '<wt-select allow-custom-values></wt-select>',
        type: 'Boolean',
        default: 'false',
        description: 'Allows to add custom values. After addition custom value will be in this.value and in options. ' +
          'Custom value will be cleared after the page is reloaded if it was not selected as a value',
      },
      {
        value: 'PLUS ALL VUE_MUTLISELECT PROPS',
      },
    ],
    events: [
      {
        value: 'input',
        params: [
          { name: 'value', type: ['String', 'Array'] },
        ],
      },
      {
        value: 'reset',
        params: [
          { name: 'value', type: '[\'String\', \'Array\', \'Object\'] -- depends on value prop datatype' },
        ],
        description: 'Emitted on "reset" icon click, along with "input" (input is emitted first) '
          + 'event with empty value',
      },
      {
        value: 'closed',
      },
      {
        value: 'custom-value',
        description: 'Event fires when allowCustomValues and new customValue is added',
      },
      {
        value: 'Plus all vue-multiselect events',
      },
    ],
    slots: [
      {
        name: 'label',
        scope: [{ name: 'label' }],
        description: 'Custom label slot',
      },
      {
        name: 'option',
        scope: [
          { name: 'option', description: 'option itself' },
          { name: 'optionLabel', description: 'optionLabel prop' },
        ],
        description: 'Watch vue-multiselect option slot',
      },
      {
        name: 'singleLabel',
        scope: [
          { name: 'option', description: 'option itself' },
          { name: 'optionLabel', description: 'optionLabel prop' },
        ],
        description: 'Watch vue-multiselect singleLabel slot',
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

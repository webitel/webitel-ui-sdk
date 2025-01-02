<script setup>
import ExampleSelect from './examples/example-select.vue';
import ExampleMultipleSelect from './examples/example-multiple-select.vue';
import ExampleDisabledSelect from './examples/example-disabled-select.vue';
import ExampleInvalidSelect from './examples/example-invalid-select.vue';
import ExampleCustomValuesSelect from './examples/example-custom-values-select.vue';
import ExampleValueFromOptionsByPropSelect from './examples/example-value-from-options-by-prop-select.vue';
</script>

# WtSelect

### Full docs: [Vue Multiselect](https://vue-multiselect.js.org/)

## Props

| Prop              | Type     | Default     | Code                                                                       | Description                                                                                                                                                                             |
| ----------------- | -------- | ----------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value             | Any      |             | `<wt-select :value="'my value'"></wt-select>`                              |                                                                                                                                                                                         |
| options           | Array    | []          | `<wt-select :options="[1, 2, 3]"></wt-select>`                             |                                                                                                                                                                                         |
| label             | String   | ''          | `<wt-select label="Label"></wt-select>`                                    |                                                                                                                                                                                         |
| placeholder       | String   | label value | `<wt-select placeholder="placeholder"></wt-select>`                        |                                                                                                                                                                                         |
| trackBy           | String   | id          | `<wt-select trackBy="id"></wt-select>`                                     | Used to compare objects. IF OPTIONS ARE STRINGS, PROP "null" VALUE IS REQUIRED.                                                                                                         |
| multiple          | Boolean  | false       | `<wt-select multiple></wt-select>`                                         | VUE-MULTISELECT PROP: Make multiselect                                                                                                                                                  |
| closeOnSelect     | Boolean  | true        | `<wt-select close-on-select></wt-select>`                                  | VUE-MULTISELECT PROP                                                                                                                                                                    |
| optionLabel       | String   | id          | `<wt-select track-by="id"></wt-select>`                                    | Used to compare objects. Only use if options are objects                                                                                                                                |
| search-method     | Function |             | `<wt-select search="({ search, size }) => ({ items, next })"></wt-select>` | External search api function. Select works in api mode, if passed.Response object should have "items" and "next" properties                                                             |
| disabled          | Boolean  | false       | `<wt-select disabled></wt-select>`                                         |                                                                                                                                                                                         |
| required          | Boolean  | false       | `<wt-select required></wt-select>`                                         |                                                                                                                                                                                         |
| allowEmpty        | Boolean  | false       | `<wt-select allow-empty></wt-select>`                                      | Allows to remove all selected values. Otherwise one must be left selected.                                                                                                              |
| labelProps        | Object   |             | `<wt-select :label-props="{}"></wt-select>`                                | Object with props, passed down to wt-label as props                                                                                                                                     |
| allowCustomValues | Boolean  | false       | `<wt-select allow-custom-values></wt-select>`                              | llows to add custom values. After addition custom value will be in this.value and in options.Custom value will be cleared after the page is reloaded if it was not selected as a value' |

#### PLUS ALL VUE_MUTLISELECT PROPS

## Events

| Value        | Params                                                                                               | Description                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| input        | `[{ name: 'value', type: ['String', 'Array'] }]`                                                     |                                                                                                   |
| reset        | `[{ name: 'value', type: '[\'String\', \'Array\', \'Object\'] -- depends on value prop datatype' }]` | Emitted on "reset" icon click, along with "input" (input is emitted first) event with empty value |
| closed       |                                                                                                      |                                                                                                   |
| custom-value |                                                                                                      | Event fires when allowCustomValues and new customValue is added                                   |

#### PLUS ALL VUE_MUTLISELECT EVENTS

## Slots

| Name        | Scope                                                                                                          | Description                            |
| ----------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| label       | `[{ name: 'label' }]`                                                                                          | Custom label slot                      |
| option      | `[{ name: 'option', description: 'option itself' },{ name: 'optionLabel', description: 'optionLabel prop' }]`  | Watch vue-multiselect option slot      |
| singleLabel | `[{ name: 'option', description: 'option itself' },{ name: 'optionLabel', description: 'optionLabel prop' },]` | Watch vue-multiselect singleLabel slot |

#### PLUS ALL VUE_MUTLISELECT SLOTS

## Example Select

::: raw
<ExampleSelect/>
:::

::: details Code
<<< ./examples/example-select.vue
:::

## Example Multiple Select

::: raw
<ExampleMultipleSelect/>
:::

::: details Code
<<< ./examples/example-multiple-select.vue
:::

## Example Disabled Select

::: raw
<ExampleDisabledSelect/>
:::

::: details Code
<<< ./examples/example-disabled-select.vue
:::

## Example Invalid Select

::: raw
<ExampleInvalidSelect/>
:::

::: details Code
<<< ./examples/example-invalid-select.vue
:::

## Example Custom Values Select

::: raw
<ExampleCustomValuesSelect/>
:::

::: details Code
<<< ./examples/example-custom-values-select.vue
:::

## Example Select With Value From Options By Prop

::: raw
<ExampleValueFromOptionsByPropSelect/>
:::

::: details Code
<<< ./examples/example-value-from-options-by-prop-select.vue
:::

## How to close Select programmatically?

[Issue](https://github.com/shentao/vue-multiselect/pull/947/files/05760bd1e92ce53353a1733aee054a996738f181)

```js
closeSelect();
{
  this.$refs['wt-select'].$refs['vue-multiselect'].deactivate(); // 'vue-multiselect' ref is always present
}
```

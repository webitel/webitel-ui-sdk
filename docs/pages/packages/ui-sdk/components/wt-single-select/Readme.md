<script setup>
import ExampleSingleSelect from './examples/example-single-select.vue';
import ExampleDisabledSingleSelect from './examples/example-disabled-single-select.vue';
import ExampleDisabledOptionsSingleSelect from './examples/example-disabled-options-single-select.vue';
import ExampleInvalidSingleSelect from './examples/example-invalid-single-select.vue';
import ExampleCustomValuesSingleSelect from './examples/example-custom-values-single-select.vue';
</script>

# WtSingleSelect

### Full docs: [PrimeVue Select](https://primevue.org/select/)

## Props

| Prop              | Type     | Default     | Description                                                             |
| ----------------- | -------- | ----------- | ----------------------------------------------------------------------- |
| modelValue        | Any      |             | Selected value (v-model)                                                |
| options           | Array    | []          | List of options                                                         |
| label             | String   | ''          | Input label                                                             |
| placeholder       | String   | label value | Input placeholder                                                       |
| optionLabel       | String   | 'label'     | Key used to display option label                                        |
| optionValue       | String   | ''          | Key used to extract a primitive value from the option object            |
| searchMethod      | Function |             | External search function `({ search, page }) => { items, next }`       |
| disabled          | Boolean  | false       | Disables the select                                                     |
| disabledOptions   | Boolean  | false       | Shows dropdown but disables all options                                 |
| filterable        | Boolean  | true        | Shows search input inside dropdown                                      |
| showClear         | Boolean  | false       | Shows clear button when a value is selected                             |
| required          | Boolean  | false       | Appends `*` to the label                                                |
| allowCustomValues | Boolean  | false       | Allows adding custom values via the search input (Enter to confirm)     |
| v                 | Object   |             | Vuelidate validation object                                             |
| regleValidation   | Object   |             | Regle validation field status                                           |
| customValidators  | Array    | []          | Custom validator array                                                  |
| labelProps        | Object   | {}          | Props passed down to `wt-label`                                         |

#### PLUS ALL PRIMEVUE SELECT PROPS

## Example Single Select

::: raw
<ExampleSingleSelect/>
:::

::: details Code
<<< ./examples/example-single-select.vue
:::

## Example Disabled Single Select

::: raw
<ExampleDisabledSingleSelect/>
:::

::: details Code
<<< ./examples/example-disabled-single-select.vue
:::

## Example Disabled Options Single Select

::: raw
<ExampleDisabledOptionsSingleSelect/>
:::

::: details Code
<<< ./examples/example-disabled-options-single-select.vue
:::

## Example Invalid Single Select

::: raw
<ExampleInvalidSingleSelect/>
:::

::: details Code
<<< ./examples/example-invalid-single-select.vue
:::

## Example Custom Values Single Select

::: raw
<ExampleCustomValuesSingleSelect/>
:::

::: details Code
<<< ./examples/example-custom-values-single-select.vue
:::

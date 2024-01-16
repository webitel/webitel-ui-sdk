<script setup>
import Docs from './wt-select-docs.vue';
import ExampleSelect from './examples/example-select.vue';
import ExampleMultipleSelect from './examples/example-multiple-select.vue';
import ExampleDisabledSelect from './examples/example-disabled-select.vue';
import ExampleInvalidSelect from './examples/example-invalid-select.vue';
import ExampleTaggableSelect from './examples/example-taggable-select.vue';
</script>

# WtSelect
###  Full docs: [Vue Multiselect](https://vue-multiselect.js.org/)

## Props
::: raw
<Docs/>
:::

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

## Example Taggable Select
::: raw
<ExampleTaggableSelect/>
:::

::: details Code
<<< ./examples/example-taggable-select.vue
:::

## How to close Select programmatically?
[Issue](https://github.com/shentao/vue-multiselect/pull/947/files/05760bd1e92ce53353a1733aee054a996738f181)
```js
closeSelect() {
  this.$refs['wt-select'].$refs['vue-multiselect'].deactivate(); // 'vue-multiselect' ref is always present
}
```

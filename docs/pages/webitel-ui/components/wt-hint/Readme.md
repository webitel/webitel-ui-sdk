<script setup>
import ExampleHint from './examples/example-hint.vue';
</script>

# WtHint

## Props

| Prop              | Type     | Default | Code                                                  | Description                                                                                                       |
|-------------------|----------|---------|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| iconColor         | String   | 'info'  | `<wt-hint :iconColor="'info'">{{ hint }}</wt-hint>`   | Prop for hint icon color. iconColor prop value can be the same as the color props values in the wt-icon component |
## Slots

| Name       | Scope                                                                                 | Description          |
|------------|---------------------------------------------------------------------------------------|----------------------|
| default    |                                                                                       | Default content slot |

## Example Hint
::: raw
<ExampleHint/>
:::

::: details Code
<<< ./examples/example-hint.vue
:::

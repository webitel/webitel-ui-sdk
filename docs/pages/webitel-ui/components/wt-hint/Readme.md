<script setup>
import ExampleHint from './examples/example-hint.vue';
</script>

# WtHint

## Props

| Prop              | Type     | Default | Code                                                  | Description              |
|-------------------|----------|---------|-------------------------------------------------------|--------------------------|
| iconColor         | String   | 'info'  | `<wt-hint :iconColor="'info'">{{ hint }}</wt-hint>`   | Prop for hint icon color |
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

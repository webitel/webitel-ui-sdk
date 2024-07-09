<script setup>
import ExampleContextMenu from './examples/example-context-menu.vue';
</script>

# WtContextMenu

## Props

| Prop     | Type       | Default | Code                                                                     | Description                                           |
|----------|------------|---------|--------------------------------------------------------------------------|-------------------------------------------------------|
| options  | Array      |         | `<wt-context-menu :options="options"></wt-context-menu>`                 | Array of objects [{ text: text, ?disabled: boolean }] |
| visible  | Boolean    | true    | `<wt-context-menu :options="options" :visible="true"></wt-context-menu>` |                                                       |
| width    | ['String'] | auto    | `<wt-context-menu width="300px"></wt-context-menu>`                      |                                                       |
| minWidth | ['String'] | 160px   | `<wt-context-menu min-width="300px"></wt-context-menu>`                  |                                                       |
| maxWidth | ['String'] | 300px   | `<wt-context-menu max-width="300px"></wt-context-menu>`                  |                                                       |
| disabled | Boolean    | false   | `<wt-context-menu disabled></>`                                          |                                                       |

## Events

| Value        | Params                                           | Description |
|--------------|--------------------------------------------------|-------------|
| click        | `[{ name: 'Option and index', type: 'Object' }]` |             |

## Example Context Menu

::: raw
<ExampleContextMenu/>
:::

::: details Code
<<< ./examples/example-context-menu.vue
:::

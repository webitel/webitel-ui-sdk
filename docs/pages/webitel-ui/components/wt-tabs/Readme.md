<script setup>
import ExampleTabs from './examples/example-tabs.vue';
import ExampleWideTabs from './examples/example-wide-tabs.vue';
</script>

# WtTabs

## Props

| Name    | Type     | Default | Description                                   |
|---------|----------|---------|-----------------------------------------------|
| current | `Object` | `{}`    | The value of the selected tab                 |
| tabs    | `Array`  | `[]`    | The list of tabs. Tracked by `value` property |

## Events

| Name   | Params          | Description                          |
|--------|-----------------|--------------------------------------|
| change | `tab`: `Object` | Returns tab object from list of tabs |

## Slots

| Name         | Scope              | Description                                                              |
|--------------|--------------------|--------------------------------------------------------------------------|
| `:tab-value` | `{ tab, current }` | Override tab contents with passed tab from `tabs` object and `current` tab |

## Example Tabs

::: raw
<ExampleTabs />
:::

::: details Code
<<< ./examples/example-tabs.vue
:::

## Example Wide Tabs

::: raw
<ExampleWideTabs />
:::

::: details Code
<<< ./examples/example-wide-tabs.vue
:::

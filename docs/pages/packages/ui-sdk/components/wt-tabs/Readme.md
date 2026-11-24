<script setup>
import ExampleTabs from './examples/example-tabs.vue';
import ExampleWideTabs from './examples/example-wide-tabs.vue';
import ExampleDisabledTabs from './examples/example-disabled-tabs.vue';
</script>

# WtTabs

## Props

| Name    | Type     | Default | Description                                   |
| ------- | -------- | ------- | --------------------------------------------- |
| current | `Object` | `{}`    | The value of the selected tab                 |
| tabs    | `Array`  | `[]`    | The list of tabs. Tracked by `value` property |

### Tab item

Each entry in `tabs` has the shape:

| Field      | Type      | Required | Description                                                                 |
| ---------- | --------- | -------- | --------------------------------------------------------------------------- |
| `value`    | `String`  | yes      | Unique key of the tab; `current.value` is matched against it                |
| `text`     | `String`  | yes      | Tab label (also used as the default slot content)                           |
| `disabled` | `Boolean` | no       | When `true`, the tab is greyed out, not focusable, and never emits `change` |

## Events

| Name   | Params          | Description                          |
| ------ | --------------- | ------------------------------------ |
| change | `tab`: `Object` | Returns tab object from list of tabs |

## Slots

| Name         | Scope              | Description                                                                |
| ------------ | ------------------ | -------------------------------------------------------------------------- |
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

## Example Disabled Tabs

::: raw
<ExampleDisabledTabs />
:::

::: details Code
<<< ./examples/example-disabled-tabs.vue
:::

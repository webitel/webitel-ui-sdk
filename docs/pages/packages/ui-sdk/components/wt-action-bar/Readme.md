<script setup>
import Specs from './component-specs.vue';
import ExampleTableActionBar from './examples/example-table-action-bar.vue';
import ExampleSlottedTableActionBar from './examples/example-slotted-table-action-bar.vue';
import ExampleDisabledTableActionBar from './examples/example-disabled-action-bar.vue';
</script>

# `wt-actions-bar.vue`

> [!TIP]
> Цей компонент – нова версія [`wt-table-actions`](../wt-table-actions/Readme.md), з переробленим інтерфейсом та новими
> можливостями.
> Замість `wt-table-actions` треба використовувати `wt-actions-bar`.

## Specs

<Specs />

## Events

Events are built dynamically on `click:[IconAction]` pattern for all available [IconActions](../../enums/IconAction/Readme.md).

## Actions Order, depending on `mode` prop

::: details Code
<<< ../../../../../../src/components/wt-action-bar/WtActionBarActionsOrder.js
:::

## Example Table Actions Bar (All table actions)

::: raw
<ExampleTableActionBar />
:::

::: details Code
<<< ./examples/example-table-action-bar.vue
:::

## Example Slotted Table Actions Bar

::: raw
<ExampleSlottedTableActionBar />
:::

::: details Code
<<< ./examples/example-slotted-table-action-bar.vue
:::

## Example Slotted Table Actions Bar

::: raw
<ExampleSlottedTableActionBar />
:::

::: details Code
<<< ./examples/example-slotted-table-action-bar.vue
:::

## Example Disabled Actions Bar

::: raw
<ExampleDisabledTableActionBar />
:::

::: details Code
<<< ./examples/example-disabled-action-bar.vue
:::

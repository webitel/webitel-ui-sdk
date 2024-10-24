<script setup>
import Specs from './component-specs.vue';
import ExampleTableActionBar from './examples/example-table-action-bar.vue';
</script>

# `wt-actions-bar.vue`

> [!TIP]
> Цей компонент – нова версія [`wt-table-actions`](../wt-table-actions/Readme.md), з переробленим інтерфейсом та новими
> можливостями.
> Замість `wt-table-actions` треба використовувати `wt-actions-bar`.

## Specs

<Specs />

## Actions Order, depending on `mode` prop

::: details Code
<<< ../../../../../src/components/wt-action-bar/WtActionBarActionsOrder.js
:::

## Example Table Actions Bar (All table actions)

::: raw
<ExampleTableActionBar />
:::

::: details Code
<<< ./examples/example-table-action-bar.vue
:::

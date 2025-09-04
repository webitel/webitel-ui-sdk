<script setup>
import Docs from './wt-switcher-docs.vue';
import ExampleSwitcher from './examples/example-switcher.vue';
import ExampleDisabledSwitcher from './examples/example-disabled-switcher.vue';
import ExampleSwitcherLabelLeft from './examples/example-switcher-label-left.vue';
</script>

# WtSwitcher

## Props

::: raw
<Docs/>
:::

:::warning Important
In `cc-history`, `cc-quality-auditor`, `cc-supervisor`, `cc-workspaces`, `client`, `crm`, use `v-model:model-value` instead of the standard `v-model`, because of compat vue 2 different behavior
:::

:::tip
✅ Correct: `<wt-switcher v-model:model-value="value" />` 

❌ Incorrect: `<wt-switcher v-model="value" />`
:::

## Example Switcher

::: raw
<ExampleSwitcher/>
:::

::: details Code
<<< ./examples/example-switcher.vue
:::

## Example Disabled Switcher

::: raw
<ExampleDisabledSwitcher/>
:::

::: details Code
<<< ./examples/example-disabled-switcher.vue
:::

## Example Switcher with Label Left

::: raw
<ExampleSwitcherLabelLeft/>
:::

::: details Code
<<< ./examples/example-switcher-label-left.vue
:::

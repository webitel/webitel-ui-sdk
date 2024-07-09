<script setup>
import ExampleTooltip from './examples/example-tooltip.vue';
</script>

# WtTooltip

### Tooltip implementation is based on [Floating UI](https://floating-ui.com/)

## Props

| Prop            | Type    | Default                     | Code                                                     | Description                                                                                          |
|-----------------|---------|-----------------------------|----------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| placement       | String  | auto                        | `<wt-tooltip placement="left"></wt-tooltip>`             | see [Floating UI](https://floating-ui.com/docs/tutorial#placements) docs, + "auto" for autoPlacement |
| popper-class    | String  |                             | `<wt-tooltip popper-class="my-class"></wt-tooltip>`      | add special class to a floating part of tooltip                                                      |
| triggers        | Array   | ['hover', 'focus', 'touch'] | `<wt-tooltip :triggers="['click']"></wt-tooltip>`        | see [Floating Vue](https://floating-vue.starpad.dev/api/#triggers) docs                              |
| popper-triggers | Array   |                             | `<wt-tooltip :popper-triggers="['hover']"></wt-tooltip>` | see [Floating Vue](https://floating-vue.starpad.dev/api/#poppertriggers) docs                        |
| visible         | Boolean | false                       | `<wt-tooltip visible></wt-tooltip>`                      | Make tooltip visible                                                                                 |
| disabled        | Boolean | false                       | `<wt-tooltip disabled></wt-tooltip>`                     |                                                                                                      |

## Slots

| Name    | Scope | Description          |
|---------|-------|----------------------|
| default |       | Default content slot |


## Example Tooltip

::: raw
<ExampleTooltip />
:::

::: details Code
<<< ./examples/example-tooltip.vue
:::

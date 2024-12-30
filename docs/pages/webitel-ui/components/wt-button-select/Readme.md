<script setup>
import ExampleButtonSelectDifferentColors from './examples/example-button-select-different-colors.vue';
</script>

# WtButtonSelect

## Props

| Prop                                       | Type  | Default | Code                                                         | Description                         |
| ------------------------------------------ | ----- | ------- | ------------------------------------------------------------ | ----------------------------------- |
| all props witch are in wt-button component |       |         |                                                              |                                     |
| options                                    | Array | []      | `<wt-button-select :options="[1, 2, 3]"></wt-button-select>` | Just like in Context Menu component |

## Events

| Value        | Params                                | Description |
| ------------ | ------------------------------------- | ----------- |
| click        | `[{ name: 'event', type: 'Event' }]`  |             |
| click:option | `[{ name: 'Option', type: 'Object'}]` |             |

## Slots

| Name    | Scope | Description          |
| ------- | ----- | -------------------- |
| default |       | Default content slot |

### Note: all buttons props are passed as "$attrs"

## Different colors

::: raw
<ExampleButtonSelectDifferentColors />
:::

::: details Code
<<< ./examples/example-button-select-different-colors.vue{js}
:::

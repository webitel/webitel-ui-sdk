<script setup>
</script>

# WtExpansionPanel

## Props

| Name        | Type    | Default | Description                                                                                      |
|-------------|---------|---------|--------------------------------------------------------------------------------------------------|
| `size`      | String  | `md`    | Size of the expansion panel. Can be `sm`, or `md`.                                               |
| `collapsed` | Boolean | `false` | Whether the expansion panel is initially collapsed. Also, can force expansion state, if changed. |

## Events

| Name     | Params | Description                                 |
|----------|--------|---------------------------------------------|
| `opened` | -      | Emitted when the expansion panel is opened. |
| `closed` | -      | Emitted when the expansion panel is closed. |

## Slots

| Name      | Scope                                 | Description                     |
|-----------|---------------------------------------|---------------------------------|
| `default` | -                                     | Content of the expansion panel. |
| `title`   | -                                     | Title of the expansion panel.   |
| `actions` | `{ open: function, opened: boolean }` | Actions of the expansion panel. |

## Example Expansion Panel Different Sizes

::: raw
<ExampleExpansionPanelDifferentSizes/>
:::

::: details Code
<<< ./examples/example-expansion-panel-different-sizes.vue
:::

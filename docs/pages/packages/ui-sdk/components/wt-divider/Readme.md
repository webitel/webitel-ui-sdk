<script setup>
import ExampleDivider from './examples/example-divider.vue';
import ExampleDividerType from './examples/example-divider-type.vue';
import ExampleDividerAlign from './examples/example-divider-align.vue';
</script>

# WtDivider

## Props

| Prop    | Type     | Default    | Code                                  | Description                                                                |
| ------- | -------- | ---------- | -------------------------------------- | --------------------------------------------------------------------------- |
| variant | `string` | horizontal | `<wt-divider variant="horizontal" />` | You can pass two options `horizontal` and `vertical`                       |
| type    | `string` | solid      | `<wt-divider type="solid" />`         | You can pass three options `solid`, `dashed` and `dotted`                  |
| align   | `string` | center     | `<wt-divider align="center" />`       | Horizontal: `left`, `center`, `right`. Vertical: `top`, `center`, `bottom` |

## Example Divider

::: raw
<ExampleDivider/>
:::

::: details Code
<<< ./examples/example-divider.vue
:::

## Example Divider Type

::: raw
<ExampleDividerType/>
:::

::: details Code
<<< ./examples/example-divider-type.vue
:::

## Example Divider Align

::: raw
<ExampleDividerAlign/>
:::

::: details Code
<<< ./examples/example-divider-align.vue
:::

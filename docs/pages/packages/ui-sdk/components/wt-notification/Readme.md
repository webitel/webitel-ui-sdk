<script setup>
import ExampleNotification from './examples/example-notification.vue';
</script>

# WtNotification

::: warning Deprecated
`WtNotification` is deprecated. Use [`WtToast`](../wt-toast/Readme.md) instead.
:::

## Props

| Prop | Type   | Default   | Description                                      | Options                               |
| ---- | ------ | --------- | ------------------------------------------------ | ------------------------------------- |
| type | String | `success` | Controls the icon and color of the notification. | `info`, `error`, `warning`, `success` |

## Events

| Event | Params | Description                       |
| ----- | ------ | --------------------------------- |
| close |        | Emitted when the card is clicked. |

## Example

::: raw
<ExampleNotification/>
:::

::: details Code
<<< ./examples/example-notification.vue
:::

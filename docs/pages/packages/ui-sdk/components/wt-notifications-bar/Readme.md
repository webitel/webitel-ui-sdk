<script setup>
import ExampleNotificationsBar from './examples/example-notifications-bar.vue';
</script>

# WtNotificationsBar

## Code

```html
<wt-notifications-bar></wt-notifications-bar>
```

## Specification

`WtNotificationsBar` listens to the **`notification`** event on the event bus and displays push notifications using [`WtToast`](../wt-toast/) (PrimeVue-based) in the `top-right` position.

### Event payload

Preferred format using PrimeVue-native fields:

```json
{
  "severity": "success",
  "detail": "Notification text",
  "life": 4000
}
```

| Field      | Type   | Required | Description                                                                                            |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------ |
| `severity` | String | yes      | One of: `success`, `info`, `warn`, `error`, `contrast`, `secondary`                                   |
| `detail`   | String | yes      | Message text shown in the toast body.                                                                  |
| `life`     | Number | no       | Display duration in **milliseconds**. Defaults to `4000`.                                              |

### Legacy fields (backward-compatible)

The following fields from the old `WtNotification`-based API are still accepted:

```json
{
  "type": "success",
  "text": "Notification text",
  "timeout": 4
}
```

| Legacy field | Maps to    | Notes                                                                        |
| ------------ | ---------- | ---------------------------------------------------------------------------- |
| `type`       | `severity` | `warning` maps to `warn` (PrimeVue convention).                              |
| `text`       | `detail`   |                                                                              |
| `timeout`    | `life`     | Was in **seconds**; converted to milliseconds automatically (`× 1000`).      |

When both legacy and new fields are present, new fields take precedence.

## Important

`WtNotificationsBar` requires `ToastService` registered via the PrimeVue plugin (already included in `primevue.plugin.js`) and `eventBus` provided in the plugin (see "Quick start" page).

For new code, consider using [`WtToast`](../wt-toast/) directly with `useToast()` instead of the event-bus approach.

## Example

::: raw
<ExampleNotificationsBar/>
:::

::: details Code
<<< ./examples/example-notifications-bar.vue
:::

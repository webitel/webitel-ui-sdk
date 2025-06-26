<script setup>
import ExampleNotificationsBar from './examples/example-notifications-bar.vue';
</script>

# WtNotificationsBar

## Code

&lt;wt-notifications-bar&gt;&lt;/wt-notifications-bar&gt;

## Specification

Notification bar listens to <b>eventBus 'notification' event</b> and represents sent
notifications using wt-notification component. 'notification' <b>events</b> should have
the following <b>format</b>:

```json
{
  "type": "success",
  "message": "Notification message",
  "timeout": 4000 //not required, default 4000ms
}
```

If 'timeout' is not specified notifications-bar message will be discarded after 4s.

## Important

Notifications bar won't work without eventBus,
registered in plugin (check "Quick start" page).

## Example Notifications bar

::: raw
<ExampleNotificationsBar/>
:::

::: details Code
<<< ./examples/example-notifications-bar.vue
:::

<script setup>
import ExampleToast from './examples/example-toast.vue';
import ExamplePrimevueToastMigration from './examples/example-primevue-toast-migration.vue';
</script>

# WtToast

A thin wrapper over [PrimeVue `Toast`](https://primevue.org/toast/) that injects Webitel icons for each severity. All PrimeVue `Toast` props are forwarded via `v-bind="$attrs"` ([full props reference](https://primevue.org/toast/#api.Toast.props)).

## Setup

Mount `<WtToast />` **once** in the root layout. `ToastService` must be registered in the PrimeVue plugin (already done in `primevue.plugin.js`):

```html
<!-- App.vue or root layout -->
<template>
  <router-view />
  <WtToast position="top-right" />
</template>
```

## Usage

```js
import { useToast } from 'primevue/usetoast';

const toast = useToast();

toast.add({
  severity: 'success',
  summary: 'Saved',
  detail: 'Changes have been saved.',
  life: 4000, // milliseconds
});
```

## Severities

| `severity`  | Icon           |
| ----------- | -------------- |
| `success`   | `done`         |
| `info`      | `rounded-info` |
| `warn`      | `warning`      |
| `error`     | `error`        |
| `contrast`  | —              |
| `secondary` | —              |

## Props

`WtToast` passes all attributes through to PrimeVue `Toast`. The most commonly used prop:

| Prop       | Type   | Default     | Options                                                                                                    |
| ---------- | ------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `position` | String | `top-right` | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`, `center` |

See the [PrimeVue Toast docs](https://primevue.org/toast/) for the full props reference.

## Migration from WtNotification / WtNotificationsBar

| Old (WtNotificationsBar event bus)                                   | New (WtToast + useToast)                      |
| -------------------------------------------------------------------- | --------------------------------------------- |
| `eventBus.$emit('notification', { type, text, timeout })`            | `toast.add({ severity, detail, life })`       |
| `type: 'warning'`                                                    | `severity: 'warn'`                            |
| `timeout: 4` (seconds)                                               | `life: 4000` (milliseconds)                   |
| `<wt-notifications-bar />` (in layout)                               | `<WtToast />` (in root layout, once)          |

> `WtNotificationsBar` is still available and now delegates to `WtToast` internally, so existing event-bus–based code continues to work without changes.
>
> `WtNotification` (the static card component) is [deprecated](../wt-notification/Readme.md).

## Quick example

::: raw
<ExampleToast/>
:::

::: details Code
<<< ./examples/example-toast.vue
:::

## All severities

::: raw
<ExamplePrimevueToastMigration/>
:::

::: details Code
<<< ./examples/example-primevue-toast-migration.vue
:::

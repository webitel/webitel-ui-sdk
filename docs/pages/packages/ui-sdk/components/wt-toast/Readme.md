<script setup>
import ExampleToast from './examples/example-toast.vue';
import ExamplePrimevueToastMigration from './examples/example-primevue-toast-migration.vue';
</script>

# `wt-toast.vue`

A thin wrapper over [PrimeVue `Toast`](https://primevue.org/toast/) that injects Webitel icons for each severity. All PrimeVue `Toast` props are forwarded via `v-bind="$attrs"` ([full props reference](https://primevue.org/toast/#api.Toast.props)).

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

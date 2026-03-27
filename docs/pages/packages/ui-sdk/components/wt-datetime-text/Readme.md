<script setup>
import Specs from './component-specs.vue';
import ExampleDatetimeText from './examples/example-datetime-text.vue';
import ExampleDatetimeTextModes from './examples/example-datetime-text-modes.vue';
import ExampleDatetimeTextTimezone from './examples/example-datetime-text-timezone.vue';
</script>

# `wt-datetime-text.vue`

Відображає дату/час у вигляді відформатованого тексту.
Форматування виконується через `date-fns` з урахуванням часової зони користувача.

## Specs

<Specs />

## Example

::: raw
<ExampleDatetimeText />
:::

::: details Code
<<< ./examples/example-datetime-text.vue
:::

## Example Modes

::: raw
<ExampleDatetimeTextModes />
:::

::: details Code
<<< ./examples/example-datetime-text-modes.vue
:::

## Example Timezones

::: raw
<ExampleDatetimeTextTimezone />
:::

::: details Code
<<< ./examples/example-datetime-text-timezone.vue
:::

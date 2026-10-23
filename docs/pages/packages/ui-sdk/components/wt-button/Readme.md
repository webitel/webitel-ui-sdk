<script setup>
import Specs from './component-specs.vue';
import ExampleButton from './examples/example-button.vue';
import ExampleButtonsDifferentColor from './examples/example-buttons-different-color.vue';
import ExampleSmallButton from './examples/example-small-button.vue';
import ExampleWideButton from './examples/example-wide-button.vue';
import ExampleButtonsDifferentColorLoaders from './examples/example-buttons-different-color-loaders.vue';
import ExampleIconButton from './examples/example-icon-button.vue'
import ExampleIconButtonDisabled from './examples/example-icon-button-disabled.vue'
import ExampleIconButtonCustomColor from './examples/example-icon-button-custom-color.vue'
</script>

# WtButton

## Specs

<Specs />

## Primevue docs

[PrimevueButton](https://primevue.org/button/)

## Button

::: raw
<ExampleButton />
:::

::: details Code
<<< ./examples/example-button.vue{js}
:::

## Different colors

::: raw
<ExampleButtonsDifferentColor />
:::

::: details Code
<<< ./examples/example-buttons-different-color.vue{js}
:::

## Small button

::: raw
<ExampleSmallButton />
:::

::: details Code
<<< ./examples/example-small-button.vue{js}
:::

## Wide button

::: raw
<ExampleWideButton />
:::

::: details Code
<<< ./examples/example-wide-button.vue{js}
:::

## Different colors with loaders

::: raw
<ExampleButtonsDifferentColorLoaders />
:::

::: details Code
<<< ./examples/example-buttons-different-color-loaders.vue{js}
:::

## Icon button

::: raw
<ExampleIconButton />
:::

::: details Code
<<< ./examples/example-icon-button.vue{js}
:::

## Icon button disabled

::: raw
<ExampleIconButtonDisabled />
:::

::: details Code
<<< ./examples/example-icon-button-disabled.vue{js}
:::

## Icon button with custom icon color

By default icon color is derived from the button `color` and `variant`.
Use `icon-color` to override it. Disabled button keeps the theme color.

::: raw
<ExampleIconButtonCustomColor />
:::

::: details Code
<<< ./examples/example-icon-button-custom-color.vue{js}
:::

<script setup>
import Specs from './component-specs.vue';
import ExampleBadgeContentSlot from './examples/example-badge-content-slot.vue';
import ExampleColors from './examples/example-colors.vue';
import ExampleHidden from './examples/example-hidden.vue';
import ExampleOverlay from './examples/example-overlay.vue';
import ExampleWithButton from './examples/example-with-button.vue';
</script>

# WtBadge

## Specs

<Specs />

## Example Colors

::: raw
<ExampleColors/>
:::

::: details Code
<<< ./examples/example-colors.vue
:::

## Example Overlay

Wrap any element in the default slot to position the badge over its top-right corner.

::: raw
<ExampleOverlay/>
:::

::: details Code
<<< ./examples/example-overlay.vue
:::

## Example With Button

Badge on a `wt-button` can be placed either outside (overlaying the button's corner) or inside (as part of the button's own content).

::: raw
<ExampleWithButton/>
:::

::: details Code
<<< ./examples/example-with-button.vue
:::

## Example Badge Content Slot

Use the `badge-content` slot to render custom content (e.g. an icon) instead of `value`.

::: raw
<ExampleBadgeContentSlot/>
:::

::: details Code
<<< ./examples/example-badge-content-slot.vue
:::

## Example Hidden

::: raw
<ExampleHidden/>
:::

::: details Code
<<< ./examples/example-hidden.vue
:::

<script setup>
import ExampleCollapsibleSearchBar from './examples/example-collapsible-search-bar.vue';
</script>

# WtCollapsibleSearchBar

A search bar that stays collapsed to a magnifier button while it is empty and
not focused ("Search button" in the Design System). It wraps `wt-search-bar`.

- A click on the magnifier expands the field and focuses it.
- The field collapses on blur only while it is empty. A blank (whitespace-only)
  value is cleared on blur and the field collapses.
- Escape (with the focus in the field) and the reset button clear the value,
  collapse the field and move the focus to the magnifier.
- The field grows in the flow, so the container's alignment decides the
  direction it opens to: in a right-aligned container it opens to the left
  without moving the controls after it.
- The magnifier is a small text `wt-button` (a 16px icon in a 32px box); the
  field is a small `wt-search-bar` whose reset button is `close--filled`.
- On collapse the field shrinks first and the magnifier replaces it at the
  end, mirroring the expand, where the field replaces it at once.

Search modes and validation of `wt-search-bar` are not supported.

## Props

| Name          | Type     | Default  | Description                                                     |
| ------------- | -------- | -------- | --------------------------------------------------------------- |
| `value`       | `String` | `''`     | The value of the search bar                                     |
| `placeholder` | `String` | 'Search' | The placeholder of the field and the label of the magnifier     |
| `hint`        | `String` |          | The hint of the search bar                                      |

## Events

| Name     | Params            | Description                                          |
| -------- | ----------------- | ---------------------------------------------------- |
| `input`  | `value`: `String` | Emitted when the value changes (not debounced!)      |
| `search` | `value`: `String` | Debounced value (and on Enter), as in `wt-search-bar` |

## CSS variables

| Name                                          | Default |
| --------------------------------------------- | ------- |
| `--wt-collapsible-search-bar-width`           | `256px` |
| `--wt-collapsible-search-bar-collapsed-width` | `32px`  |

## Example

::: raw
<ExampleCollapsibleSearchBar/>
:::

::: details Code
<<< ./examples/example-collapsible-search-bar.vue
:::

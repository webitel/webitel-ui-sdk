<script setup>
import ExampleSearchBar from './examples/example-search-bar.vue';
import ExampleHintedSearchBar from './examples/example-hinted-search-bar.vue';
import ExampleInvalidSearchBar from './examples/example-invalid-search-bar.vue';
import ExampleSearchBarWithSearchModes from './examples/example-search-bar-with-search-modes.vue';
</script>

# WtSearchBar

## Props

| Name                | Type     | Default  | Description                               |
|---------------------|----------|----------|-------------------------------------------|
| `value`             | `String` | `''`     | The value of the search bar               |
| `placeholder`       | `String` | 'Search' | The placeholder of the search bar         |
| `hint`              | `String` | `''`     | The hint of the search bar                |
| `v`                 | `Object` | `''`     | Validation object                         |
| `customValidators`  | `Array`  | `[]`     | Custom validators for validation object   |
| `searchMode`        | `String` | `''`     | The search mode of the search bar         |
| `searchModeOptions` | `Array`  | `[]`     | The search mode options of the search bar |

## Events

| Name     | Params            | Description                                                                                                |
|----------|-------------------|------------------------------------------------------------------------------------------------------------|
| `input`  | `value`: `String` | Emitted when the value of the search bar changes (not debounced!)                                          |
| `search` | `value`: `String` | Sends changed value, immediately, or, if "debounced" is on, debounced. Recommended for api search requests |

## Slots

| Name                 | Scope                  | Description                                                                |
|----------------------|------------------------|----------------------------------------------------------------------------|
| `search-icon`        | `{ invalid: Boolean }` | Change default search icon                                                 |
| `additional-actions` | `{ invalid: Boolean }` | Adding additional functionality to search bar. For example wt-context-menu |

## Example SearchBar

::: raw
<ExampleSearchBar/>
:::

::: details Code
<<< ./examples/example-search-bar.vue
:::

## Example HintedSearchBar

::: raw
<ExampleHintedSearchBar/>
:::

::: details Code
<<< ./examples/example-hinted-search-bar.vue
:::

## Example InvalidSearchBar

::: raw
<ExampleInvalidSearchBar/>
:::

::: details Code
<<< ./examples/example-invalid-search-bar.vue
:::

## Example SearchBarWithSearchModes

::: raw
<ExampleSearchBarWithSearchModes />
:::

::: details Code
<<< ./examples/example-search-bar-with-search-modes.vue
:::

# `@webitel/ui-datalist`

High level package. Contains neccessary tools for building datalists in Webitel frontend projects.

## Deps:

* `@webitel/ui-sdk`
* `@webitel/api-serivices`

## Contents

This package contains:

* table tools (store, components, etc)
* card page tools (store, components, etc)
* table filters (store, components, etc)
* table filter presets (store, components, etc)

## Exports

### Table tools

...Store Factory.

#### Import

```ts
import {
 createTableStore, // pinia store factory
  } from '@webitel/ui-datalist';
```

### Filters tools

#### Import

```ts
import {
    createFiltersManager, // FiltersManager - filters container. basically, a Map with methods. not! a store
    DynamicFilterSearchComponent, // Searchbar Component
    Filter, // Filter - filter component, used in filtersManager
    FilterOption, // enum of avaliable filters
    TableFiltersPanelComponent, // all-in-one filters panel component (between page header and table)
} from '@webitel/ui-datalist/filters';
```

### Filter Presets tools

#### Import

```ts
import {
    ApplyPresetAction, // Icon Action Component
    SavePresetAction, // Icon Action Component

    createFilterPresetsStore, // pinia store factory
} from '@webitel/ui-datalist/presets';
```

### Card tools

>[!NOTE]
> Form validation included.

aka "page"/"entity page"/"item card"/"item form" - form card of a single item from datalist.

#### Import

```ts
import {
    createCardStore, // pinia store factory
    useCardComponent, // all-in-one composable for card component wrapper (opened-*entity*.vue)
} from '@webitel/ui-datalist/card';
```

## Versions

// TODO: describe new major/minor versions, if will be needed

### 1.0.x

#### Contents:

* separate table, pagination, headers, filters pinia stores
* filtersManager, filter components
* vue-based persistence tools for this storages data
* TS types for all the above

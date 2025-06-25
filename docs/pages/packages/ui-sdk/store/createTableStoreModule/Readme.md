# `createTableStoreModule`

This module contains the necessary tools for organizing data in a table view.

**It includes:**

- `createTableStoreModule`
- `useTableStore`

**For integration with other store modules (like
[API](../createApiStoreModule/Readme.md),
[Card](../createCardStoreModule/Readme.md),
[Filters](../../modules/Filters/Readme.md),
Store Modules)
see [how-to](../../../../knowledge-base/how-to/Integration%20between%20store%20modules/Readme.md) page docs.**

## `createTableStoreModule`

Vuex store module which contains all necessary logic for working with tables.
**[API Store Module](../createApiStoreModule/Readme.md) child is required** for it to work properly.

### State

It contains all required state to power a table view:

- `dataList` - list of data items from the API
- `headers` - list of table headers
- `selected` - list of selected items from dataList (preserves original items references)
- `error` - error response object if error during dataList fetching was occured
- `isLoading` - boolean flag to indicate `dataList` loading state
- `isNextPage` - boolean flag to indicate if there is more data to load

### Getters

- `PARENT_ID` - **if table is nested, should be overriden**.
- `REQUIRED_FIELDS` - list of fields, which should always be included in `FIELDS` getter. `['id']` by default
- `FIELDS` - list of fields to get from API, depending on visible `headers` columns and `REQUIRED_FIELDS`
- `GET_LIST_PARAMS`: accepts override object and returns all request filters as params
  **with overrides priority**

### Actions

See source code

### Mutations

See source code

## `useTableStore`

### Receives

- `namespace` - Vuex module namespace, **without `/table` suffix**

### Returns

#### Properties

- `tableNamespace` - Vuex table module namespace

for others, see [store/state](#state)

- `dataList`
- `selected`
- `isLoading`
- `headers`
- `isNext`
- `error`

#### Methods

see [store/actions](#actions)

- `loadData`
- `onFilterEvent`
- `patchProperty`
- `deleteData`
- `sort`
- `setSelected`

## Details and design considerations

### Filters-related actions inside TableStoreModule

Filters-related actions should be separated from Table Module, because
Filters are not required for the module to work properly.

However, it would be great to have them injected in table store, because
they are used together inside one table namespace.

So, I've not came up with a better decision than just to left them inside TableStoreModule.

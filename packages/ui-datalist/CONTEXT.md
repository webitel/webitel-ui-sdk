# ui-datalist

Toolkit for building registry and nested lists in Webitel frontend apps.

## Language

**List-core**:
The module presets and permissions compose with: rows, nest identity (`parentId`), load, and `$reset`. Apps usually reach it through `createTableStore`; extensions call `createListCore` at this seam.
_Avoid_: tableStoreBody, unnamed body, god store

**Registry list**:
A top-level list page, keyed by namespace, with route/session persistence.
_Avoid_: main table

**Nested list**:
A list owned by a card record, addressed with `parentId`, emptied when the card leaves.
_Avoid_: child table

# ui-datalist

Toolkit for building registry and nested lists in Webitel frontend apps.

## Language

**List-session**:
The deep module behind a datalist store: rows, selection, load/CRUD, nest identity, and fetch policy. Apps reach it through `createTableStore`; package extensions compose with `createListSession`.
_Avoid_: table store body, tableStoreBody, god store

**Registry list**:
A top-level list page, keyed by namespace, with route/session persistence.
_Avoid_: main table, parent table

**Nested list**:
A list owned by a card record, addressed with `parentId`, emptied when the card leaves.
_Avoid_: child table, tab table

**Headers**:
Column definitions for a list-session (`field`, show, sort, width). Internal adapter; projected on the list-session interface.
_Avoid_: columns (when meaning the headers store)

**Filters manager**:
Map-like container of active filters for a list-session. Still leaked on the list-session interface today; treat as a projection, not a second public module.
_Avoid_: filters store (when meaning the manager instance)

**Card**:
Opened record page that owns nested lists and resets them on leave.
_Avoid_: item form (when talking about nested-list ownership)

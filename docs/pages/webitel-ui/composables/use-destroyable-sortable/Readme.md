# `UseDestroyableSortable`

## Motivation

WHY TO REINITIALIZE SORTABLE AFTER EACH ARRAY REORDER?

Sortable and Vue both changing DOM so that there are collisions
because both Vue and Sortable try to put element to the position. So element is put incorrectly.
<br>
There are 2 vue packages for sortable (vue 2 and vue 3), but I had encountered issues when tried to use them.
Also, it seems to me that they aren't supported now :(
<br>
So that I decided to reinitialize Sortable each time order changes to represent it correctly.
Bad decision, but I haven't come up with a better one

## Input params

| Params  | Description |
|---------|-------------|
| elRef   |             |
| options |             |

## Return

| Params         | Description |
|----------------|-------------|
| reloadSortable |             |

## Використання

```js
// template
<div ref="SortableWrapper" v-if="!reloadSortable"></div>

// script
import {
  useDestroyableSortable,
} from '@webitel/ui-sdk/src/composables/useDestroyableSortable/useDestroyableSortable';

const SortableWrapper = ref(null);

const { reloadSortable } = useDestroyableSortable(SortableWrapper, {
  onEnd: ({ newIndex, oldIndex }) => {
    if (newIndex === oldIndex) return;
    moveArrayElement(props.modelValue, oldIndex, newIndex);
  },
});
```


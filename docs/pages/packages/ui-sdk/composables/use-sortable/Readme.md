# `useSortable`

## Motivation

Sortable and Vue both change the DOM: Sortable moves the dragged element, and Vue re-renders the list from data.
To keep them from colliding, `useSortable` puts the dragged element back to its original place on `onEnd`,
before calling your `onEnd`. Your handler only updates the data, and Vue renders the new order.
The list is never re-mounted, so the state of its items (collapsed panels, inputs, nested sortables) is kept.

Works for moves between lists too (`group` option): the source list puts the element back.

## Input params

| Params  | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| elRef   | ref to the list element                                                     |
| options | [Sortable options](https://github.com/SortableJS/Sortable#options), passed as is |

## Використання

```js
// template
<ul ref="SortableWrapper">
  <li v-for="item of modelValue" :key="item.id"></li>
</ul>;

// script
import { moveArrayElement } from '@vueuse/integrations/useSortable';
import { useSortable } from '@webitel/ui-sdk/src/composables/useSortable/useSortable';

const SortableWrapper = ref(null);

useSortable(SortableWrapper, {
  onEnd: ({ newIndex, oldIndex }) => {
    if (newIndex === oldIndex) return;
    moveArrayElement(props.modelValue, oldIndex, newIndex);
  },
});
```

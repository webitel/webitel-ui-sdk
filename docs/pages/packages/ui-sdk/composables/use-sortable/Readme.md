# `useSortable`

## Мотивація

Sortable і Vue обидва змінюють DOM: Sortable переміщує перетягнутий елемент, а Vue перемальовує список з даних.
Щоб вони не конфліктували, `useSortable` у `onEnd` повертає перетягнутий елемент на початкове місце
і лише потім викликає `onEnd`, переданий в `options`. Цей обробник тільки оновлює дані, а новий порядок рендерить Vue.
Список не перемонтовується, тому стан його елементів (згорнуті панелі, інпути, вкладені sortable) зберігається.

Працює й для переміщення між списками (опція `group`): елемент повертає список, з якого його перетягнули.

## Вхідні параметри

| Параметр | Опис                                                                                  |
| -------- | ------------------------------------------------------------------------------------- |
| elRef    | ref на елемент списку                                                                 |
| options  | [опції Sortable](https://github.com/SortableJS/Sortable#options), передаються як є    |

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

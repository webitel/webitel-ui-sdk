# `UseCardComponent`

Композібл використовується для роботи з відкритою карточкою сторінки сутності. Вертає необхідні `computed` властивості
та
методи, для використоання їх у компонентах `opened-card.vue`.
Використовується разом з композіблом `useCardStore`

## Input params

Обєкт параметрів який має включати наступні значення:

| Params       | Description                                                              |
|--------------|--------------------------------------------------------------------------|
| id           |                                                                          |
| itemInstance |                                                                          |
| v            | Об'єкт валідації. Потрібен для значень всередині computed `disabledSave` |
| loadItem     |                                                                          |
| addItem      |                                                                          |
| updateItem   |                                                                          |
| setId        |                                                                          |
| resetState   |                                                                          |

## Return

| Params       | Description                                                                                                                                                                                                            |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id           |                                                                                                                                                                                                                        |
| itemInstance |                                                                                                                                                                                                                        |
| isNew        | Якщо запис не має `id`, він вважаєаться новим (ще не створеним)                                                                                                                                                        |
| pathName     | Назва ще не збереженої сутності (див.[useCachedItemInstanceName](../use-cached-item-instance-name/Readme.md))                                                                                                          |
| disabledSave | Дізейбл кнопки `save` якщо зміни не пройшли валідацію. В середині себе викликає `v.touch()`                                                                                                                            |
| saveText     | Текст для кнопки збереження у компоненті [wt-page-header](../../components/wt-page-header/Readme.md).                                                                                                                  |
| save         | Метод для збереження нової сутності або редагування існуючої                                                                                                                                                           |
| initialize   | Метод, який на mount компонента викликає get запит на бек для завантаження сторінки, а на `onMounted` робить `reset` сторінки. Lifecycle hooks винесені в цей окремий метод для можливості кастомізації у разі потреби |

## Використання

```js
import { useCardComponent } from '@webitel/ui-sdk/src/composables/useCard/useCardComponent.js';

сonst
namespace = 'some-namespace';

const {
  id,
  itemInstance,
  loadItem,
  addItem,
  updateItem,
  setId,
  resetState,
} = useCardStore(namespace);

const {
  id,
  itemInstance,
  isNew,
  pathName,
  disabledSave,
  saveText,
  save,
  initialize
} = useCardComponent({
  id,
  itemInstance,
  loadItem,
  addItem,
  updateItem,
  setId,
  resetState,
  v,
});
```

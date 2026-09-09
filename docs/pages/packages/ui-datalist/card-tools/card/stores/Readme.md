# Card Tools: `createCardStore`

_// TODO: бо не знаю що тут розповісти._ 

## Реєстр вкладених списків

Card store володіє табличками своїх табів. Store такої таблички — pinia
singleton, спільний для всіх карточок цієї сутності і довговічніший за кожну з
них, тому чистити його — робота тієї карточки, яка його наповнила.

```ts
cardStore.registerNestedList(tableStore); // це робить useNestedTableList
```

`$reset()` карточки:

1. кличе `$reset()` кожного зареєстрованого списку;
2. очищає реєстр — наступна карточка чистить тільки свої списки;
3. далі скидає власний стан (`itemId`, `parentId`, `originalItemInstance`, ...).

На клієнті нічого викликати не треба: `useCardComponent` вішає `$reset` на
`onUnmounted`, а `provide` card store'а підхоплює
[`useNestedTableList`](../../../table-tools/table/nested/index.md).

[WTEL-10350](https://webitel.atlassian.net/browse/WTEL-10350)

Якщо стикнетесь з незрозумілими моментами,
напишіть мені (_@d.lohvinov_), і я опишу в документації.

# User Input Validation

## TLDR;

1. **Валідації – напряму повʼязані з [карточками](../card/Readme.md).**
Наразі (`v25.08`), зашиті та тісно інтегровані в карточку.

2. **Валідація складається з 2х частин**: [Zod](./zod/Readme.md) + [Regle](./regle/Readme.md). 

3. `Zod` **схеми – "основа" валідації, самі перевірки**. 
Генеруються в рамках пакету [`@webitel/api-services`](../../../api-services/index.md). 

4. **Regle – обгортка Zod для роботи у компонентах**, з реактивністю, з методами та статус-флагами валідації.

## Задачі `Zod`

1. Перевірка даних згідно його схеми валідації
2. Заповнення default значень
3. **Формування текстів помилок** (!)

## Задачі `Regle`

1. Інтеграція з Vue
2. Реактивність
3. Розрахунок правильності, корисних для ui флагів стану

## Як "під капотом" відбувається обгортування

### Крок 1: `@webitel/api-services`

1. У `@webitel/api-services`: маємо [згенеровану `Zod`-схему](https://github.com/webitel/webitel-ui-sdk/blob/master/packages/api-services/src/gen/sources/sources.zod.gen.ts#L155), 
яка описує валідацію.

### Крок 2: `@webitel/ui-datalist` -> `stores`

2. У `@webitel/ui-datalist`: у сторі карточки [очікуємо цю схему](https://github.com/webitel/webitel-ui-sdk/blob/master/packages/ui-datalist/src/modules/card/stores/createCardStore.ts#L23)
як параметр `createCardStore()`.

3. Там же: [обгортаємо](https://github.com/webitel/webitel-ui-sdk/blob/master/packages/ui-datalist/src/modules/card/stores/createCardStore.ts#L58-L62)
`Zod`-схему у `Regle`...

4. ... і [return'мо](https://github.com/webitel/webitel-ui-sdk/blob/master/packages/ui-datalist/src/modules/card/stores/createCardStore.ts#L179)
цю схему зі стора.

### Крок 3: `crm`

5. `crm`: при створенні конкретного стора карточки конкретної сутності,
[імпортуємо zod-схему](https://github.com/webitel/crm/blob/master/src/modules/configuration/modules/lookups/modules/sources/stores/card/caseSourcesCardStore.ts#L2)
з `@webitel/api-services`, та [передаємо її](https://github.com/webitel/crm/blob/master/src/modules/configuration/modules/lookups/modules/sources/stores/card/caseSourcesCardStore.ts#L11)
у `createCardStore()`.

6. `crm`: На рівні конкретної карточки імпортуємо цей стор з попереднього кроку, передаємо у [`useCardComponent` composable](https://github.com/webitel/webitel-ui-sdk/blob/master/packages/ui-datalist/src/modules/card/composables/useCardComponent.ts),

### Крок 4: Назад в `@webitel/ui-datalist` -> `composables`

7. `@webitel/ui-datalist`: з `useCardComponent` [прокидаємо `Regle`-схему](https://github.com/webitel/webitel-ui-sdk/blob/master/packages/ui-datalist/src/modules/card/composables/useCardComponent.ts#L34-L35)
у `useCardValidation` composable,
і вже [там розраховується](https://github.com/webitel/webitel-ui-sdk/blob/master/packages/ui-datalist/src/modules/card/composables/useCardValidation.ts#L6-L34)
і [вертається все необхідне](https://github.com/webitel/crm/blob/master/src/modules/configuration/modules/lookups/modules/sources/components/opened-source.vue#L57-L76).


## FAQ

### Як `Zod` у нас повʼязаний з `Regle`?

[Regle: Schemas libraries](https://reglejs.dev/integrations/schemas-libraries)
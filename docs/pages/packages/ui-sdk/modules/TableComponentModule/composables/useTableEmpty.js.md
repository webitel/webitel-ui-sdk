# `useTableEmpty.js`

Компоузабл, що розраховує стан [`wt-empty.vue`](../../../components/wt-empty/Readme.md) для таблиці.

Підтримує різні причини порожньої таблиці, такі як:

- `error`: помилка при завантаженні даних
- `filters`: відсутність даних за вибраними фільтрами
- `empty`: відсутність даних, при скинутих фільтрах

## Вхідні параметри

### 1: Дані таблиці

```js
useTableEmpty({
  dataList,
  isLoading,
  error,
  filters, // обʼєкт фільтрів таблиці
});
```

### 2: Overrides

```js
useTableEmpty({ ... }, {
  text: {
    error: t('error'),
    empty: t('empty'),
    filters: t('filters'),
  },
})
```

## Вихідні параметри

```js
const {
  showEmpty,

  image,
  headline,
  title,
  text,
  primaryActionText,
  secondaryActionText,
} = useTableEmpty({ ... }, { ... });
```

## Перевизначення дефолтних значень

Ассети для для компоузабла можна перевизначити: будь-яку текстовку, будь-яке зображення.

`overrides` мерджиться з `defaults` `deepmerge`'ом. Отже, збереження структури – обовʼязкове.

> [!TIP]
>
> - `image` - обʼєкт зображення.
> - текстові поля - мають бути вже локалізовані.

### Схема даних, яку можна перевизначити

::: details Code

```js
const overrides = {
  // imported img object
  image: {
    filters: {
      dark,
      light,
    },
    error: {
      dark,
      light,
    },
    empty: {
      dark,
      light,
    },
  },
  headline: {
    filters,
    error,
    empty,
  },
  title: {
    filters,
    error,
    empty,
  },
  text: {
    filters,
    error,
    empty,
  },
  primaryActionText: {
    filters,
    error,
    empty,
  },
  secondaryActionText: {
    filters,
    error,
    empty,
  },
};
```

:::

## Які фільтри включені в розрахунок причини `filters`?

Працює по перевірці всіх існуючих фільтрів, з виключенням:

- `page`
- `size`
- `sort`
- `fields`

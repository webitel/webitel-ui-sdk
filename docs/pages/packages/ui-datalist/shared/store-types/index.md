# `@webitel/ui-datalist` Store Types

## Проблематика

Стор таблички містить в собі дефолтну логіку роботи з табличкою, яку було би добре
використовувати в інших місцях, які не обов'язково є "звичайними" табличками.

Наприклад, у якихось модалках.

Нюанс в тому, що в таких випадках:
* **НЕ потрібен стор, який буде існувати після закриття модалки**.


* Хочеться при **кожному відкритті модалки мати "чистий" стор**, 
не турбуючись про виклик `$reset` стора при `unMounted`.

## Рішення

**Pinia - за синтаксисом на composables.** 

А отже, можемо (і робимо) обгортку над самим кодом стора, 
яка визначатиме, буде цей стор `pinia` чи `composable`'ом.

### Pinia

### Composables

## Використання

Мусимо мати:
1. "Тіло" стора.
2. "Обгортку", яка визначає, чи буде це `pinia` чи `composable`.

[Source code link](https://github.com/webitel/webitel-ui-sdk/blob/3bf3a68a77268d5466de39dced8725c74230b1eb/packages/ui-datalist/src/modules/table/createTableStore.store.ts):

```ts
// @webitel/ui-datalist/.../createTableStore.store.ts

// store code itself // [!code highlight]
const tableStoreBody = () => {
    
    // using other composables/stores, if needed // [!code highlight]
    // use...()
    
    // state // [!code highlight]
    const dataList = ref([]);
    // ... ref(), reactive()
    
    // getters // [!code highlight]
    const dataListGetter = computed(() => {
        return dataList.value;
    });
    // ... computed()
    
    // actions // [!code highlight]
    const loadDataList = () => {
        // ...
        dataList.value = [];
    };
    // ... actions
    
    return {
        dataList,
        // ... state,
        dataListGetter,
        // ... getters,
        loadDataList,
        // ... actions
    };
};

import { createDatalistStore } from '../_shared/createDatalistStore'; // [!code highlight]

export const createTableStore = ( // [!code highlight]
    namespace: string,
    config: useTableStoreConfig<Entity>, // contans store type config param
) => {
    return createDatalistStore({ // [!code highlight]
        storeBody: () => tableStoreBody(namespace, config), // [!code highlight]
        namespace,
        config,
    });
};
```

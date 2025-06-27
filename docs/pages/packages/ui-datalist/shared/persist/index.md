# Table / Filters Stores Persistence

> [!IMPORTANT]
> Модуль не задумувався як такий що експортується. Наразі, це - "нутрощі" пакета, підігнані під його потреби.

## Задача

Мати можливість зберігати стан фільтрів та таблиці між 
перезавантаженнями сторінки.

## Реалізація

`usePersistedStorage` composable.
Вміє зберігати та відновлювати те, що йому передають.

## Використання

### usePersistedStorage `onStore`/`onRestore` callbacks

>[!WARNING]
> Параметром є функція-коллбек. Зважайте - там специфічна передача
параметрів: цей коллбек приймає в себе параметром інший коллбек.


[Source code link](https://github.com/webitel/webitel-ui-sdk/blob/20b87294300a1835f750cc357a4e654d9a23e866/packages/ui-datalist/src/modules/filters/createTableFiltersStore.ts)

```ts
// @webitel/ui-datalist/.../createTableFiltersStore.ts

import { usePersistedStorage } from '../persist/usePersistedStorage'; // [!code highlight]

export const useTableFiltersStore = () => {
    // ...
    const filtersManager = reactive(createFiltersManager());
    // ...

    const setupPersistence = () => {
        const { restore: restoreFilters } = usePersistedStorage({ // [!code highlight]
            name: 'page',
            value: page,
            onStore: /* may be async */ (save, { name }) => {
                const snapshotStr = filtersManager.toString();  // main goal of this callback! // [!code highlight]
                return save({ name, value: snapshotStr });
            },
            // onRestore callback - transforms value before setting it to state
            onRestore: async (
                restore, // callback restores and returns restored value
                name // stored property (!, NOT path) key
            ) => {
                const snapshotStr = await /* await! */ restore(name); // got value from storage
                if (snapshotStr) {
                    filtersManager.fromString(snapshotStr); // main goal of this callback! // [!code highlight]
                }
            },
        });

        // ... other persistence setups
        return Promise.allSettled([restoreFilters()]);
    };
    
    return { // [!code highlight]
        setupPersistence, // should be setted up after page init [!code highlight]
    } // [!code highlight]
};
```

same idea
### Storages

#### URL Route

Базовий. Для всього, що хочемо зберігати.

#### localStorage

>[!WARNING]
> Зважайте: ключ в `localStorage` визначається `storagePath` параметром.
> Чим він специфічніший - тим краще.

Більш специфічний. Станом на зараз (06.2025) основне застосування - для 
збереження вибраних колонок таблиці.

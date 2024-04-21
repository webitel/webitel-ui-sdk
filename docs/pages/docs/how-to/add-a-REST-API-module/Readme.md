# Adding REST API module

## Prerequisites

Говоримо про практику? - Не забуваєм про теорію.

[Backend API Communication](../../architecture-and-structures/Backend%20API%20communication/Readme.md)

А також пасувало би почитати про тулзи, які ми використовуватимемо:

- [Axios](https://axios-http.com/docs/intro)
- Наша обгортка над axios: [api/axios](../../../webitel-ui/api/axios/Readme.md)
- Набір вже готових, дефолтних клієнтів-модулів для певних ендпоінтів: [api/clients](../../../webitel-ui/api/clients/Readme.md)
- Дефолтні, реюзабельні штуки для роботи з апі: [api/defaults](../../../webitel-ui/api/defaults/Readme.md)
- axios interceptors: [api/interceptors](../../../webitel-ui/api/interceptors/Readme.md)
- Трансформери для даних: [api/transformers](../../../webitel-ui/api/transformers/Readme.md)

### REST API Module Interface

**Обовʼязково, подивіться у секцію Interface [api/clients](../../../webitel-ui/api/clients/Readme.md#interface).**

## Як додати Webitel SDK Endpoint модуль?

### TLDR;
Піддивіться у souce code якогось з `api/clients` 🙂

### Довгий та розумний шлях

Спершу, нам треба створити `service` з `ApiFactory`, наприклад

```javascript
import { SomeEntityApiFactory } from 'webitel-sdk';

const service = new SomeEntityApiFactory(instance, '', openAPIConfig);
```

Далі, у нас є вхідні параметри, які ми передаємо у метод апі модуля.

Це може бути `params`, `itemInstance`, `changes`, чи ше шось (знов таки, дивіться у [інтерфейси](#rest-api-module-interface))

Нам треба ці параметри якось "обробити", підготувати до відправки.

Для цього у нас є трансформери, в `api/transformers`. Вони, як пайплайн, обробляють вхідні параметри,
і повертають оброблені.

Що нам зазвичай треба обробити?

(1) Як правило, перевести дані з того, що піде як `body` у snake_case з camelCase.

(2) Почистити непотрібні поля, адже бекенд їх не прийме і викине помилку.

(3) Зробити якісь кастомні трансформації з даними, специфічні саме для цього ендпоінта.

Як це виглядає?

```javascript
const addItem = ({ itemInstance }) => {

  const body = applyTransform(itemInstance, [
    camelToSnake, // (1)
    sanitize(fieldsToSend), // (2)
    ({ id, ...rest }) => ({
      itemId: id,
    ...rest
    }), // (3)
  ]);
}
```

Далі, ми викликаємо наш api метод

```javascript
const addItem = async ({ itemInstance }) => {
  // ...
  
  const response = await service.add(body);
}
```

Обробляємо відповідь, наприклад, дописуючи `counter: 0`

```javascript
() => {
    // ...
    
    const item = applyTransform(response, [
      (item) => ({ ...item, counter: 0 }),
    ]);
}
```

Ну і, обробляєм потенційну помилку

```javascript
() => {
    // ...
    try {
      // ...
    } catch (err) {
      throw applyTransform(err, [
        log,
      ]);
  }
}
```

### Тонкощі

#### Як знайти необхідну мені ApiFactory, та її методи?

**Щодо назви**, ApiFactory - вона має бути така сама, як і у Webitel Swagger.

**Щодо методів**, Webitel SDK на TypeScript, тож IDE має підказати вам, які там є методи.

Зазвичай це:
- `getList` це `search...`,
- `get` це `read...`,
- `add` це `create...`,
- `update` це `update...`,
- `patch` це `patch...`,
- `delete` це `delete...`.

Де замість `...` - назва сутності, з якою ми працюємо.

## Як додати Raw Endpoint модуль?

Та в принципі, те саме що і з Webitel SDK ендпоінтом, тільки тут нам треба сформувати `url`,
щоби зробити на нього запит, як

```javascript
const baseUrl = '/entity';

async (id) => {
  // ...

  const url = `${baseUrl}/${id}`;
  const response = await instance.get(url);
}
```

### TLDR;
Піддивіться у souce code якогось з `api/clients` 🙂

### Довгий та розумний шлях

### Тонкощі
Тут - немає. Берете, формуєте `url`'ку, викликаєте http метод, обробляєте відповідь.

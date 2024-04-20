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

## Як додати Webitel SDK Endpoint модуль?

Піддивіться у souce code якогось з `api/clients` 🙂

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
Піддивіться у souce code якогось з `api/clients` 🙂

### Тонкощі
Тут - немає. Берете, формуєте `url`'ку, викликаєте http метод, обробляєте відповідь.

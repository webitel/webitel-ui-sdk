# Axios-інстанс

Згенеровані сервіси приймають axios-інстанс аргументом, а коли його не
передано – беруть інстанс за замовчуванням:

```ts
export const getAgentService = (axiosInstance: AxiosInstance = axios) => { ... }
```

Пакет самодостатній: жодних аліасів на боці застосунку не потрібно.

## Свій інстанс

Для перехоплювачів, заголовків чи власного `baseURL` є два шляхи.

**На місці виклику** – коли інстанс потрібен лише тут:

```ts
import { getAgentService } from '@webitel/api-services/gen-wire';

getAgentService(myInstance).searchAgent(params);
```

**На весь застосунок** – один раз у бутстрапі, до першого запиту:

```ts
// main.ts
import { setDefaultAxiosInstance } from '@webitel/api-services/api/axios';

import { instance } from './app/api/instance';

setDefaultAxiosInstance(instance);
```

Явно переданий інстанс завжди має пріоритет над встановленим через сеттер.

## Інстанс за замовчуванням

Якщо сеттер не викликали, пакет створить інстанс сам – через
[`getDefaultInstance()`](../../contents/index.md): `baseURL` з
`VITE_API_URL`, заголовок `X-Webitel-Access`, перехоплювачі оновлення токена
та обробки `401`, серіалізація масивів у `qs` як `repeat`.

Створення **ліниве**: воно відбувається на першому зверненні, а не на імпорті
згенерованого модуля. Тому імпорт сервісів у node (тести, msw) не чіпає
`localStorage`, а сеттер спрацьовує навіть після того, як згенеровані модулі
вже імпортовані.

`getDefaultAxiosInstance()` повертає той самий інстанс, яким користуються
згенеровані сервіси:

```ts
import { getDefaultAxiosInstance } from '@webitel/api-services/api/axios';

// той самий об'єкт, що й у згенерованих сервісів
export const instance = getDefaultAxiosInstance();
```

Це не те саме, що `getDefaultInstance()` – **фабрика**, яка на кожен виклик
робить новий `axios.create()`. Якщо застосунок бере інстанс звідти і нічого не
встановлює сеттером, у застосунку буде два різні інстанси: свій і той, що
ліниво створять згенеровані сервіси. Працюватиме, але
`instance.interceptors.use(…)`, доданий пізніше, до згенерованих викликів не
дійде.

## Міграція застосунку

Раніше згенеровані сервіси імпортували інстанс зі спеціального імені
`@aliasedDeps/api-services/axios`, яке саме по собі не резолвилось – кожен
застосунок мусив оголосити для нього аліас у `vite.config.ts`, інакше пакет не
збирався. Тепер цього не потрібно:

1. прибрати аліас `@aliasedDeps/api-services/axios` з `vite.config.ts`
   (а також з `vitest.config.ts` і моків, якщо він там є);
2. якщо застосунок будує власний інстанс – додати
   `setDefaultAxiosInstance(instance)` у точці входу;
3. якщо інстанс був лише копією `getDefaultInstance()` – достатньо віддавати
   `getDefaultAxiosInstance()`, сеттер не потрібен.

## Тести

Мок можна поставити тим самим сеттером:

```ts
setDefaultAxiosInstance(mockInstance);
```

Якщо ж тестове оточення вже підміняє сам пакет `axios` – наприклад
`vi.doMock('axios', …)` – цього достатньо: підміна ловить `axios.create()`
всередині `generateInstance`, яким би шляхом до нього не дійшли.

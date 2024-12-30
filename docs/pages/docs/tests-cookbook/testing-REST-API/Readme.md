# How to test REST API

Prerequisites:

[Mocking modules](../mocking-modules/Readme)

[Test utils / axiosMock](../../../webitel-ui/tests/axios-mock/Readme)

## Що ми тестуємо?

Як правило, тестуючи API файлики, ми хочемо перевірити 2 речі:

- чи правильно надсилається
  запит відносно вхідних параметрів API метода
- чи правильно обробляється response запиту,
  і, що вертається на виході з API метода відносно відповіді на запит.

## То як же це робиться?

В обох випадках нам треба мокнути axios, який безпосередньо робить запити.

### Як написати тест на обробку перед запитом

Тут нам необхідно мокнути саме виконання методу,
і перевірити параметри, з якими він викликається.

Наприклад:

```javascript
it('My API method calls axios with right params', async () => {
  const request = vi.fn(() => Promise.resolve({ data: {} }));
  vi.doMock('axios', axiosMock({ default: { request } }));

  const id = '123';

  const API = (await import('../API.js')).default;

  await API.patch({ id });

  expect(JSON.parse(request.mock.lastCall[0].data)).toEqual({
    id,
  });
});
```

### Як написати тест на обробку після запиту

А тут нам треба мокнути відповідь запиту, і перевірити чи фактичний результат методу
збігається з очікуваним.

Наприклад:

```javascript
it('My API method handles API response with right transformations', async () => {
  const input = {
    my_field: 'true',
  };

  const output = {
    myField: true,
  };

  const request = vi.fn(() => Promise.resolve({ data: { items: [input] } }));
  vi.doMock('axios', axiosMock( { default: { request } }));

  const API = (await import ('../API.js')).default;

  const result = await API.getList({ ... });

  expect(result.items[0]).toEqual(output);
});
```

## Axios Instance vs Webitel-Sdk Services

Різниця проста:

Коли ми викликаємо `instance.` `get`/`patch`/`delete` і так далі,
axios викликає саме цей метод.

А коли ми викликаємо сервіс Webitel Sdk, то він все робить через
метод axios `request` - а отже, ми маємо мокати саме його.

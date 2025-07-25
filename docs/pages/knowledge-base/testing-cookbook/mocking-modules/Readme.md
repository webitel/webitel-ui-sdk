# Mocking modules

> [!WARNING]
> **Deprecation warning!**
>
> 📜 **Архівна стаття**.
> Сам підхід до тестування – цілком валідний. Але використовувані пакети застарілі. 
> Краще беріть [`@webitel/api-services`](../../../packages/api-services/index.md), і там вже
> більш релевантні тести писати.

[Official vitest docs](https://vitest.dev/api/vi.html#mock-modules)

Доку повторювати не будем, але покриємо практичні моменти.

## Що таке модуль?

Модуль - це те, що ми імпортуємо. Наприклад, axios, lodash,
або навіть просто якийсь API файл.

Тобто, поняття модуля - контекстуальне. Десь модуль може бути тим, що необхідно замокати,
а десь навпаки - бути об'єктом тестування.

## Mock vs doMock

Vitest пропонує два методи для мокання модулів:
`mock` [(docs)](https://vitest.dev/api/vi.html#vi-mock)
та `doMock` [(docs)](https://vitest.dev/api/vi.html#vi-domock).

### Mock

Різниця в тому, що `mock` мокає модуль глобально, тобто, хойстить [(hoisting)](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
мок наверх файла, перед імпортом.

З одного боку, це означає, що мок працюватиме для імпортів, оголошених на початку
файла, так як викликається перед цим імпортом.

З іншого ж боку, це означає, що в цей мок не можна передати зовнішню змінну, щоб
потім її тестувати - тому що вона, на відміну від мока, не хойститься.

### doMock

У свою чергу, `doMock` не хойститься, а отже мокає модуль у потоці виконання коду.

Відповідно, ми можемо в нього передати зовнішню змінну, щоб потім її протестувати.
(Наприклад, замокати метод модуля, щоб перевірити, чи він був викликаний).

З іншого боку, імпорт модуля відбувається на початку виконання скрипта, а отже,
`doMock` вже не встигає його мокнути.

Щоб все таки замокати цей модуль, необхідно після `doMock` викликати імпорт динамічно.

Наприклад:

```javascript
const request = vi.fn();

vi.doMock('axios', axiosMock({ default: { request } }));

const missedAPI = (await import('../missed.js')).default;
```

## То що ж використовувати?

Я не знаю. Мені зараз більше подобається метод з `doMock`. Він більш verbose,
через те що треба кожен раз робити імпорт файла кожен раз локально.

Але, з іншого боку, так ми можемо протестити його виклик - якщо нам це потрібно.
(Якщо не потрібно - звісно, використовуємо `mock` і не сумніваємось).

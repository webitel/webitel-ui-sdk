# `Regle` x Card Tools

`Regle` – частина валідацій [card](../../card/Readme.md) модуля.

https://reglejs.dev

## `Regle` vs `Vuelidate`

### TLDR; 
Сприймайте Regle як новий Vuelidate.

### Vuelidate

https://vuelidate-next.netlify.app/

Vuelidate ми користувались весь час, і станом на `v25.08` майже всі валідації написані на ньому.

Але:
* він не розвивається, 
* він місцями багований,
* він [_місцями_] погано документований

### Як `Regle` співвідноситься з `Vuelidate`?

`Regle` – [ідейний спадкоємець `Vuelidate`](https://reglejs.dev/introduction/migrate-from-vuelidate).

Фактично, виконує ті самі функції. Крім того, що виконує обрахунок
валідацій і текстовок – цим займається `Zod`. Детільніше у [Zod FAQ](../zod/Readme.md#faq).

## FAQ

### Як `Regle` у нас повʼязаний з [`Zod`](../zod/Readme.md)?

[main page FAQ](../Readme.md#faq)
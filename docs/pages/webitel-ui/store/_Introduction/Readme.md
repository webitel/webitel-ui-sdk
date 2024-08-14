# Introduction

Store всіх Webitel Applications працює (або, принаймні, має працювати 🙂) на Vuex-модулях, які створюються за допомогою
спеціальних методів (наприклад, `createBaseStoreModule`), або класів (наприклад, `BaseStoreModule`, але вони
@deprecated).

Під кожен типовий кейс системи (табличка сутностей, карточка сутності, апі) є окремий метод для створення стор модуля.
Якщо ж кейс нетиповий, то краще просто використати `createBaseStoreModule`, оскільки у ньому лежать дефолтні методи
для зручної роботи з будь-яким модулем.

Для роботи зі стором типових кейсів у компонентах також є composables, які дозволяють легко взаємодіяти зі стором
(наприклад, `useTableStore`).

**Всі (майже) необхідні речі для роботи зі стором можна імпортувати з `@webitel/ui-sdk/store`.**

```javascript
import { createBaseStoreModule, useTableStore } from '@webitel/ui-sdk/store';
```

## In-depth

Коли ми викликаємо `create...StoreModule`, в який ми можемо передати наші кастомні state, actions, etc., запускається
ланка створення ієрархії сторів, починаючи від `baseStoreModule`, і далі, за певною ієрархією.

Там все доволі просто: всі параметри передаються "вниз" по ієрархії, і в кінці все просто **мерджиться** між собою,
**з приорітетом "вищого"**, тобто, переданого "пізніше".

### Також, важливо:

* **State НЕ копіюється**. Відповідно, при кожному створенні кастомного модуля в декількох кейсах треба передавати
  окремий,
  новий, обʼєкт state в кожен кейс - тому що інакше це буде один обʼєкт між всіма стор модулями, який буде між ними
  шейритись.
  _Наприклад, ми хочемо створити свою обгортку стора для пермішенів, яку ми будемо перевикористовувати у кожній
  сутності, яка
  має в собі пермішени. Якщо ми передамо один і той же обʼєкт state в кожен модуль, то при зміні стейту в одному модулі,
  він мінятиметься у інших._


* **State мерджиться глибоко**. Тобто, мерджиться навіть глибока вкладеність. АЛЕ! Не мерджаться обʼєкти, які не є
  обʼєктами
  (наприклад, не змерджиться 2 мапи в одну, з ключами з обох мап)

## Як практично користуватись методами стор модулів?

### Створення стор модуля на основі існуючих методів

```javascript
// import method
import { createBaseStoreModule } from '@webitel/ui-sdk/store';

// create custom state
const state = {
  custom: 'state',
};

// create custom actions
const actions = {
  CUSTOM: () => {},
  // will override action with name "EXISTING" from baseStoreModule
  EXISTING: () => {},
};

// create module
const myModule = createBaseStoreModule({
  state,
  actions,
});

// export module
export default myModule;
```

### Як створити новий метод

```javascript
// createCustomStoreModule.js

// import base method
import { createBaseStoreModule } from '@webitel/ui-sdk/store';

// create custom state, use method to prevent sharing same state object between customStoreModule usages
const customState = () => ({
  custom: 'state',
});

const createCustomStoreModule = (modules) => {
  // modules can accept arrays
  const modulesArr = Array.isArray(modules) ? modules : [modules];

  // createBaseStoreModule
  return createBaseStoreModule([
    // customStoreModule specifics
    { state: customState() },
    // + some extensions, passed as arguments
    ...modulesArr,
  ]);
};
```

## Що у нас тут є?

На момент написання доки:

* `createBaseStoreModule` - базовий метод для створення стор модуля, який має в собі дефолтні методи для роботи зі
  стором.


* `createTableStoreModule` + `useTableStoreModule` - метод для створення стора для таблиці сутностей, та компоузабл для
  інтеграції з
  компонентом.


* `createCardStoreModule` + `useCardStoreModule` - метод для створення стора для карточки сутності, + компоузабл.


* `createApiStoreModule` - метод для створення стора для апі, який вже має в собі методи для роботи з апі.

## Коли що використовувати?

### Типовий розділ

* Робите складний розділ з таблицею та карточкою сутності? Вам треба майже все, дивіться
  [how to: Integration between store modules](../../../docs/how-to/Integration%20between%20store%20modules).

### Тільки табличка

Робите просто табличку? Берете `createTableStoreModule` [дока](../createTableStoreModule/Readme.md) метод для стора,
i компоузабл `useTableStoreModuleя для інтеграції з компонентом.

### Тільки карточка

Робите тільки карточку? Це не точно, що вам знадобиться, але придивіться
до `createCardStoreModule` [дока](../createCardStoreModule/Readme.md).

### Апі

Необхідно підʼєднати api до одного з попередніх кейсів? Використовуйте вже інтегрований в них
`createApiStoreModule` [дока](../createApiStoreModule/Readme.md).

### Шось своє

**Хочете зробити щось своє? Використовуйте `createBaseStoreModule` [дока](../createBaseStoreModule/Readme.md).**

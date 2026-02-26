# Userinfo: Access Control

>[!IMPORTANT]
> Перед прочитанням технічної доки ДУЖЕ наполегливо рекомендую ознайомитись з
> [загальними доками](../../../../../knowledge-base/general/access-control/index.md) 
> по Правах доступу у категорії Knowledge Base.

Модуль відповідає за зберігання та розрахунок прав доступу до дій / сторінок / обʼєктів.

## Ініціалізація

Усереднена ініціалізація в апплікейшені виглядає десь так:

:::details main.ts

```js
// main.ts

import { createUserAccessControl } from './app/composables/useUserAccessControl';

import { useUserinfoStore } from './modules/userinfo/store/userinfoStore';

const initApp = async () => {
	const app = createApp(App)
    // ..
    /* Перед ініціалізацією userinfoStore маємо спершу зареєструвати pinia  */
    .use(pinia);

	const { initialize, routeAccessGuard } = useUserinfoStore();
	try {
        /* 
            Ініціалізуємо userinfoStore, який під капотом ініціалізує
            і accessStore
            
            Саме на цьому етапі робиться запит на Права, і їх
            трансформація для доступу в геттерах
        */
		await initialize();

        /*
          Компоузабл створюємо після ініціалізації стора, 
          бо нам треба прокинути цей стор, щоб ініціалізувати компоузабл 
          (компоузабл напряму залежить від стора, 
          тому що бігає в стор перевіряти права)
        */
		createUserAccessControl(useUserinfoStore);

        /*
          Ініціалізуємо роутер після того, ініціалізували userinfoStore 
          і routeAccessGuard вже знає, куди (не)можна пускати користувача.
        */
		await initRouter({
			beforeEach: [
				routeAccessGuard,
			],
		});
	} catch (err) {
		console.error('Error initializing app', err);
	}

/* 
        Отут дуже важливо!
        Ми реєструємо роутер ПІСЛЯ того, 
        як ініціалізуємо userinfo i Access Control, 
        тому що вже на старті роутера нам необхідно 
        запустити guard
*/
	app.use(router); // [!code highlight]
	app.use(WebitelUi, {
		...WebitelUiOptions,
		router,
	}); // setup webitel ui after router init

	return app;
};
```
:::

І допоміжні copy-paste файли `useUserAccessControl` і `userinfoStore`:

:::details useUserAccessControl code

```js
// crm/../useUserAccessControl.ts
import { createUserAccessControlComposable } from '@webitel/ui-sdk/modules/Userinfo';

export let useUserAccessControl: ReturnType<
	typeof createUserAccessControlComposable
>;

export const createUserAccessControl = (useUserinfoStore) => {
	useUserAccessControl = createUserAccessControlComposable(useUserinfoStore);
	return useUserAccessControl;
};
```
:::

:::details userinfoStore code

```js
// crm/../userinfoStore.ts
import { createUserinfoStore } from '@webitel/ui-sdk/modules/Userinfo';

export const useUserinfoStore = createUserinfoStore();
```
:::

## В яких місцях відбувається перевірка Прав

На фронтенді є 3 таких основних місця:

1. **Перевірка на етапі роутингу**: глобальний router guard, 
який реєструється при ініціалізації `userinfoStore`.

В основному, виконує функцію "пустити" / "не пустити" до певної сторінки.

2. **Перевірка на CRUD в середині компонентів**: `useUserAccessControl` composable,
який використовується в компонентах для перевірки **CRUD** (!) прав до конкретного обʼєкта.

3. **Специфічні перевірки на глобальні права або ліцензії**:
`userinfoStore` зі своїми геттерами для таких кейсів.

### Перевірка на етапі роутингу

В кожному апплікейшені глобально реєструється (один, конкретний) `beforeEnter` route guard,
Який перевіряє роути згідно їхніх `meta` філдів.

В роутах апплікейшена (там де права мають перевірятись) має бути вказана `meta`, по якій перевірятиметься.
Мета складається з 2х полів:

[Чому двох, і чому саме цих?](#як-в-кінцевому-вигляді-розраховуються-права)

1. `WtObject` – Обʼєкт, який варто перевірити при вході на певний роут
2. `UiSection` – Секція, видимість до якої треба перевірити при вході на певний роут

>[!WARNING]
> Якщо цих метаданих у роута немає, то він НЕ перевіряється.

>[!IMPORTANT]
> Зверніть увагу!
>
> Пошук цих метаданих відбувається по дереву роутингу знизу вверх. Тобто, братиметься найперший перент,
> який має ці метадані.

### Перевірка на CRUD в середині компонентів

Опрацьовується через `useUserAccessControl` composable (який до речі теж сетапиться 
в кожному апплікейшені окремо на рівні його ініціалізації).

`useUserAccessControl` виконує 2 функції, залежно від параметра:

1. (За замовчуванням) перевіряє CRUD права згідно метаданих в роуті.

2. Може приймати на вхід параметрами `WtObject`, або інші параметри для роботи з [Виключеннями](). Тоді рахує те саме,
але вже до переданого параметра. 

### Специфічні перевірки на глобальні права або ліцензії

Коли нам не підходить все що вище, і треба перевірити щось специфічне. 
Наприклад, наявність ліцензії CallCenter для роботи у Workspace, або право (Global Role Permissions) на прослуховування
записів розмов.

Тоді ми `userinfoStore` тягнемо спеціальні геттери, в які передаємо відповідні параметри (як правило, це values з enum'ів),
і отримуємо `true` / `false`

## Повʼязані enum'и

* `WtObject` – обʼєкт / сутність системи, до якої можна перевіряти права.
* `SpecialGlobalAction` – специфічна глобальна дія, до якої можна перевіряти права (наприклад, на записи розмов).
* `WebitelLicense` – ліцензія.
* `WtApplication`.
* `UiSection`: `AdminSections`, `AuditorSections`, `SupervisorSections`, `CrmSections`.

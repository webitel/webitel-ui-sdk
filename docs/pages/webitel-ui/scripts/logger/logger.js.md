# `logger.js`

## Why?

Щоб писати більш зрозумілі логи. І, в перспективі, мати вже готову обгортку для завантаження логів на сервер.

## Usage

> [!IMPORTANT]
> Увага, імпортувати не треба, бо він буде встановлюватись у об'єкт `window`.

Використовувати так само як і `console.fn()` методи:

```js
// import { wtlog } from '@webitel/ui-sdk/scripts';

// with metadata
wtlog.warn({ entity: 'component', module: 'wt-notifications-bar' })('Some warning message');

// without metadata
wtlog.log('Some warning message');
```

### Methods

Так само, як і у обʼєкта `console`:

* `.log(...)`
* `.warn(...)`
* `.error(...)`
* `.info(...)`

### Params

#### `message`

Так само, як і у обʼєкта `console`, може приймати будь-яку кількість параметрів.

#### `metadata`

Або, обʼєкт з метаданими, які будуть додані до логу.

> [!WARNING]
> В такому разі, логер повертає лог-функцію, а там вже все [те саме](#message).

* `entity` - назва сутності, яка викликала лог (компонент, стор, апі, етс)
* `module` - назва модуля, який викликає лог (наразі, не придумав точного визначення,
тому, на ваш розсуд – але має бути чітко зрозуміло, куди лізти)
* `app` – назва апплікейшена. якщо передана, може переписати дефолтне (задане глобально).


## Installation

Інсталюємо глобально:

```js
// src/app/plugins/webitel-ui.js

// ...
import { wtlog } from '@webitel/ui-sdk/scripts';
// ...

window.wtlog = wtlog('appname');
```

## Usage in webitel ui

> [!IMPORTANT]
> Увага, з інших місць, крім сорсів ліби, ручками туди **не ліземо!**

```js
// component.vue

import { _wtUiLog } from '../scripts/logger.js'; // зашитий ui-sdk app namespace
// ...

_wtUiLog.warn({ entity: 'component', module: 'wt-notifications-bar' })('Some warning message');
```



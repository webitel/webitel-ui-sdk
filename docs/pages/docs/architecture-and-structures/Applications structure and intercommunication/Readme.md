# Applications structure and Intercommunication

Front-end частина Webitel складається з декількох окремих, standalone апплікейшенів,
які (за потреби, що буває доволі рідко) взаємодіють через `redirects`, та `localStorage`.

_Запитаєте: Чому? - Скажу: історично_ 🙂

[Список](#applications-list) апплікашок в кінці доки

## Взаємозвʼязок та взаємодія

Як такого, звʼязку чи взаємодії між різними апплікаціями немає.
Весь спільний, реюзабельний код виноситься у [webitel-ui](#webitel-ui). Перехід між апплікейшенами
відбувається через спільну навігацію, а інформація про користувача завантажується у кожному апплікейшені
окремо.

Втім, авторизація має бути спільною, а також необхідно забезпечити перехід від адмінки до флова, і назад.
Це реалізовано через `route` `redirect` `query params`.

## Паттерни структури самих апплікейшенів

Є певний паттерн, певна логіка, згідно якої розміщаються файлики та папочки у проектах. Основна
ідея в тому, що проекти "нарізаються" на [feature slices](https://feature-sliced.design/).

_Note: Я вперше загуглив це і вперше зайшов на цей сайт, тож, якщо що,
не обіцяю що у нас все структуровано, як в reference model_ 🙂

Як правило, на руті є папки `app` i `modules`.

### Папка `App`

![src/app](./assets/app-dir-structure.png)

_(на прикладі [адмінки](#admin))_

У папці `app` лежить сетап апплікейшена, один, глобальний, спільний, і все таке: рут компонентик,
підключення глобальних плагінів, роутер, основний стор модуль, або якісь повністю `shared` скрипти,
компоненти, etc.

Як правило, при роботі з проектом, туди додавати нічого не треба, бо там вже все було додано на етапі
сетапу цього проекту 🙂.

### Папка `Modules`

![src/modules](./assets/modules-dir-structure.png)

_(на прикладі [адмінки](#admin))_

У папці `modules` лежать модулі-фічі. Залежно від апплікейшена, це можуть бути різні ділення на фічі.
Наприклад, у адмінці це можуть бути одночасно ділення по роутах, і просто модуль зі стором, спільним
для всіх попередніх роутів.

Кожен модуль може містити в собі такі штуки (і відповідно папки), як:
- `api`
- `components`
- `css`
- `store`
- `assets`
- `enums`
- `scripts`
- `mixins`/`composables`
- `modules`

Ну і щось більш екзотичне, залежно від потреби.

### Рекурсивність модулів

Модуль може включати в себе модулі. Рекурсивно, на будь-яку глибину.

_Note: store має бути ієрархічним, тобто, модуль-чайлд має бути так само чайлдом стор-модуля._


## Applications list

### Auth
- repository: [web-client-auth](https://github.com/webitel/web-client-auth)
- dev: [dev.webitel.com/app/auth](https://dev.webitel.com/app/auth)

### Admin
- repository: [client](https://github.com/webitel/client)
- dev: [dev.webitel.com](https://dev.webitel.com/)

### Workspace
- repository: [cc-workslace](https://github.com/webitel/cc-workspaces)
- dev: [dev.webitel.com/workspace](https://dev.webitel.com/workspace)

### Supervisor
- repository: [cc-supervisor](https://github.com/webitel/cc-supervisor)
- dev: [dev.webitel.com/supervisor](https://dev.webitel.com/supervisor)

### Audit
- repository: [cc-quality-auditor](https://github.com/webitel/cc-quality-auditor)
- dev: [dev.webitel.com/audit](https://dev.webitel.com/audit)

### History
- repository: [cc-history](https://github.com/webitel/cc-history)
- dev: [dev.webitel.com/history](https://dev.webitel.com/history)

### CRM
- repository: [crm](https://github.com/webitel/crm)
- dev: [dev.webitel.com/crm](https://dev.webitel.com/crm)

### Webitel UI
- repository: [webitel-ui-sdk](https://github.com/webitel/webitel-ui-sdk)
- docs: [webitel.github.io/webitel-ui-sdk](https://webitel.github.io/webitel-ui-sdk)

### Flow
- repository: [webitel-flow-diagram](https://git.webitel.com/projects/CORE/repos/webitel-flow-diagram/browse)
- dev: [dev.webitel.com/flow/:id](https://dev.webitel.com/flow/767)

### Omni-Widget
- repository: [omnichannel-widget](https://github.com/webitel/omnichannel-widget)
- dev: [tst.webitel.ua](https://tst.webitel.ua/)

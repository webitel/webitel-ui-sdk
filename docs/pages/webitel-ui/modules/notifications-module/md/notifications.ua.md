# Notifications

## Загальне
Модуль нотифікацій імплементує весь функціонал, пов'язаний з системними:
- Browser notifications API
- Sound (ringing call, new chat message, etc)
- Counter in tab title
нотифікаціями користувача про події.

Підтримує синхронізацію роботи в декількох табах одночасно.

**Важливо! Не плутати з ui-нотифікаціями, які забезпечує
`wt-notification.vue` i `wt-notifications-bar.vue`.**

## Store Action Інтерфейс

Модуль забезпечує користувача такими Store Actions для користування:
 - `INITIALIZE: (context)`

Ініціалізує модуль, підписки, broadcastChannel, etc. Треба викликати перед початком
використання. Бажано на ініціалізації всього апплікейшена.

 - `DESTROY: (context)`

Видаляє інстанс, робить cleanup. Треба викликати перед виключенням сторінки
`window.addEventListener('beforeunload')` щоб все працювало корректно. В противному
випадку, якщо відкрито декілька таб, звук не "перейде" з новішої на старішу при
закритті нової.

 - `PLAY_SOUND: (context, { action, sound })`

Пілікаємо певний звук: це може бути новий меседж, рінгінг дзвінка, етс. `Action`- основний
параметр наразі підтримує:
    - `ChatActions.UserInvite`
    - `ChatActions.Message`
    - `ChatActions.Close`
    - `CallActions.Ringing`
із дефолтними для них звуками.
Якщо необхідно обробити не зазначений вище кейс, або додати свій звук - можна передати
`sound` параметром. `sound` може бути файлом, або `instanceof Audio`.

 - `STOP_SOUND: (context)`

Зупинити програвання поточного звуку.

**Увага! Не зупиняє дзвінок!**


 - `SEND_NOTIFICATION: (
    context,
{
   locale,
   text = i18n.t(locale),
   icon = notificationIcon,
   interval = NOTIFICATION_VISIBLE_INTERVAL,
}
   )`

Відправити [Desktop Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API).
interval - інтервал перед пропаданням нотифікейшена.

 - `INCREMENT_UNREAD_COUNT: (context)`
Збільшити каунтер у tab title. Ресетається каунтер автоматично, при кліку
по цій табі.


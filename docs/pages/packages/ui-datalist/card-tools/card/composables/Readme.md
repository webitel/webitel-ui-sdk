# Card Tools / Composables

## `useCardComponent` – all-in-one на рівні клієнта

Основний `composable` для роботи на рівні клієнта [цього пакета].

* **Імпортується в компонент враппера табів** карточки (`opened-entity.vue`).

* **Отримує параметром** [`useCardStore`](../stores/Readme.md), з цього ж модуля.

* **Вертає все що треба** (_і не треба_) для карточки. Тут вже дивіться типи, IDE вам підтягне.

## Вкладені composables

> [!WARNING]
> **Зверніть увагу!** Якщо вам треба там щось поміняти, але ви не є безпосереднім мейнтейнером цього пакета,
> то не певен, що вам варто лізти сюди в глибину згідно нашого 1-2 розділення 🙂 

### Ідея

Ідея така: мінімізувати кількість імпортів і коду на рівні клієнтського компонента. Тобто,
щоб не було явного "розпаковування" `useCardStore`, і перекидання його параметрів по безлічі
компоузаблів, між якими теж треба ті параметри перекидати туди-сюди.

**Тому, модуль спеціально був задизайнений так, щоб мінімалізувати взаємодію клієнтських компонентів з нутрощами ліби**.
Тому і маємо тут вкладені composables, які "ковбасяться" в середині і вертають на "клієнта" тільки те що потрібно.

### `useCardValidation`

> [!IMPORTANT]
> **Зверніть увагу!** саме `useCardValidation` в результаті вертає на клієнтський компонент
> `modelValue`, до якого потім через `v-model` вʼяжуться інпути форми.

### Інші composables

**1 composable => 1 ui фіча для типового компонента карточки.**

Не певен, що тут варто розписувати. Але якщо треба описати щось, то пінгайте мене (_@d.lohvinov_).

# Query Filters

Так само відомі як "старі фільтри".

## Як працюють старі фільтри?

### Query Controller Mixin

Є міксин, який керує router'ом. Все вертиться навколо нього (міксина, власне).

### Filter mixins

Є міксини фільтрів, в задачу яких входить відновлення стану фільтрації з роута, а також
set параметрів у store. Вони наслідують міксин роутера.

### Filter components

Є компоненти (селекти, наприклад), які використовують міксини фільтрів. Вони
використовують свої міксини, які є обгортками над двома попередніми, з відповідним
функціоналом: відновити дані, потягти дані з сервера, якщо це API-select.

Можна скористатись цим компонентом, а можна імпортувати міксини напряму - і написати свій кастомний
фільтр.

### Store

Є стор, у якому описуються схеми фільтрів, та в нього кладуться дані з компонентів - через міксини, знов таки.

Є набір класів фільтрів, які форсять дефолтну схему певного фільтра за його типом (дефолт, єнам, апі).

### Watcher у компоненті таблиці

Компонент таблиці watch'ить router.query, і, коли він змінився - викликає перезавантаженя
ліста.

### GET_FILTERS

У перезавантаженні ліста викликається метод, який агрегує значення фільтрів зі стор модуля, та надсилає їх.

Все це виглядає приблизно так:

_Hint: "Open image in new tab" for better view._

![](assets/old-schema.jpg)

Тут ми бачимо декілька "центрів тяжіння":

- З одного боку, це router controller mixin, який взаємодіє з router,
- А з іншого, це компонент таблиці, який "дивиться" на router і запускає перезавантаження даних.

## Які ж проблеми виникали?

### Суто архітектурна.

Як правило, стор має керувати апплікейшеном, містити в собі всю heavy
логіку. Тут же стор фільтрів є просто додатком, а основний контроль покладається на міксини.

### Кожен компонент містить в собі міксин, який самостійно керує роутером.

Через це, немає єдиної "точки входу" в роутер, а отже, важко підписатись на цю подію, чи зробити до неї якісь
централізовані хуки або міддлвару.

### Batch update

Через попередню причину, виникає проблема просто в тому, щоб оновити одночасно 2 параметри,
при цьому, не викликаючи перезавантаження даних на кожну зміну: наприклад, оновлюється один фільтр,
а нам після його оновлення треба скинути пейджу. Як? А ніяк: вотчером на роутер? - побіжить 2 запити.
А перехопити зміну фільтра і додати якусь додаткову логіку можливості немає.

### Неявна залежність між оновленням фільтрів та перезавантаженням даних.

Вотчер на роутер.квері можна
забути написати. Немає зручної можливості перебирати, що змінилось, і все таке. Більше того:
у нас проблеми з тим, щоб визначити джерело істиності фільтра: кверя роутера, яка є основним контролюючим елементом
схеми, або роутер - який концептуально мав би бути основним?

### Наше улюблене: міксин в міксині, в міксині. Ням-ням.

Отже, виходить, що старі фільтри виглядають доволі складними, неочевидними та заплутаними через
перевертання керуючих компонентів, а також через неможливість задовільнити вимогу скидати пейджу,
коли оновлюється фільтр.

## Як працюють нові фільтри?

[Детально, Filters](../Filters/Readme.md)

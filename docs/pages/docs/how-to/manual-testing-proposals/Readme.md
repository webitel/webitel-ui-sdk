# Manual Testing Proposals

> [!IMPORTANT]
> Цільова аудиторія доки – QA-інженери, які виконують ручне тестування.

Тут фіксуватимуться пропозиції-прохання щодо ручного тестування:

- Як оформлювати?

## Тестування з консоллю

### Проблема

Коли репортиться помилка без консолі або нетворку, то важко зрозуміти, що саме відбувається, дивлячись
просто на відтворення. Через це важче поверхнево оцінити причину, і, до кого звертатись в першу чергу.

Також, якщо це плаваючі баги, які не завжди відтворюються, консоль може дуже допомогтти зрозуміти,
в чому причина, без власного відтворення.

### Рішення

Прошу одразу при тестуванні відкривати консоль браузера, і, коли виникає помилка, також до баг репорту
докладати скріншоти консолі (або щоб її було видно на відео).

Також, якщо бага повʼязана з мережею, прошу також додавати скріншоти з вкладки Network.

> [!IMPORTANT]
> За замовчуванням, вкладка Network не трекає нетворки. Щоб вона почала це робити – треба спершу її відкрити.
> Тому, перед тим як відтворювати багу, відкрийте вкладку Network, і вже тоді відтворюйте багу.

## Креди для відтворення помилок

### Проблема

Ми (принаймні, фронтенд команда) більше працюємо з кодом, ніж з ui, через що нам може бути важко
створити умови відтворення баги (наприклад, нам треба виправити відображення емейла у воркспейсі, а щоб відтворити
це нам треба з самого початку налаштувати емейли).

В такому разі, може виникати ситуація, коли налаштувати все для відтворення баги займає більше часу, ніж
виправити саму багу.

Також, якщо ми не знаємо, як налаштувати все, то ми підемо по консультацію до QA, DevOps або бекенду,
і, відповідно, відволікатимемо їх від їхньої роботи, щоб це уточнити – що теж доволі неприємно 🥲

### Рішення

Прошу в баг репорт додавати налаштування для відтворення баги.

Щодо того, що саме додавати, то тут як вам буде зручно.
Це можуть бути:

- Посилання на, скажімо, налаштовані обʼєкти (наприклад, на флов, на якому це відтворюється, або на налаштовану чергу)
  – якщо їх треба просто засетати на свого юзера/чергу/етс.
- Можна додавати креди для входу (логін/пароль) на користувача, на якому це відтворюється.

> [!NOTE]
> Якщо ви даєте користувача, на якому може сидіти декілька користувачів одночасно (наприклад, я, та хтось з QA) – то
> може бути ризик того, що ми одне одному заважатимемо і впливатимемо на результати одне одного. Зважайте на це.

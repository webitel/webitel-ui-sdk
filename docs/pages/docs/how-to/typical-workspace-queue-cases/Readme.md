# Типові кейси роботи з чергами у Workspace

**Сутності створюємо свої, а ті що в прикладах - не чіпаємо!**

## How to setup agent account and assign it to queue?

1. Створити користувача.
2. Назначити користувачу девайс, а також дефолтний девайс.

[Приклад користувача](https://dev.webitel.com/directory/users/9528)

3. Створити свій операторський скілл.

[Приклад скілла](https://dev.webitel.com/lookups/skills/277)

4. Створити агента з цього користувача, та назначити йому цей скілл.

[Приклад агента](https://dev.webitel.com/contact-center/agents/3709)

5. Створити чергу для цього оператора. В неї додати операторський скілл.

[Приклад черги](https://dev.webitel.com/contact-center/queues/730)


## How to call to yourself to Inbound Queue?

Для цього необхідно мати 2 акаунти: акаунт-оператор і акаунт-мембер.

_Виконані пункти можна пропустити._

### [How to setup agent account and assign it to queue?](#how-to-setup-agent-account-and-assign-it-to-queue)
Чергу треба створити вхідну.

### How to setup member account?

1. Створити користувача.
2. Назначити користувачу девайс, а також дефолтний девайс.

[Приклад користувача](https://dev.webitel.com/directory/users/10555)

### How to setup queue?

1. Створити флов. У флові налаштувати `joinQueue` на чергу, створену для оператора.

[Приклад флова](https://dev.webitel.com/routing/flow/1331?editor=diagram)

2. Створити діалплан. У діалплані вибрати створений на попередньому кроці флов.
3. В діалплані вказати дестінейшен намбер, на який дзвонитимемо.

[Приклад діалплану](https://dev.webitel.com/routing/dialplan/109)

### How to call, actually?
1. Зайти у обидва аккаунти з різних браузерів.
2. У акаунті оператора ввійти в режим Contact Center.
3. У аккаунті мембера подзвонити на номер, вказаний в діалплані.

## How to send a task (job) to yourself in Workspace?

_Виконані пункти можна пропустити._

### [How to setup agent account and assign it to queue?](#how-to-setup-agent-account-and-assign-it-to-queue)

Чергу треба створити вхідну для задач.

[Приклад черги](https://dev.webitel.com/contact-center/queues/505)

### How to make a task?

1. Відкрити розділ мемберів для створеної вище черги.
2. Створити мембера. Будь-якого.

### How to receive a task in Workspace?
1. Зайти у Contact-center з акаунта агента.
2. Задача має прийти автоматично.

# How to add form components to workspace chats

1. Створити користувача.

2. Створити свою схему з типом Forms.

[Приклад схеми](https://dev.webitel.com/flow/1641/processing)

3. Створити свою чергу з типом Chat inbound queue. Додати обов'язкові поля (name i calendar strategy) Календар додати з ім'ям Загальний календар або інший працюючий календар. В табі Processing переключити світчер Waiting for call result та вибрати свою схему у селекті Dynamic processing schema

[Приклад черги](https://dev.webitel.com/contact-center/queues/459/chat-inbound-queue)

4. Створити свій операторський скілл.

[Приклад скілла](https://dev.webitel.com/lookups/skills/387)

5. Створити агента з цього користувача, та назначити йому цей скілл.

[Приклад агента](https://dev.webitel.com/contact-center/agents/4511)

6. Сворити батьківську схему у якій в аплікейшн Join Queue потрібно додати чергу, створену для оператора, в якій є схема з формами.

[Приклад флова](https://dev.webitel.com/flow/888/default)

7. Створити телеграм бота

[Документація](https://webitel.atlassian.net/wiki/spaces/WEP/pages/21304403/Telegram)

8. В телеграм бота в селекті Flow schema вибрати створену батьківську схему.

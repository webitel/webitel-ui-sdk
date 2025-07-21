# Типові кейси роботи з чергами у Workspace

**Сутності створюємо свої, а ті що в прикладах - не чіпаємо!**

[[toc]]

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

## How to chat yourself from telegram bot to Workspace?

TODO

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

## Contacts: link chat to a contact?

### Setup agent

Див. [вище](#how-to-setup-agent-account-and-assign-it-to-queue)

### Setup chat bot

Див. [вище](#how-to-chat-yourself-from-telegram-bot-to-workspace)

### Setup contact

1. Створити контакт у CRM.

### How to link?

Пишемо з телеграма у чат-бот. Чат-бот перекидає чат на Workspace. У цього чату є `conversationId`.

Наразі, через [swagger](https://swagger.webitel.com/#/ContactLinkingService/ContactLinkingService_LinkContactToClient),
передавши в нього id контакта та id самого чату.

## Contacts: link call to a contact?

TODO

## Contact Timeline: How to add records to a contact history timeline?

Потрібно привʼязати [чат](#contacts-link-chat-to-a-contact) та/або [дзвінок](#contacts-link-call-to-a-contact) до контакту.

Історія має зʼявитись автоматично.

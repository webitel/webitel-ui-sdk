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

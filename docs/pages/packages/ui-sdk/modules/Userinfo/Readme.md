# Userinfo module

> [!IMPORTANT]
> **Зважайте!** модуль – складний.
> А отже, its okay, якщо вам треба більше часу розібратись, 
> проконсультуватись, або необхідно дописати якісь доки.

## Introduction

## Задачі модуля

### Інформація про користувача

Наприклад, його `username`, `userId`. 

### Інформація про права доступу користувача

Зокрема, геттери / функції для розрахунків прав до конкретних роутів, розділів або апплікейшенів.

### Useful links

* [Запис міту про Права Доступу](https://teams.microsoft.com/l/message/19:e8f11f86917b45a0b969063125acf0fd@thread.tacv2/1747040755121?tenantId=a0af3217-4706-43bc-b2ae-a8cb2c83b8a9&groupId=b98d2b69-fcec-4e46-87d0-30849d068f8f&parentMessageId=1747040755121&teamName=Webitel&channelName=Product%20Channel&createdTime=1747040755121&ngc=true) -
**Важливий запис!** Презентація, приклад налаштування в адмінці і нюансів роботи.

# Userinfo module, v2

Станом на `v25.08` – з самим `userinfo` модулем в контексті інформації про користувача – нічого не робилось.
Задача `userinfoStore` – бути враппером для `accessControlStore`, через який [_userinfo, тобто_] робиться
ініціалізація.

## Access Control

Читаєм тут: [Access Control](./access/Readme.md).
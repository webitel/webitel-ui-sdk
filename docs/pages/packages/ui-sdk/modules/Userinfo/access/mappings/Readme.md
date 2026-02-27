# Access info mappings

>[!WARNING]
> Стаття – WIP. Не певен чи вона має сенс, тому лишив недопрацьованою.

Сутностей маємо багато, а ще більше форматів даних з тими сутностями. 

Тому маємо потребу мапити одне до одного, щоб з того response, який нам
надсилає бекенд, отримати інформацію по Правах, яка зручна нам для наших розрахунків.

Нагадую: 

Бек вертає:

* `license`
* `scope` – [ScopeClass](../../../../../../knowledge-base/general/access-control/vocabulary/Readme.md#scope-class--скоуп-клас)
* `permissions` – [Global Role Permissions](../../../../../../knowledge-base/general/access-control/access-configuration/Readme.md#global-role-permissions)
* `access` – [Role Visual Access](../../../../../../knowledge-base/general/access-control/access-configuration/Readme.md#role-applications-visual-access)

А нам це все треба звести до єдиного вигляду.
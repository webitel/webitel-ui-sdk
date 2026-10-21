# Модуль SystemSettings

Підтримує системні налаштування (`System > Configuration`) в актуальному стані в застосунку, без перезавантаження сторінки.

Коли адміністратор змінює налаштування, бекенд надсилає подію `system_settings_changed` через websocket
усім авторизованим користувачам домену. Подію емітить `webitel-sdk` >= 26.4.35.

> [!IMPORTANT]
> Бекенд надсилає події лише для налаштувань зі свого allowlist. Налаштування, якого там немає, завантажується один раз і наживо не оновлюється.

## Стор

Модуль надає композабл `useSystemSettings(names)`, а стор застосунок оголошує сам – як setup-стор:

```ts
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { useSystemSettings } from '@webitel/ui-sdk/modules/SystemSettings';
import { defineStore } from 'pinia';

export const useSystemSettingsStore = defineStore('systemSettings', () => {
  const { settings, initialize, reload, applyChange, subscribe } = useSystemSettings([
    EngineSystemSettingName.WbtHideContact,
    EngineSystemSettingName.ShowFullContact,
  ]);

  return { settings, initialize, reload, applyChange, subscribe };
});
```

`names` – налаштування, які відстежує стор. Події для інших налаштувань ігноруються.

Кожен виклик `useSystemSettings()` створює власний стан, тож викликайте його один раз – усередині стору.

Композабл повертає:

| | |
|---|---|
| `settings` | значення за назвою налаштування. `undefined` – налаштування не задане |
| `initialize()` | завантажує всі `names` одним запитом. Одночасні та повторні виклики використовують цей самий запит |
| `reload()` | повторно завантажує всі `names` |
| `applyChange({ name, value })` | застосовує подію: записує `value` або перечитує налаштування, якщо в події немає `value` |
| `subscribe(client)` | застосовує події `system_settings_changed` переданого клієнта `webitel-sdk` |

## Підключення

Стор не відкриває власного websocket-з'єднання: застосунок передає свій клієнт.

`subscribe()` викликається один раз на кожен екземпляр клієнта:

- якщо при перепідключенні застосунок створює новий клієнт (як `cc-workspaces`) – підпишіть кожен новий клієнт;
- якщо клієнт той самий упродовж усієї сесії (як `agent-workspace-app`) – підпишіть його один раз.
  Повторна підписка того самого клієнта додасть дублікати слухачів.

`reload()` – після кожного перепідключення, бо події, надіслані, поки сокет був недоступний, втрачено.

```ts
// один раз на екземпляр клієнта
systemSettingsStore.subscribe(cli);

// після кожного перепідключення
await systemSettingsStore.reload();
```

Достатньо викликати `initialize()` в одному місці: у компоненті, який завжди змонтований,
або там, де треба дочекатися значень. Решта компонентів лише читають `settings` – значення реактивні
й оновляться, щойно завантажаться. Повторні виклики `initialize()` безпечні, але зайві.

```ts
const systemSettingsStore = useSystemSettingsStore();

const isHideContact = computed(
  () => systemSettingsStore.settings[EngineSystemSettingName.WbtHideContact],
);

// лише в одному місці, напр. у компоненті, що завжди змонтований
onMounted(systemSettingsStore.initialize);
```

> [!WARNING]
> у події приходить системне значення, а не те, що діє для цього користувача.

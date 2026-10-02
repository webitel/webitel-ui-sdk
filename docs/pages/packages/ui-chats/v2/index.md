# ui-chats v2

Історія повідомлень і поле введення активного чату для нового Workspace
([WS-50](https://webitel.atlassian.net/browse/WS-50), Figma DES-730).
Живе поруч з v1 (`@webitel/ui-chats/ui`) і не залежить від нього.

Вхід — plain-моделі `@webitel/chat-web-sdk` (`ThreadModel`, `MessageModel`),
без власного контракту й адаптера. Чому так — див.
[v2: UI приймає моделі `chat-web-sdk` напряму](../architecture/v2-sdk-models.md).

v2 малює лише дві речі: історію повідомлень і поле введення. Верхня панель,
вкладки, Info, Post-processing, права панель і Snooze — відповідальність
застосунку.

## Підключення

1. `setConfig({ i18n })` — той самий виклик, що й для v1; рядки v2
   (`'@webitel/ui-chats'.v2.*`) підмерджуються автоматично.
2. Токени Workspace — обов'язково:

```ts
import '@webitel/styleguide/agent-workspace-app';
```

Без них бульбашки й поле введення не матимуть кольорів і відступів.

## Приклад

```vue
<template>
  <chat-thread
    :thread="thread"
    :messages="messages"
    :self-member-id="selfMemberId"
    :mode="mode"
    :has-more="hasMore"
    @load-more="chatSession.loadMore"
    @send="chatSession.sendText"
    @attach="chatSession.sendFiles"
    @seen="(message) => message.markRead?.()"
  >
    <template #actions="{ insertText, disabled }">
      <!-- швидкі відповіді (WS-53) -->
    </template>
  </chat-thread>
</template>

<script setup lang="ts">
import { ChatThread } from '@webitel/ui-chats/v2';
</script>
```

## `ChatThread`

### Props

| Prop | Тип | За замовчуванням | Примітка |
|---|---|---|---|
| `thread` | `ThreadModel` | — | з нього читаються `members` і `readStates` |
| `messages` | `MessageModel[]` | — | від старих до нових; поточна й попередні сесії |
| `selfMemberId` | `string` | — | id учасника треду, який зараз працює з UI |
| `mode` | `'awaiting' \| 'active' \| 'readonly'` | `'active'` | див. «Режими» |
| `hasMore` | `boolean` | `false` | чи є старіша історія |
| `onLoadMore` | `() => Promise<unknown>` | — | біндиться через `@load-more` |
| `onSend` | `(text: string) => Promise<unknown>` | — | біндиться через `@send` |
| `onAttach` | `(files: File[]) => Promise<unknown>` | — | біндиться через `@attach` |
| `actions` | `ChatComposerAction[]` | усі | `'attach' \| 'emoji' \| 'send'` |
| `submitOnEnter` | `boolean` | `true` | як у v1 (мобільні, WTEL-10388) |
| `resolveAvatarUrl` | `(member) => string \| undefined` | — | без нього — ініціали |
| `draft` (v-model) | `string` | внутрішній | для чернеток на рівні застосунку |

### Події

| Подія | Payload | Примітка |
|---|---|---|
| `seen` | `MessageModel` | найновіше повідомлення, яке оператор побачив унизу історії |

### Слоти

| Слот | Props | Примітка |
|---|---|---|
| `actions` | `{ insertText(text), focus(), disabled }` | дії поля введення після attach / emoji |

`ChatHistory` і `ChatComposer` експортуються окремо — для read-only історії
чи власної оболонки.

## Чому function props, а не events

`@send="…"` у шаблоні біндиться в prop `onSend`, тож компонент може
дочекатися промісу:

- поки проміс у процесі — поле й дії заблоковані, чернетка видима;
- resolve — чернетка очищується, фокус повертається в поле;
- reject — чернетка лишається, помилка летить далі; показує її застосунок.

Так само `@load-more`: спінер угорі горить, поки проміс не завершиться.

## Бульбашки: сторона і колір

- **Сторона:** власні повідомлення оператора — праворуч, усі інші (клієнт, інші оператори, боти) — ліворуч. «Власне» — це той самий `sub` + `iss` контакту, що й у `selfMemberId` (id учасника змінюється при повторному додаванні до треду, контакт — ні). Поки власний учасник невідомий (акаунт ще не завантажено), праворуч стоїть вся сторона контактного центру.
- **Колір:** оператори й боти мають колір «агента», клієнт — колір «клієнта», незалежно від сторони.

## Режими

| `mode` | Історія | Поле введення |
|---|---|---|
| `active` | повідомлення | є |
| `awaiting` | повідомлення + «Очікування, поки оператор прийме чат…» | немає |
| `readonly` | повідомлення | немає |

Як мапити стан задачі на режим — вирішує застосунок.

## Відомі припущення

| Що | Статус | Де змінювати |
|---|---|---|
| Рядки `system.type` і ключ actor'а в metadata | чекаємо [WS-22](https://webitel.atlassian.net/browse/WS-22) | `SYSTEM_NOTICES` у `src/v2/scripts/resolveSystemNotice.ts` |
| `contact.type === 'webitel'` = внутрішній користувач | перенесено з v1, не підтверджено | `isContactCentreSide.ts` |
| Переклади es / kz / pl / ro / uz / vi | чернетки | `src/v2/locale/*` |
| Статуси оновлюються лише з новим `thread.readStates` | у SDK немає socket-події про прочитання | застосунок перечитує тред |

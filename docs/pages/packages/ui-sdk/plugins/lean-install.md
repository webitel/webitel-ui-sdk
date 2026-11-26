# Lean install (`@webitel/ui-sdk/lean`)

Альтернатива стандартному `app.use(WebitelUi, …)` для бандлів, де важить розмір
(наприклад, веб-віджет на сайті клієнта).

Стандартний плагін ([`src/install.ts`](https://github.com/webitel/webitel-ui-sdk/blob/main/src/install.ts))
реєструє всі компоненти й директиви і тягне за собою шрифти, глобальний CSS,
`vidstack` та всі локалі PrimeVue. Lean-версія лише налаштовує PrimeVue з темою
Webitel і реєструє те, що їй передали.

## Приклад

```ts
import WebitelUiLean from '@webitel/ui-sdk/lean';
import WtBadge from '@webitel/ui-sdk/components/wt-badge/wt-badge.vue';
import WtButton from '@webitel/ui-sdk/components/wt-button/wt-button.vue';
import WtLoader from '@webitel/ui-sdk/components/wt-loader/wt-loader.vue';
import PButton from 'primevue/button';
import Tooltip from 'primevue/tooltip';
import { en } from 'primelocale/js/en.js';

app.use(WebitelUiLean, {
	components: { WtButton, WtLoader, WtBadge },
	primevueComponents: { PButton },
	directives: { tooltip: Tooltip },
	locale: en,
});
```

## Опції

| Опція | Що це |
|---|---|
| `components` | компоненти ui-sdk під глобальними іменами (`WtButton`, …) |
| `primevueComponents` | компоненти PrimeVue під іменами, які використовують шаблони ui-sdk (`PButton`, `PPopover`, …) |
| `directives` | директиви (`tooltip`, …) |
| `locale` | вбудовані тексти PrimeVue для однієї мови |
| `eventBus` | те саме, що `eventBus` у стандартному плагіні |

## На що зважати

- **Дочірні компоненти.** Компоненти ui-sdk рендерять дочірні компоненти за
  глобальним іменем, без імпорту. Тому їх теж треба передати: напр. `WtButton`
  потребує `WtLoader`, `WtBadge` і `PButton`. Якщо щось пропущено, Vue в dev-режимі
  попередить `Failed to resolve component`.
- **Глобальний CSS** (змінні styleguide, типографіка, Tailwind, шрифти)
  lean-версія не підключає — це робить застосунок.
- **Тема PrimeVue** та сама, що й у стандартному плагіні: обидва беруть її з
  `src/plugins/primevue/primevue.options.ts`.

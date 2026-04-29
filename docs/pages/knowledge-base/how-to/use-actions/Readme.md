# GitHub Actions

## Actions спільні для всіх аплікейшинів

### [Make Release (Auto-merge)](https://github.com/webitel/client/blob/main/.github/workflows/make-release.yml)
Виносить реліз: створює release-гілку від `main`, bumps версію в `main` на наступну, створює тег і GitHub Release з changelog.

**Параметри:**
- `version, next_version` — поточна та наступна версія через кому (e.g., `26.4, 26.6`)

---

### [Update lib](https://github.com/webitel/client/blob/main/.github/workflows/libs.update.yml)
Оновлює вибрану бібліотеку/пакет до останньої версії і робить коміт з оновленим `package.json` та `package-lock.json`.

**Параметри:**
- `package` — вибрати бібліотеку зі списку

---

### [Copilot Code Review](https://github.com/webitel/client/actions/workflows/copilot-pull-request-reviewer/copilot-pull-request-reviewer)
Запускає AI code review від GitHub Copilot. Використовується за бажанням перед PR.

---

## Actions тільки для репозиторія 'webitel/ui-sdk'"

### webitel package_name pkg publish
Публікує пакет на npm та робить коміт з оновленим `package.json` та `package-lock.json`. Є окремий екшн для кожного пакету, а саме:
#### 1.[api-services](https://github.com/webitel/webitel-ui-sdk/blob/main/.github/workflows/api-services.publish.yml)
#### 2.[ui-chats](https://github.com/webitel/webitel-ui-sdk/blob/main/.github/workflows/ui-chats.publish.yml)
#### 3.[ui-datalist](https://github.com/webitel/webitel-ui-sdk/blob/main/.github/workflows/ui-datalist.publish.yml)
#### 4.[ui-sdk](https://github.com/webitel/webitel-ui-sdk/blob/main/.github/workflows/ui-sdk.publish.yml)
#### 5.[styleguide](https://github.com/webitel/webitel-ui-sdk/blob/main/.github/workflows/styleguide.publish.yml)

---

### [Make docs](https://github.com/webitel/webitel-ui-sdk/blob/main/.github/workflows/ui-sdk.docs.yml)
Генерує та оновлює тільки документацію без оновлення версії бібліотеки `webitel/ui-sdk`

---

### [webitel api-services pkg generate api and publish](https://github.com/webitel/webitel-ui-sdk/blob/main/.github/workflows/api-services.gen-api-and-publish.yml)
Генерує API клієнт з актуальних специфікацій і публікує пакет `@webitel/api-services` в npm. Після генерації автоматично комітить змінені файли назад в репозиторій

---

### [Webitel UI run tests](https://github.com/webitel/webitel-ui-sdk/blob/main/.github/workflows/test.yml)
Запускає unit-тести. Працює автоматично на кожен PR, також можна запустити вручну.

**Розумний запуск** — тести запускаються тільки для пакетів де були зміни:

| Пакет | Тригер |
|-------|--------|
| root (`src/`, `tests/`) | зміни в `src/**` або `tests/**` |
| `api-services` | зміни в `packages/api-services/**` |
| `styleguide` | зміни в `packages/styleguide/**` |
| `ui-datalist` | зміни в `packages/ui-datalist/**` |
| `ui-chats` | зміни в `packages/ui-chats/**` |

Якщо змінились спільні файли (`package.json`, `vitest.config.*`, `tsconfig`, workflows) — запускаються тести для всіх пакетів.

Якщо в PR запущено кілька runs одночасно — попередній автоматично скасовується.

---

### [Webitel UI Lint](https://github.com/webitel/webitel-ui-sdk/blob/main/.github/workflows/lint.yml)
Запускає [Biome](https://biomejs.dev/) лінтер. Працює автоматично на кожен PR, також можна запустити вручну.

Логіка запуску аналогічна до тестів — лінтер запускається тільки для пакетів де були зміни. Спільні файли (`biome.jsonc`, `tsconfig`, workflows) тригерять перевірку всіх пакетів

---


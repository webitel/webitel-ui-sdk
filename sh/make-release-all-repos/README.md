
# Винос у реліз — `sh/make-release-all-repos/make-release-all-repos.ts`

Скрипт одним запуском стартує GitHub-воркфлоу релізу в усіх фронтенд-репо
і чекає, поки вони відпрацюють.

## Що робить

1. Для кожного репо бере дефолтну гілку (або `--ref`) і читає файл воркфлоу:
   - звичайні аппки — `make-release.yml`;
   - `webitel-ui-sdk` — `ui-sdk.next-release-cycle.yml`.
2. Визначає, що передати в інпут `version`:
   - новий воркфлоу (у файлі є `NEXT_VERSION`) → `"26.10, 26.12"` (реліз + наступна версія для `main`);
   - старий воркфлоу → просто `"26.10"`.
3. Показує список репо і що буде відправлено, питає `[y/N]`.
4. Робить `workflow_dispatch` у всіх репо паралельно. Воркфлоу самі створюють
   релізні гілки й теги.
5. Кожні 10 с опитує статус ранів і друкує таблицю `⏳ / ✔ / ✖` з лінками.
   Якщо хоч один ран впав — виходить з кодом 1 і пише, які саме.

Репо, де щось не так (нема воркфлоу, нема доступу, воркфлоу хоче `--next`,
а його не передали), пропускаються з `✖ skipped` — решта йде далі.

Репо за замовчуванням: `client`, `crm`, `cc-supervisor`, `cc-workspaces`,
`cc-history`, `cc-quality-auditor`, `web-client-auth`, `web-meeting`,
`webitel-flow-diagram`, `omnichannel-widget`. `webitel-ui-sdk` у дефолтний
список не входить — його треба вказати через `--repos`.

## Що треба

- `bun` або `node >= 23.6` (TS запускається напряму, залежностей нема).
- GitHub-токен з правом `actions: write` на ці репо:
  `GITHUB_TOKEN` / `GH_TOKEN`, або залогінений `gh` (`gh auth login`) —
  тоді токен береться з `gh auth token`.

## Як запускати

Запуск з кореня `webitel-ui-sdk`. Спершу завжди `--dry-run`:

```sh
# подивитись, що буде відправлено (нічого не запускає)
bun sh/make-release-all-repos/make-release-all-repos.ts --version 26.10 --next 26.12 --dry-run

# реліз усіх аппок
bun sh/make-release-all-repos/make-release-all-repos.ts --version 26.10 --next 26.12

# лише вибрані репо
bun sh/make-release-all-repos/make-release-all-repos.ts --version 26.10 --next 26.12 --repos client,crm

# ui-sdk
bun sh/make-release-all-repos/make-release-all-repos.ts --version 26.10 --next 26.12 --repos webitel-ui-sdk
```

Замість `bun` можна `node`.

## Опції

| Опція | Що робить |
| --- | --- |
| `--version <x.y>` | версія релізу, напр. `26.10`. Обовʼязкова |
| `--next <x.y>` | наступна версія для `main`, напр. `26.12`. Потрібна для нових воркфлоу |
| `--repos <a,b>` | лише ці репо (через кому) |
| `--owner <name>` | власник репо на GitHub (дефолт `webitel`), напр. особистий акаунт для тесту |
| `--ref <branch>` | гілка, з якої запускати воркфлоу (дефолт — default branch репо) |
| `--dry-run` | лише показати план, нічого не запускати |
| `--no-watch` | запустити і вийти, не чекати ранів |
| `--yes` | без підтвердження `[y/N]` |

## Важливо

- Скрипт реально створює гілки й теги в репо. Перед боєм — `--dry-run`.
- Перевірити все на сухо можна на форках: `--owner <твій-акаунт>`.
- Переведення аппок на новий трейн `@webitel/*` бібліотек — окремий скрипт
  `scripts/bump-train.ts` у корені воркспейсу (локально, без git).

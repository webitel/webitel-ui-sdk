# Branching

## Git Flow

Спершу, читаємо про Git Flow methodology.

Далі, по бренчах:

![branching](./assets/Webitel%20branching_page-0001.jpg)

## Основні

- `master` - головна гілка, в яку мерджаться тільки готові фічі.
- `vYY.MM.XX` - гілки для релізів. (Наприклад, `v24.04.2`), де `24` - рік релізу,
  `04` - місяць релізу, а `2` - номер хотфікс патча.

## Додаткові

- `feat/` - гілки для фіч, наприклад, `feat/feature-name`.
- `fix/` - гілки для фіксів, наприклад, `fix/fix-name`.
- `hotfix/` - гілки для хотфіксів, які бренчуються **ВІД РЕЛІЗУ (НЕ ВІД МАСТЕРА)**.
  Наприклад, `hotfix/hotfix-name`.
- `refactor/` - гілки для рефакторингів, наприклад, `refactor/refactor-name`.
- `test/` - гілки для тестів, наприклад, `test/test-name`.

## `/WTEL/` префікси для бренчів

Для зручності відстеження задач у Jira,
до назви гілки додається ідентифікатор задачі у форматі WTEL-XXXX після префіксу типу (feat/, fix/ тощо).
Це дозволяє легко ідентифікувати звʼязок між гілкою та відповідною задачею.

> Приклади: 

- `feat/`     - feat/WTEL-7623/add-new-table-section

- `fix/`      - fix/WTEL-7610/fix-overlapping-modal

- `hotfix/`   - hotfix/WTEL-7655/fix-crash-on-save

- `refactor/` - refactor/WTEL-7630/optimize-table-component

- `test/`     - test/WTEL-7641/add-integration-tests


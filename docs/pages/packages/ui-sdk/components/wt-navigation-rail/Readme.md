<script setup>
import Specs from './component-specs.vue';
import ExampleNavigationRail from './examples/example-navigation-rail.vue';
</script>

# `wt-navigation-rail.vue`

Вертикальна навігаційна панель із кнопками зверху та знизу. Не містить логіки
навігації: при кліку емітить `select`, а аплікейшн вирішує, що робити.
Зазвичай використовується через [`wt-page`](../wt-page/Readme.md)
(prop `show-navigation-rail`).

## Specs

<Specs />

## Slots

- `top` / `middle` / `bottom`: замінюють типовий список `topItems` / `middleItems` / `bottomItems` власним вмістом.

## Item

`NavigationRailItem`: `{ id, icon, label?, disabled?, badge?: { value, severity? } }`.

- `badge` малює бейдж над кнопкою; `severity` за замовчуванням `success`
  (напр. `error` для пропущених дзвінків).
- Стани кнопки: default, hover, active (`activeItemId` = `id` активної кнопки).
- Градієнт фону залежить від теми (`:root.theme--dark`).

## CSS variables

Див. `src/components/wt-navigation-rail/_variables.css`.

## Example

::: raw
<ExampleNavigationRail />
:::

::: details Code
<<< ./examples/example-navigation-rail.vue
:::

<script setup>
import Specs from './component-specs.vue';
import ExampleNavigationRail from './examples/example-navigation-rail.vue';
</script>

# `wt-navigation-rail.vue`

Вертикальна навігаційна панель із кнопками зверху та знизу. Не містить логіки
навігації: при кліку емітить `select`, а аплікейшн вирішує, що робити.

Компонент не використовується напряму: його рендерить [`wt-page`](../wt-page/Readme.md)
з пропа `navigationRail` (`{ topItems, bottomItems, activeItemId }`), а подію
`select` він ретранслює як `navigation-select`. Панель відображається, лише якщо
хоча б один зі списків не порожній; якщо обидва порожні, нічого не рендериться.

```vue
<wt-page
  :navigation-rail="{ topItems: top, bottomItems: bottom, activeItemId: active }"
  @navigation-select="active = $event.id"
>
  <wt-layout>
    <wt-content-wrapper>...</wt-content-wrapper>
  </wt-layout>
</wt-page>
```

## Specs

<Specs />

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

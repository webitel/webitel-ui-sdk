<script setup>
import ExampleLayout from './examples/example-layout.vue';
</script>

# WtLayout

Структурний контейнер сторінки всередині Body [`wt-page`](../wt-page/Readme.md).
Визначає доступну область для контенту, містить один або декілька
[`wt-content-wrapper`](../wt-content-wrapper/Readme.md).

- **Width** — заповнює доступний простір; **Min Width** = 320px.
- **Default Width** — початкова ширина (`defaultWidth`); без неї Layout
  «гумовий».
- **Height** — заповнює контейнер.
- **Resizing** — користувач змінює ширину перетягуванням межі (або стрілками
  з фокусом на межі). Сусідній Layout з боку `resizeEdge` компенсує зміну:
  `Layout A + Layout B = Available Width`.
- **Visibility** — Layout може бути прихований лише сусіднім Layout (тобто
  його власником через `v-if` / `v-show`); сам себе не приховує. Простір
  автоматично перерозподіляється між видимими Layout.

## Props

| Prop           | Type                 | Default     | Description                                     |
| -------------- | -------------------- | ----------- | ----------------------------------------------- |
| `defaultWidth` | `number`             | `undefined` | Початкова ширина в px. Без неї — fluid          |
| `resizable`    | `boolean`            | `false`     | Дозволяє змінювати ширину перетягуванням межі   |
| `resizeEdge`   | `'start' \| 'end'`   | `'end'`     | Межа з ручкою; сусід з цього боку компенсує     |

## Events

| Event    | Payload         | Description                             |
| -------- | --------------- | --------------------------------------- |
| `resize` | `width: number` | Після завершення зміни ширини, в px     |

## CSS variables

| Variable                          | Light                     | Dark                      |
| --------------------------------- | ------------------------- | ------------------------- |
| `--wt-layout-background-color`    | `--p-surface-0`           | `--p-surface-800`         |
| `--wt-layout-border-radius`       | `--p-border-radius-lg`    | `--p-border-radius-lg`    |
| `--wt-layout-padding`             | `0`                       | `0`                       |
| `--wt-layout-gap`                 | `0`                       | `0`                       |
| `--wt-layout-min-width`           | `320px`                   | `320px`                   |

## Example Layout

::: raw
<ExampleLayout />
:::

::: details Code
<<< ./examples/example-layout.vue
:::

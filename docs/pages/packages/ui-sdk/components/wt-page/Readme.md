<script setup>
import ExamplePage from './examples/example-page.vue';
</script>

# WtPage

Верхній структурний рівень інтерфейсу: визначає компоновку сторінки та
об'єднує один або декілька [`wt-layout`](../wt-layout/Readme.md) в єдиний
робочий простір.

```
Page
├── Header
└── Body
    └── Layout
        └── Content Wrapper
            └── Content
```

- Займає 100% ширини та висоти контейнера.
- Body розподіляє доступну ширину між Layout; при зміні розміру вікна простір
  перерозподіляється, мінімальні обмеження Layout лишаються активними.
- Не містить безпосередньо контентних компонентів, бізнес-логіки чи
  візуального оформлення — лише Layout.

## Slots

| Slot      | Description                             |
| --------- | --------------------------------------- |
| `header`  | Шапка сторінки (напр. `wt-app-header`)  |
| `default` | Body: один або декілька `wt-layout`     |

## CSS variables

| Variable                          | Light                   | Dark                     |
| --------------------------------- | ----------------------- | ------------------------ |
| `--wt-page-background-color`      | `--p-surface-50`        | `--p-surface-850`        |
| `--wt-page-padding-x` / `-y`      | `0`                     | `0`                      |
| `--wt-page-gap`                   | `0`                     | `0`                      |
| `--wt-page-body-background-color` | `transparent`           | `transparent`            |
| `--wt-page-body-padding-x` / `-y` | `--spacing-sm`          | `--spacing-sm`           |
| `--wt-page-body-gap`              | `--spacing-sm`          | `--spacing-sm`           |

## Example Page

::: raw
<ExamplePage />
:::

::: details Code
<<< ./examples/example-page.vue
:::

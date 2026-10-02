<script setup>
import ExampleContentWrapper from './examples/example-content-wrapper.vue';
</script>

# WtContentWrapper

Базовий структурний контейнер всередині [`wt-layout`](../wt-layout/Readme.md)
для розміщення контенту: обмежує ширину, керує внутрішніми відступами та
вирівнюванням. Не містить бізнес-логіки та може включати будь-які
UI-компоненти або їх групи (секції, форми, таблиці, списки, картки...).

- **Width** — успадковує правила ширини від Layout.
- **Height** — Hug Content: росте відповідно до висоти вмісту.

## Props

| Prop    | Type                              | Default  | Description                     |
| ------- | --------------------------------- | -------- | ------------------------------- |
| `align` | `'left' \| 'center' \| 'stretch'` | `'left'` | Горизонтальне вирівнювання      |

## CSS variables

| Variable                                 | Light                  | Dark                   |
| ---------------------------------------- | ---------------------- | ---------------------- |
| `--wt-content-wrapper-background-color`  | `--p-surface-0`        | `--p-surface-800`      |
| `--wt-content-wrapper-border-radius`     | `--p-border-radius-lg` | `--p-border-radius-lg` |
| `--wt-content-wrapper-padding`           | `--spacing-sm`         | `--spacing-sm`         |
| `--wt-content-wrapper-gap`               | `--spacing-sm`         | `--spacing-sm`         |

## Example Content Wrapper

::: raw
<ExampleContentWrapper />
:::

::: details Code
<<< ./examples/example-content-wrapper.vue
:::

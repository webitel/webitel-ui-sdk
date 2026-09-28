# `@webitel/styleguide` Intro

## Usage cases, Overview

`@webitel/styleguide` – пакет, що містить спільні стилі, дизайн-токени та схеми компонентів
(PrimeVue), якими користуються всі аплікейшени Webitel.

Глобально, тут є:

* Базові стилі (`typography`, `scroll`, `fonts`, `viewport-breakpoints`) та стилі окремих
  аплікейшенів (`applications/*`).
* CSS-змінні дизайн-токенів, згенеровані з Figma – **не** входять до основного `.`
  експорту, кожен аплікейшен підключає свої окремим саб-шляхом (наразі лише
  `agent-workspace-app`) – детальніше:
  [Генерація дизайн-токенів з Figma](../usage/design-tokens/index.md).
* Схеми компонентів PrimeVue (`component-schemes`, `semantic`, `extend`, `primitive`).

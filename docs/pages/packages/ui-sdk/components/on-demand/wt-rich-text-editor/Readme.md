<script setup>
import Specs from './component-specs.vue';
import ExampleRichTextEditor from './examples/example-rich-text-editor.vue';
import ExamplePlainTextRichTextEditor from './examples/example-plain-text-rich-text-editor.vue';
import ExampleCustomToolbarRichTextEditor from './examples/example-custom-toolbar-rich-text-editor.vue';
</script>

# `wt-rich-text-editor.vue`

Редактор форматованого тексту на базі [TinyMCE](https://www.tiny.cloud/docs/tinymce/latest/) (self-hosted, без хмари Tiny). Використовується у формах процесингу, а надалі — для листів.

## Чому він `on-demand`

TinyMCE важкий, тому компонент зареєстровано через `defineAsyncComponent`: код редактора потрапляє в **окремий чанк**, який завантажується лише тоді, коли редактор уперше рендериться. Застосунок, який його не використовує, TinyMCE не завантажує. Поки чанк вантажиться, показується скелетон.

У lib-збірці `@webitel/ui-sdk` пакети `tinymce` і `@tinymce/tinymce-vue` винесено в `external`: їх резолвить і розбиває на чанки збірка застосунку.

```js
import { WtRichTextEditor } from '@webitel/ui-sdk/components';
```

## Особливості

- **Ліцензія.** Передається `license-key="gpl"` — TinyMCE 8 використовується під GPLv2+.
- **Тема.** Редагована область живе в `iframe`, тож CSS-змінні застосунку туди не доходять. Кольори (`--content-wrapper-color`, `--wt-text-field-text-color`) зчитуються зі сторінки і оновлюються, коли на `<html>` перемикається клас `theme--dark`.
- **Плагіни.** У комплекті: `advlist`, `emoticons`, `fullscreen`, `image`, `link`, `lists`, `table`. Інші плагіни, передані через `plugins`, застосунок має імпортувати сам (`import 'tinymce/plugins/…'`).
- **Мова.** Інтерфейс редактора — англійською: мовні пакети TinyMCE не підключено.

## Specs

<ClientOnly>
<Specs />
</ClientOnly>

## Example Rich Text Editor

::: raw
<ClientOnly>
<ExampleRichTextEditor />
</ClientOnly>
:::

::: details Code
<<< ./examples/example-rich-text-editor.vue
:::

## Example Plain Text

`output="text"` прибирає форматування і повертає звичайний текст.

::: raw
<ClientOnly>
<ExamplePlainTextRichTextEditor />
</ClientOnly>
:::

::: details Code
<<< ./examples/example-plain-text-rich-text-editor.vue
:::

## Example Custom Toolbar

Свій набір кнопок і плагінів, наприклад для листа.

::: raw
<ClientOnly>
<ExampleCustomToolbarRichTextEditor />
</ClientOnly>
:::

::: details Code
<<< ./examples/example-custom-toolbar-rich-text-editor.vue
:::

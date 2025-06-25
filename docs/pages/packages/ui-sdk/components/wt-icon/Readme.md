<script setup>
const colors = ['default', 'active', 'disabled', 'primary', 'error', 'success', 'warning', 'on-dark', 'on-light', 'on-primary', 'info', 'chat', 'transfer', 'job'];
</script>

# WtIcon

## Props

| Prop       | Type    | Default | Required | Code                                                | Options                                                                                                               |
| ---------- | ------- | ------- | -------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| icon       | String  |         | true     | `<wt-icon icon="close"></wt-icon>`                  |                                                                                                                       |
| size       | String  | md      |          | `<wt-icon icon="close" size="sm"></wt-icon>`        | sm, md, lg, xl                                                                                                        |
| color      | String  | default |          | `<wt-icon icon="close" color="success"></wt-icon>`  | default, active, disabled, primary, error, success, warning, on-dark, on-light, on-primary, info, chat, transfer, job |
| iconPrefix | String  | `''`    |          | `<wt-icon icon="close" icon-prefix="ws"></wt-icon>` |                                                                                                                       |
| disabled   | Boolean | false   |          | `<wt-icon icon="close" disabled></wt-icon>`         |                                                                                                                       |

### Different colors:

<div
  style="display: flex; align-items: center; gap: 5px;"
  v-for="color of colors"
  :key="color"
>
<wt-icon
  icon="edit"
  size="lg"
  :color="color"
></wt-icon>
{{ color }}
</div>

## [Available icons](../../assets/icons/icons.md)

## How does it work?

Icons are located in <code>assets/icons/sprite</code> directory, in <code>SVG</code> format,
without <code>width</code> and <code>height</code> attributes, but with <code>
[viewBox](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute/viewBox)
</code> attribute.
(<code>viewBox</code> is provided by designer in svg pic itself - so you just need to check it presence,
by the way check for `width` `height` absence).

For example:

![svg icon code example](./assets/svg-icon-code-example.png)

At build stage, <code><a href="https://www.npmjs.com/package/vite-plugin-svg-sprite">
vite-plugin-svg-sprite</a></code>
collects all icons (looking for "All files`.svg` in all directories, which names include `sprite`,
). This rule is described in <code>vite.config.js:</code>
(from "Quick Start" icons installation section):

<pre class="language-javascript"><code>
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
</code></pre>

So that, all these icons are collected in one sprite. This sprite is injected in <code>index.html</code>.

For example: (By the way, you can check it if you want to see, which icons were collected in this sprite):

![svg-sprite-in-dom](./assets/svg-sprite-in-dom.png)

Then, these icons can be used as:

<pre class="language-html"><code>
&lt;svg&gt;&lt;use xlink:href="#attach"&gt;&lt;/use&gt;&lt;/svg&gt;
// or, using wt-icon component:
&lt;wt-icon icon="attach"&gt;&lt;/wt-icon&gt;
</code></pre>

## How to install your custom icons to project?

`vite-plugin-svg-sprite` vite rule in <code>vite.config.js</code> also collects all icons from `sprite`
directories in project and adds it to final sprite.

_In fact, webitel-ui icons are added to sprite just cause they're imported from
"sprite" directory - just in <code>node_modules</code>_

For stylistic purposes, it's recommended to allocate icons in <code>src/(app?)/assets/icons/sprite/\*</code>,
So that developers and designer could find (and then check or update) them in any project.

All icons from this directory should be imported in <code>index.js</code> in this directory
(create `index.js` if it doesn't exist).

Then, `index.html` should be imported in `main.js`:

<pre class="language-javascript"><code>import './assets/icons/sprite';</code></pre>

And, then, if you put some new icons in this directory, and import them in `index.js`,
they automatically become available in project.

### Simple TODO:

- Create directory `src/(app?)/assets/icons/sprite/` (if doesn't exists)
- in this folder, create `index.js` (if doesn't exists)
- Import `index.js` to `>main.js` (if doesn't exists)
- Put icon to this directory, and import it to `index.js`
- That's all, you're awesome!

## Icon sprites naming convention:

App-specific icons are highly recommended to be named with the prefix corresponding to this application.

The reason is: when you see an icon usage, you will be able to distinguish `svg` location:
in this app, or library - and update it, if needed.
_For example, if you want to move this icon from app to library, you just need to remove `icon-prefix` prop
from all icon usages (and, of course, rename the icon file)_

### Icon prefix corresponding to application:

- **Webitel UI:** no prefix
- **Admin:** `adm-`
- **Workspace:** `ws-`
- **Supervisor:** `sv-`
- **History:** `hs-`
- **Webitel CC UI:** `cc-`

## How to clean up icons before adding them to project?

After export from Figma, icons should be cleaned up to avoid a few issues.

Use this checklist:

1. **Remove** `width` and `height` from svg-tag

![width and height should be removed](./assets/cleanup-svg-width-height.png)

2. **Check** `viewBox`: it's size should be square **(BUT DO NOT DELETE!)**

If there's an issue, contact the designer.

Incorrect:
![viewBox is incorrect](./assets/cleanup-svg-viewbox-incorrect.png)

Correct:
![viewBox is correct](./assets/cleanup-svg-viewbox-correct.png)

4. **Remove** `fill="none"` from svg-tag

![fill="none" should be removed](./assets/cleanup-svg-fill-none.png)

5. **Remove** all `fill=""` with default color

_Default "fill" should be cleaned up, cause Figma adds it to icon by default, but we are
changing this fill in styles to suit our needs.
But! Specific colors should stay in svg-code. (for instance, red dot in `record` icon)_

!["fill" should be removed](./assets/cleanup-svg-fill.png)

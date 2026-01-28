<script setup>
import IconsTable from './icons-table.vue';
</script>

# Icons

Це стаття про самі іконки, але не про компонент [`wt-icon.vue`](../../components/wt-icon/Readme.md).

**(fun) facts:**

1. Іконки – `.svg`
2. Іконки лежать у [`src/assets/icons/sprite`](https://github.com/webitel/webitel-ui-sdk/tree/main/src/assets/icons/sprite)...
3. ... і підключаються у [`index.ts`](https://github.com/webitel/webitel-ui-sdk/blob/main/src/assets/icons/sprite/index.ts) файлі...
3. ...хоча "в глибині" сам процес підключення є [складніший](#iconsrepository-how-icons-are-included).
3. Іконки використовуються **тільки** через [`wt-icon.vue`](../../components/wt-icon/Readme.md) компонент
4. Основні іконки підключаються глобально у `@webitel/ui-sdk`
5. [Project-level](#project-level-local-icons) іконки підключаються локально в кожному проєкті


## `iconsRepository`: how icons are included?

### Задача: 

підключити іконки до проєкту, щоб використовувати їх у `wt-icon.vue` компоненті.

### Умови:

1. Не "роздувати" один `wt-icon.vue` файл.
2. [Оптимальний](https://vite.dev/guide/performance#use-lesser-or-native-tooling:~:text=Don%27t%20transform%20SVGs%20into%20UI%20framework%20components%20(React%2C%20Vue%2C%20etc.).%20Import%20them%20as%20strings%20or%20URLs%20instead.) 
для бандлера спосіб підключення.
3. Можливість підключати додаткові іконки локально в кожному проєкті.
4. По можливості, обійтись без додаткових плагінів (раніше використовувася проблемний [`vite-plugin-svg-sprite`](https://www.npmjs.com/package/vite-plugin-svg-sprite), який як підхід мігрував з нами після аналогічної тулзи для Webpack)

### Рішення:

Окрема, спільна `Map`'а іконок, в яку можна додавати іконки, і з якої можна через геттер отримувати іконку.
Це, власне, і є [`iconsRepository.ts`](https://github.com/webitel/webitel-ui-sdk/blob/main/src/assets/icons/iconsRepository.ts).

### Нюанси:

За такого підходу, іконка [вставляється](https://github.com/webitel/webitel-ui-sdk/blob/main/src/components/wt-icon/wt-icon.vue#L8) у `wt-icon` через `v-html`, а отже репозиторій не можна експоузити
у `window`. На рівні додавання іконок до репозиторію, вони "чистяться" через `dompurify`, але, самі розумієте, справа така. 

### Проблеми:

> [!WARNING]
> Зважайте: ця **проблема є актуальною тільки для апплікейшенів, де є свої локальні іконки**, які треба підключати.
> **Якщо таких іконок немає, то це не проблемою**, бо **глобальні іконки підключаються в середині ліби**.

Через те що ця мапа імпортується у `wt-icon.vue`, який білдиться як ліба у дефолтному експорті `@webitel/ui-sdk`, то і 
репозиторій іконок також бандлиться разом з лібою.

В той час, як не збілджений компонент `wt-icon.vue` можна імпортнути напряму з `@webitel/ui-sdk/components`, і
він тягне raw файл `iconsRepository.ts`.

А отже, якщо ми використовуємо у проєкті `wt-icon.vue` одночасно глобально підключений `wt-icon`, і локально імпортнутий
`wt-icon`, то, фактично, ми маємо 2 окремо живущих версії репозиторія іконок. 
А отже, локальні іконки треба підключати двічі.

Наприклад:
1. Отак треба [імпортнути](https://github.com/webitel/webitel-flow-diagram/blob/main/src/assets/icons/sprite/index.ts#L1-L2) репозиторії іконок,
2. а отак – [зареєструвати](https://github.com/webitel/webitel-flow-diagram/blob/main/src/assets/icons/sprite/index.ts#L198-L201) локальні іконки.


## Project-level (local) icons

У деяких апплікейшенах є свої набори іконок, які підключаються саме в тих апплікейшенах. Бо, вони локальні, 
і задумка така щоб не тягти їх в основний бандл. Наприклад, це іконки нодів у `webitel-flow-diagram`, або
іконки розділів у `Admin`.

### Icons naming convention

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

After export from Figma, icons should be cleaned up to avoid sizing/color issues.

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


## Icons List

::: raw
<IconsTable />
:::

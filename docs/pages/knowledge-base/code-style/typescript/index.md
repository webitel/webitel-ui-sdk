# TypeScript: strict mode

> [!INFO]
> Правила зібрані з [PR #1597](https://github.com/webitel/webitel-ui-sdk/pull/1597),
> яким догорнули `strict: true`. Baseline і CI-джоби — [WTEL-9942](https://webitel.atlassian.net/browse/WTEL-9942).

> [!WARNING]
> `tsconfig.base.json` тепер має `strict: true` і `allowJs: true`, а всі пʼять
> `typecheck` джоб тримають **нуль помилок**. Будь-яка нова помилка — це регресія,
> а не «успадкований шум». Не додавай `@ts-ignore`, щоб її прибрати.

## TLDR;

* новий API-клієнт — **одразу типізований**, інакше він зламає `main`
* `TODO(types)` — це навмисно широкий тип, **не чини його «мимохідь»**
* мапа за enum — `Partial<Record<Enum, …>>`, **не** `Record<string, …>`
* union зі const-обʼєкта — **виводь**, не переписуй літерали руками
* `Id` на межі публічного API, коерція — **біля gen-клієнта**, і **не** коли id іде в body
* спершу шукай наявний composable (`useEventBus`), потім пиши свій `inject`
* після кодмоду — **читай дифф руками**, компілятор ловить не все

## Правила

### 1. Новий API-клієнт типізуємо одразу

Клієнт, написаний у гілці, що відгалужена до цього PR, потрапить у `main`
нетипізованим і зламає `typecheck`. Так уже сталося з `ChatDialogsAPI`.

Шаблон — як у решті клієнтів: параметри з `_shared/types`.

```ts
import type { ApiId, ApiParams, GetItemParams } from '../_shared/types';

const getSomethingList = async (params: ApiParams) => { /* … */ };
const getSomething = async ({ itemId: id }: GetItemParams) => { /* … */ };
```

### 2. `TODO(types)` — це контракт, не борг «на потім»

Кілька шарів навмисно широкі, бо вони динамічні наскрізь:
`Transformer`/`applyTransform`, `ApiParams`, `SelectOption`, `WtTreeNode`,
`WtTableRow`, `VuelidateFieldLike`, `FilterConfigSearchMethodParams[0]`.

Звузити будь-який із них — це окремий рефактор, а не правка друкарської помилки.
Якщо `any` тут муляє — заводь задачу, а не «швидку» правку.

### 3. Мапи за enum типізуємо через `Partial<Record<Enum, …>>`

`Record<string, …>` брехливо стверджує, що ключ є для **будь-якого** рядка.
Через це `appLogo[currentApp].dark` падав на `currentApp: 'meet'` —
у `WtApplication` девʼять значень, а лого є для семи.

```ts
// ❌ будь-який рядок вважається валідним ключем
const appLogo: Record<string, Logo> = { … };

// ✅ ключі — значення enum, і видно, що мапа неповна
const appLogo: Partial<Record<WtApplication, Logo>> = { … };
```

Далі `appLogo[currentApp]?.dark` — бо звернення справді може не влучити.
Пропси, якими індексуєш, теж вужчі: `type: String as PropType<WtApplication>`.

### 4. Union зі const-обʼєкта — виводимо

Літерали, скопійовані руками, розʼїжджаються з джерелом. TS читає їх навіть
через `Object.freeze`, тож:

```ts
// ❌ третя копія того самого union'а
type SortOrder = 'asc' | 'desc' | null;

// ✅ додали символ у SortSymbols — тип розширився сам
import type { SortSymbols } from '…/scripts/sortQueryAdapters';
export type WtTableSortOrder = (typeof SortSymbols)[keyof typeof SortSymbols];
```

Імпорт роби `import type` — у рантайм нічого не додається.

### 5. `keyof typeof` для const-enum — майже завжди помилка

`keyof typeof X` дає **ключі**, а нам потрібні **значення**. Через це
`MessageColor` був `'SECONDARY' | …` замість `'secondary' | …`, і дефолти пропсів
не сходились.

```ts
// ❌ 'SECONDARY' | 'SUCCESS' | …
export type MessageColor = keyof typeof MessageColor;

// ✅ 'secondary' | 'success' | …
export type MessageColor = (typeof MessageColor)[keyof typeof MessageColor];
```

### 6. Пропси на базі PrimeVue — прибирай нативні атрибути

Типи PrimeVue розширюють DOM-інтерфейси атрибутів (`InputHTMLAttributes` тощо).
`withDefaults(defineProps<…>())` поверх ~280 полів не інстанціюється —
`TS2590: union type that is too complex to represent`.

```ts
interface WtInputTextProps
	extends /* @vue-ignore */ Omit<InputTextProps, keyof InputHTMLAttributes> {
	/* … */
}
```

Атрибути все одно доїзжають через `$attrs`. Той самий `TS2590` ловиться на
`app.component(name, Components[name])` у `install.ts` — там допомагає `as Component`.

### 7. Id: широко на межі, коерція біля gen-клієнта

`ApiId = string | number`, бо викликач тримає id з роуту або числом. Але
згенерований клієнт вимагає конкретний тип — тож коерція живе саме там, де
відомо, який він:

```ts
const response = await service.readAgent(String(id));      // gen: string
const response = await service.readAuditForm(Number(id));  // gen: number
```

> [!WARNING]
> **Перевір, куди id потрапляє на дроті.** У URL — коерція безпечна, шаблон
> усе одно робить `${id}`. А якщо id іде в **JSON-body**, `String(5)` змінює
> `5` на `"5"` — це вже інший запит. Саме тому `deleteFiles` і `createTranscript`
> лишились із `string[]`/`string`.

Не всі `*Id` — сущності: `etag` — це opaque-тег, `repo` — назва довідника.
Обидва лишаються `string`.

### 8. Спершу шукай composable

`inject('$eventBus')` руками дублює `useEventBus()`, який уже віддає весь
контракт `EventBus` і володіє ключем інжекту. Своя копія типу лише розʼїдеться.

```ts
// ❌
const eventBus = inject<{ $emit: (e: string, p: unknown) => void }>('$eventBus');

// ✅
const eventBus = useEventBus();
```

Так само не описуй по-новому інстанси PrimeVue — є
`PrimevueInstance` / `PrimevueOverlayInstance` у `components/_internals/types`.

### 9. Vue-макроси не імпортуються з `vue`

`defineProps`, `defineModel`, `defineEmits`, `defineSlots`, `withDefaults` —
це компіляторні макроси. Імпорт дає `TS2440: Import declaration conflicts with
local declaration`.

### 10. Рекурсивний компонент — `defineSlots` явно

Компонент, що рендерить сам себе (`wt-tree-line`, `wt-tree-table-row`), не може
вивести тип слота зі свого ж використання — виходить циклічність (`TS7022`).
Оголошуй слоти явно.

### 11. Після кодмоду — читай дифф руками

Компілятор ловить не все. У цьому PR скрипт, що обгортав аргументи в `String()`,
дав два дефекти:

* `String(params).userId` замість `String(params.userId)` — **валідний TS**,
  у рантаймі поїхало б `"[object Object]"`
* `String(String)(statusId)` — подвійне обгортання, це вже `TS2349`

Перший клас помилок tsc не побачить ніколи. Мінімум: `grep` на `String(x).y`
і на вкладені обгортки, і перегляд усіх доданих рядків.

## Чого ще не зробили

* **`Math.random().toString(36)`** для id елементів — девʼять компонентів
  (`wt-checkbox`, `wt-switcher`, `wt-radio`, `wt-datepicker`, `wt-password`,
  `wt-input-text`, `wt-input-number`, обидва селекти). Просить composable
  `useComponentId(prefix)`, і заразом прибрало б розбіжність SSR/клієнт.
* **`ApiId` дублює `ApiModule.Id`** — свідомо. `api-services` лежить нижче
  `ui-sdk` у графі залежностей і не може імпортувати з нього. Розбіжність
  зловить tsc на стику, де ui-datalist передає `Id` у клієнт із `ApiId`.

## FAQ

### Чому `allowJs: true`, якщо ми йдемо в TS?

Без нього кожен `.js`-модуль, імпортований з TS, ставав неявним `any` —
близько 200 `TS7016`. З ним ті модулі **виводяться**, тобто типів більше, не менше.
`tsconfig.build.json` мав цей флаг і до нас.

### Мій PR червоний на `typecheck`, хоча локально зелений

Перевір, чи не розійшовся `main`: CI перевіряє **merge-коміт**. Якщо PR у стані
`CONFLICTING`, GitHub взагалі не створює `pull_request`-джоби — виглядає як
«CI не запустився», хоча насправді треба влити `main`.

### Можна `as any`, якщо тип дуже складний?

Ні. Варіанти за спаданням: справжній тип → вужчий, але правдивий тип →
`unknown` із narrowing на місці використання → навмисно широкий тип із
`TODO(types)`. `@ts-expect-error` з поясненням — лише коли інакше не виходить,
і згадай про це в описі PR.

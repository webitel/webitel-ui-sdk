# @webitel/ui-sdk

Main lib

## Build steps


1. `npm ci` - install dependencies
2. `npm version patch --git-tag-version false` - bump version
3. `npm run build` - build
4. `(npm run build:types || true)` - build types
5. `(npm run format:all || true)` - format code
6. `npm run publish-lib` - publish library

## Packages:

* [`@webitel/api-services`](./packages/api-services)
* [`@webitel/ui-datalist`](./packages/ui-datalist)

## Exports:

### main export: `@webitel/ui-sdk`

Global:
* Vue components registration,
* `eventBus` registration,
* locales registration,

### Single entry point exports:

> [!IMPORTANT]
> Recommended approach. Provides export types, IDE autocompletion.

`import {} from @webitel/ui-sdk/export;`

#### `@webitel/ui-sdk/store`

#### `@webitel/ui-sdk/enums`

#### `@webitel/ui-sdk/components`

#### `@webitel/ui-sdk/scripts`

#### `@webitel/ui-sdk/composables`

#### `@webitel/ui-sdk/validations`

### Path exports

> [!WARNING]
> DEPRECATION WARNING: don't use `/@webitel/ui-sdk/**src**/..` exports!

`import smth from '@webitel/ui-sdk/export/..';`

### `@webitel/ui-sdk/api/*`

Mirrors `@webitel/ui-sdk/src/api/*` structure.

### `@webitel/ui-sdk/locale/*`

Mirrors `@webitel/ui-sdk/src/locale/*` structure.

### `@webitel/ui-sdk/css/*`

Mirrors `@webitel/ui-sdk/src/css/*` structure.

### `@webitel/ui-sdk/directives/*`

Mirrors `@webitel/ui-sdk/src/directives/*` structure.

### `@webitel/ui-sdk/mixins/*`

Mirrors `@webitel/ui-sdk/src/mixins/*` structure.

### `@webitel/ui-sdk/plugins/*`

Mirrors `@webitel/ui-sdk/src/plugins/*` structure.

### `@webitel/ui-sdk/tests/*`

Mirrors `@webitel/ui-sdk/src/tests/*` structure.

### `@webitel/ui-sdk/dist/*`

Mirrors `@webitel/ui-sdk/dist/*` structure.

### Others

> [!WARNING]
> Other exports are deprecated, for backward compatibility only.
> Coz they don't export types.

# `AppConfig` Module

Reusable runtime app config module. Fetches a static config served next to
the app and deep-merges it over per-app defaults.

> [!IMPORTANT]
> Config shape is **per application**. Each app supplies its own config type
> `T` and its own `defaultConfig`. The module only provides the generic
> fetch/merge plumbing.

## TLDR Usage

```ts
// 1. Describe your app's config shape
// types/AppConfig.ts
export interface AppConfig {
  token: { iss: string; endpointUrl: string; appToken: string };
  lang: 'en' | 'uk' | 'ru';
  // ...whatever your app needs
}

// 2. Provide defaults (PartialDeep<AppConfig>)
// defaults/defaultConfig.ts
import type { PartialDeep } from '@webitel/ui-sdk/modules/AppConfig';
import type { AppConfig } from '../types/AppConfig';

export const defaultConfig: PartialDeep<AppConfig> = {
  lang: 'en',
};

// 3. Build the module
// config.ts
import { createAppConfig } from '@webitel/ui-sdk/modules/AppConfig';
import { defaultConfig } from './defaults/defaultConfig';
import type { AppConfig } from './types/AppConfig';

export const { getConfig, initializeConfig } =
  createAppConfig<AppConfig>(defaultConfig);
```

```ts
// usage
import { getConfig, initializeConfig } from './config';

// on app bootstrap — fetch + resolve once
const config = await initializeConfig();

// anywhere else — returns cached config, initializing on first access
const $config = await getConfig();
```

## How config is resolved

`createAppConfig` deep-merges the fetched runtime config **over** your
`defaultConfig`. The runtime config is loaded by `fetchConfig`, which looks for
files served next to the app, local file winning:

| Priority | File                                |
|----------|-------------------------------------|
| 1 (low)  | `config.json` / `config.jsonc`      |
| 2 (high) | `config.local.json` / `config.local.jsonc` |

`.jsonc` (JSON with comments) is supported via `tiny-jsonc`.

> [!NOTE]
> Arrays in config **overwrite** (source wins) rather than concatenate, so a
> fetched array fully replaces the default one.

## API

### `createAppConfig<T>(defaultConfig): AppConfigModule<T>`

Returns `{ getConfig, initializeConfig }`.

- `initializeConfig(): Promise<T>` — fetch + resolve, replacing the cached value.
- `getConfig(): Promise<T>` — return the cached config, calling
  `initializeConfig` on first access.

### `fetchConfig<T>(): Promise<Partial<T>>`

Low-level helper that just fetches and merges the static config files. Exposed
for apps that need the raw fetched config without the default-merge step.

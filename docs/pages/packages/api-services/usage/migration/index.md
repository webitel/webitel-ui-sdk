# `@webitel/ui-sdk/src/api` ➡️ `@webitel/api-services`

Differences and Migration

>[!IMPORTANT]
> **TLDR;** `@webitel/ui-sdk/src/api` is deprecated, use `@webitel/api-services`.

>[!CAUTION]
> Use relative paths inside `@webitel/api-services`, бо наєбнеться.

## General

### `.js` -> `.ts`

### Merge with default object

Більше такого не робимо. 
Тепер це розрулюватиметься на рівні стора карточки. На крайній, юзаємо Zod-схему

```ts
import {createSourceBody} from "@webitel/api-services/gen";
import {getDefaultsFromZodSchema} from '@webitel/api-services/gen/utils';

const defaultObject = { // [!code --]
    name: '', // [!code --]
    enabled: false, // [!code --]
}; // [!code --]

const defaultObject = getDefaultsFromZodSchema(createSourceBody); // [!code ++]
```

## API Clients
Usage is same, but the import path has changed.

### Imports

```ts
// crm: the-contacts.vue

import ContactAPI from '@webitel/ui-sdk/src/api/clients/crm/ContactAPI'; // [!code --]

import { ContactAPI } from '@webitel/api-services/api'; // [!code ++]
```

## Transformers

### Imports

```ts
// @webitel/api-services/api/clients: SomeServiceAPI.ts

import applyTransform, { // [!code --]
    sanitize, // [!code --]
} from '@webitel/ui-sdk/src/api/transformers'; // [!code --]

import { applyTransform, sanitize } from '@webitel/api-services/api/transformers'; // [!code ++]
```

>[!CAUTION]
> `applyTransform` becomes a named export, not a default one.

### sanitize.transformer

Use generated Zod objects and `getShallowFieldsToSendFromZodSchema` to dynamically get `fieldsToSend`

```ts
import { createSourceBody } from '@webitel/api-services/gen'; // [!code highlight]
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils'; // [!code highlight]

const fieldsToSend = ['id', 'name']; // [!code --]

const fieldsToSend = getShallowFieldsToSendFromZodSchema(createSourceBody); // [!code ++]

// ... sanitize(fieldsToSend);
```

### merge.transformer

See ["Merge with default object" Section](#merge-with-default-object)

## Defaults

>[!NOTE]
> Наразі використовуємо наші старі дефолти. Треба додумати, як їх замінити на генеровані з Zod-схем.

### Imports

```ts
// crm

import { getDefaultGetListResponse, getDefaultGetParams } from '@webitel/ui-sdk/src/api/defaults'; // [!code --]

import { getDefaultGetListResponse, getDefaultGetParams } from '@webitel/api-services/api/defaults'; // [!code ++]
```

## Next

Тут описую своє бачення, на чому закінчую роботу, і куди хотілося б розвивати це далі.

* Коли вичистимо імпорти з `ui-sdk/src/api`,
треба буде там все зачистити і лишити тільки websocket.


* Також, хотілося б замінити хардкод дефолти та конвертацію кейсів на Zod-схеми.
Але то треба сидіти ще, думати. Не певен щодо цього.

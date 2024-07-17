# Request Transformers

Transformers are pure functions which receive data and return transformed data.

## applyTransform

Apply transform functions to passed data.

```js
import applyTransform from '@webitel/ui-sdk/src/api/transformers';

const result = applyTransform(data, [
  () => {},
  // ...
]);
```

## camelToSnake

Convert camelCase to snake_case.

```js
import { camelToSnake } from '@webitel/ui-sdk/src/api/transformers';

// => camel_case
camelToSnake('camelCase');
```

## snakeToCamel

Convert snake_case to camelCase.

```js
import { snakeToCamel } from '@webitel/ui-sdk/src/api/transformers';

// => snakeCase
snakeToCamel('snake_case');
```

## generateUrl

Generate URL from passed params.

```js
import { generateUrl } from '@webitel/ui-sdk/src/api/transformers';

const base = '/base';

// => /base?q1=v1&q2=v2
generateUrl(base)({ q1: 'v1', q2: 'v2' });
```

## log

Log passed data.

```js
import { log } from '@webitel/ui-sdk/src/api/transformers';

// => console.log('message'), returns 'message'
log('message');
```

## merge

Merge passed data.

```js
import { merge } from '@webitel/ui-sdk/src/api/transformers';

const base = {
  value: 'value',
};

const data = {
  value2: 'value2',
};

// => { value: 'value', value2: 'value2' }
merge(base)(data);
```

## mergeEach

Merge each item of passed data.

```js
import { mergeEach } from '@webitel/ui-sdk/src/api/transformers';

const base = {
  value: 'value',
};

const data = [
  {
    value2: 'value2',
  },
  {
    value3: 'value3',
  },
];

// => [{ value: 'value', value2: 'value2' }, { value: 'value', value3: 'value3' }]
mergeEach(base)(data);
```

## notify

emits event to eventBus from @webitel/ui-sdk with passed data.

- If passed data is an **Error**, emits event with type 'error' and text from Error;
- If passed data is a **Function**, calls it with callback which emits event with received data.

```js
import { notify } from '@webitel/ui-sdk/src/api/transformers';

// case 1

const notificationCallback = ({
                                // callback which actually emits event with received
                                callback, 
                              }) => {
  callback({ type: 'success', text: 'custom message' });
};

// => emits event; returns data;
notify(notificationCallback)(data);

// case 2

// => emits event; returns new Error('error message');
notify(new Error('error message'));
```

## sanitize

Sanitize passed data.

```js
import { sanitize } from '@webitel/ui-sdk/src/api/transformers';


const fieldsToSend = ['field1', 'field2'];

// => { field1: 'value1', field2: 'value2' }
sanitize(fieldsToSend)({ field1: 'value1', field2: 'value2', field3: 'value3' });
```

## starToSearch

Add `*` to property from passed object, if not exists.

```js
import { starToSearch } from '@webitel/ui-sdk/src/api/transformers';

// => { search: 'string*' }
starToSearch('search')({ search: 'string' });

// => { search: 'string*' }
starToSearch('search')({ search: 'string*' });
```

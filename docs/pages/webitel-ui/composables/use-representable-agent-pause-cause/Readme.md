# `UseRepresentableAgentPauseCause`

Сomposable accepts an input array of causes and converts the data into the required format for display.

## Input params

| Params      | Description |
|-------------|-------------|
| pauseCauses | array       |

## Return

| Params                  | Description                                                                                                           |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------|
| representablePauseCause | Computed property that contains additionally calculated properties `duration`, `progressColor`, `isOverflow`, `limit` |

## Використання

```js
import {
  useRepresentableAgentPauseCause
} from '@webitel/ui-sdk/src/composables/useRepresentableAgentPauseCause/useRepresentableAgentPauseCause';

const pauseCauses = ref([
  {
    id: 30,
    name: 'Технічна перерва',
    limit_min: 60
  },
  {
    id: 69,
    name: 'Навчання',
    limit_min: 120
  },
  {
    id: 37,
    name: 'Обід',
    limit_min: 23
  },
])

const { representablePauseCause } = useRepresentableAgentPauseCause(pauseCauses);
```

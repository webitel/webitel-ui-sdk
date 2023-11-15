```vue
<template>
  <div>
    <wt-input
      :value="this.value"
      label="Input"
      name="label-input"
      @input="this.handler"
    ></wt-input>

    value: {{ this.value }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');

const handler = (e) => {
  value.value = e;
};
</script>
```

```vue
<template>
  <wt-input
    :value="this.value"
    disabled
    has-show-password
    label="Disabled"
    name="disabled-input"
    type="password"
    @input="this.handler"
  ></wt-input>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('disabled value');

const handler = (e) => {
  value.value = e;
};
</script>
```

```vue
<wt-input
  v-model="value"
  :v="vValid"
  has-show-password
  label="Password"
  name="password-input"
  type="password"
></wt-input>
```

```vue
<wt-input
  v-model="value"
  :v="vInvalid"
  label="Invalid input"
  name="invalid-input"
></wt-input>
```

```vue

<template>
  <wt-input
    :value="this.value"
    label="After input slot usage"
    @input="this.handler"
  >
    <template v-slot:after-input>
      <wt-icon-btn icon="edit"></wt-icon-btn>
      <wt-icon-btn icon="edit" size="sm"></wt-icon-btn>
      <wt-icon-btn icon="edit"></wt-icon-btn>
      <wt-icon-btn icon="edit" size="sm"></wt-icon-btn>
    </template>
  </wt-input>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('loooooooooooooooooooooooooooooooooooooooooong value');

const handler = (e) => {
  value.value = e;
};
</script>
```

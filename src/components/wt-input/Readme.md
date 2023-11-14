```vue
<div>
value: {{ this.value }}
</div>

<wt-input
  :model-value="this.value"
  label="Input"
  name="label-input"
  @update:modelValue="this.value = $event"
></wt-input>
```

```vue

<wt-input
  v-model="value"
  disabled
  has-show-password
  label="Disabled"
  name="disabled-input"
  type="password"
></wt-input>
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
<wt-input
  v-model="value"
  label="After input slot usage"
>
<template v-slot:after-input>
  <wt-icon-btn icon="edit"></wt-icon-btn>
  <wt-icon-btn icon="edit" size="sm"></wt-icon-btn>
  <wt-icon-btn icon="edit"></wt-icon-btn>
  <wt-icon-btn icon="edit" size="sm"></wt-icon-btn>
</template>
</wt-input>
```

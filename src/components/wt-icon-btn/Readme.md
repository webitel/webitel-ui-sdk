### Note: all wt=icon props are passed as "$attrs"

```vue
const callAlert = () => window.alert('wt-icon-btn clicked');

<wt-icon-btn
  icon="edit"
  @click="this.callAlert"
></wt-icon-btn>
```

### Note: all buttons props are passed as "$attrs"

Different colors

```vue
const options = [{ text: 'lorem ipsum' }, { text: 'dolor sit amet' }, { text: 'consectetur adipiscing elit' }];

  <div style="display: flex; gap: var(--spacing-xs);">
    <wt-button-select :options="this.options">Primary</wt-button-select>
    <wt-button-select color="secondary" :options="this.options">Secondary</wt-button-select>
    <wt-button-select disabled :options="this.options">Disabled</wt-button-select>
  </div>
``` 

<script setup>
import ExampleTable from './examples/example-table.vue';
import ExampleTableWithVerticalScroll from './examples/example-table-with-virtual-scroll.vue';
import Specs from './component-specs.vue';
</script>

# WtTable

## Specs

<Specs />

## Example Table

::: raw
<ExampleTable/>
:::

::: details Code
<<< ./examples/example-table.vue
:::

## Table with Vertical Scroll

This example demonstrates how to use `wt-table` with virtual scrolling for large datasets. The table automatically loads more data as you scroll down.

::: raw
<ExampleTableWithVerticalScroll />
:::

::: details Code
<<< ./examples/example-table-with-virtual-scroll.vue
:::

### Key Features of this Example:

- **Lazy Loading**: Data is loaded in chunks of 20 items as you scroll
- **Virtual Scrolling**: Only visible rows are rendered for better performance
- **Dynamic Row Classes**: Different rows have different styling based on their data
- **Sorting**: Click column headers to sort data
- **Actions**: Each row has action buttons (edit/delete)
- **Fixed Height**: Table has a fixed height with internal scrolling
- **Loading States**: Shows loading indicator during data fetch

### How it Works:

1. **Initial Load**: Starts with 4 items
2. **Scroll Detection**: When you scroll near the bottom, `onLoading` is triggered
3. **Data Fetch**: Simulates API call with 500ms delay
4. **Append Data**: Adds 20 new items to the existing data
5. **Stop Condition**: Stops loading after 50 items total

### Virtual Scrolling Usage:

```vue
<template>
  <wt-table
    :headers="headers"
    :data="data"
    :lazy="true"
    :loading="loading"
    :on-loading="handleLazyLoad"
    scrollable
    scroll-height="150px"
    sortable
    grid-actions
    fixed-actions
    resizable-columns
    :row-class="getRowClass"
    @sort="handleSort"
  />
</template>

<script setup>
import { ref } from 'vue';

const data = ref([]);
const loading = ref(false);
const lazy = ref(true);

const handleLazyLoad = () => {
  if (loading.value) return;
  
  loading.value = true;
  
  // Simulate API call
  setTimeout(() => {
    // Add new data
    for (let i = 0; i < 20; i++) {
      data.value.push({
        id: `id${index.value}`,
        name: 'New Item',
        // ... other properties
      });
    }
    
    loading.value = false;
  }, 500);
};
</script>
```

<script setup>
import Docs from './wt-intersection-observer-docs.vue';
import ExampleBasicInfiniteScroll from './examples/example-basic-infinite-scroll.vue';
import Specs from './component-specs.vue';
</script>

# WtIntersectionObserver

A Vue component that uses the Intersection Observer API to detect when an element comes into view. Perfect for implementing infinite scrolling, lazy loading, and other scroll-based interactions.

## Specs

<Specs />

## Documentation

::: raw
<Docs />
:::

## Basic Infinite Scroll

::: raw
<ExampleBasicInfiniteScroll />
:::

::: details Code
<<< ./examples/example-basic-infinite-scroll.vue
:::

## Usage Examples

### Basic Usage

```vue
<template>
  <div style="height: 400px; overflow-y: auto;">
    <div v-for="item in items" :key="item.id">
      {{ item.content }}
    </div>
    
    <wt-intersection-observer
      :can-load-more="canLoadMore"
      :loading="loading"
      @next="loadMore"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([]);
const loading = ref(false);
const canLoadMore = ref(true);

const loadMore = () => {
  if (loading.value || !canLoadMore.value) return;
  
  loading.value = true;
  // Your API call here
  setTimeout(() => {
    // Add new items
    loading.value = false;
  }, 1000);
};
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `canLoadMore` | Boolean | `true` | Controls whether the observer should trigger the next event |
| `loading` | Boolean | `false` | Shows a loading indicator when true |
| `root` | Element \| null | `null` | The scrollable container element. When null, uses the viewport |

## Events

| Event | Description |
|-------|-------------|
| `next` | Emitted when the observer element comes into view and canLoadMore is true |

## Best Practices

1. **Always check loading state**: Prevent multiple simultaneous API calls by checking the loading state before making requests.

2. **Use canLoadMore flag**: Set this to false when no more data is available to prevent unnecessary API calls.

3. **Provide visual feedback**: Use the loading prop to show users that data is being fetched.

4. **Handle errors gracefully**: Implement proper error handling in your load functions.

5. **Clean up on unmount**: The component automatically cleans up the intersection observer on unmount.

## Common Use Cases

- **Infinite scrolling lists**: Load more items as user scrolls down
- **Lazy loading images**: Load images only when they come into view
- **Pagination**: Load next page of data automatically
- **Analytics tracking**: Track when elements become visible
- **Table data loading**: Load more rows in large tables

## Browser Support

The component uses the Intersection Observer API, which is supported in all modern browsers. For older browsers, consider using a polyfill.
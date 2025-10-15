<script setup>
import ExampleBasicInfiniteScroll from './examples/example-basic-infinite-scroll.vue';
import Specs from './component-specs.vue';
</script>

# WtIntersectionObserver

A Vue component that uses the Intersection Observer API to detect when an element comes into view. Perfect for implementing infinite scrolling, lazy loading, and other scroll-based interactions.

## Specs

<Specs />

## Documentation


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

## Usage Notes

- **`canLoadMore` prop**: Controls whether the observer should trigger the `next` event for data loading. Set to `false` when you know there's no more data to load (e.g., reached the end of pagination, API returned empty response). This prevents unnecessary API calls and improves performance.
- Use `loading` prop to show a loader at the bottom of the list during data fetching
- **`next` event**: Triggered when the observer element comes into view and `canLoadMore` is `true`. The event doesn't pass any parameters - use it to trigger your data loading logic
- The component automatically cleans up the intersection observer on unmount
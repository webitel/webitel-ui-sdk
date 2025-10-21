<script setup>
import { ref, onMounted } from 'vue';

const items = ref([]);
const loading = ref(false);
const canLoadMore = ref(true);
const page = ref(1);

// Simulate API call
const loadMoreItems = async () => {
  if (loading.value || !canLoadMore.value) return;
  
  loading.value = true;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate new items
  const newItems = Array.from({ length: 10 }, (_, i) => ({
    id: (page.value - 1) * 10 + i + 1,
    title: `Item ${(page.value - 1) * 10 + i + 1}`,
    description: `This is item number ${(page.value - 1) * 10 + i + 1}`,
  }));
  
  items.value.push(...newItems);
  page.value++;
  
  // Simulate end of data after 5 pages
  if (page.value > 5) {
    canLoadMore.value = false;
  }
  
  loading.value = false;
};

const handleNext = () => {
  console.log('Loading more items...');
  loadMoreItems();
};

// Load initial data
onMounted(() => {
  loadMoreItems();
});
</script>

<template>
  <div>
    <h3>Basic Infinite Scroll</h3>
    <p>Scroll down to load more items automatically</p>
    
    <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd; padding: 16px;">
      <div
        v-for="item in items"
        :key="item.id"
        style="padding: 12px; border-bottom: 1px solid #eee;"
      >
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
      </div>
      
      <wt-intersection-observer
        :can-load-more="canLoadMore"
        :loading="loading"
        @next="handleNext"
      />
    </div>
    
    <div v-if="!canLoadMore" style="text-align: center; padding: 16px; color: #666;">
      No more items to load
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<template>
  <div style="display: flex; gap: var(--spacing-sm); flex-wrap: nowrap">
    <wt-table
      :data="sizes.map((size) => ({ size, empty: true }))"
      :headers="[
        { value: 'size', width: '40px' },
        { value: 'empty', width: 'auto' },
      ]"
      :selectable="false"
    >
      <template #empty="{ item }">
        <wt-empty
          :size="item.size"
          headline="Component is fully built using props"
          :image="img"
          primary-action-text="primary"
          secondary-action-text="secondary"
          text="There is no data to display"
          title="No data"
        />
      </template>
    </wt-table>
  </div>
</template>

<script setup>
import img from './assets/img.png';

const sizes = ['sm', 'md', 'lg'];
</script>


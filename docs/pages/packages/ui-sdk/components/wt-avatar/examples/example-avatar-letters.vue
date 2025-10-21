<script setup>
const sizes = [{ size: '2xs', letter: 'A B' }, { size: 'xs', letter: 'C D' }, { size: 'sm', letter: 'E F' }, { size: 'md', letter: 'G H' }, { size: 'lg', letter: 'I J' }, { size: 'xl', letter: 'K L' }, { size: '2xl', letter: 'M N' }, { size: '3xl', letter: 'O P' }];
</script>

<template>
  <div style="display: flex; gap: 8px">
    <wt-avatar
      v-for="item in sizes"
      :key="item.size"
      :size="item.size"
      :username="item.letter"
    />
  </div>
</template>

<style scoped lang="scss"></style>

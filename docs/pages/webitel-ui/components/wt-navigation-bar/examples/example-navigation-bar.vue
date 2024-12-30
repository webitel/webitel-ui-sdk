<script setup>
const currentApp = 'history';

const nav = [
  { value: '1', name: 'Name 1', route: '/1' },
  {
    value: 'exp1',
    name: 'Expansion 1',
    subNav: [
      { value: '2', name: 'Name 2', route: '/2' },
      { value: '3', name: 'Name 3', route: '/3' },
    ],
  },
  {
    value: 'exp2',
    name: 'Expansion 2',
    subNav: [
      { value: '4', name: 'Name 4', route: '/4' },
      { value: '5', name: 'Name 5', route: '/5' },
    ],
  },
];
</script>

<template>
  <wt-navigation-bar
    :current-app="currentApp"
    :nav="nav"
  />
</template>

<style scoped lang="scss">
.wt-navigation-bar :deep(.wt-navigation-bar__nav) {
  z-index: 1001; // overlap vitepress sidebar
}
</style>

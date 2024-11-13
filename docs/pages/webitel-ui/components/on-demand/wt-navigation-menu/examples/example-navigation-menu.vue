<template>
  <wt-navigation-menu :icons="['lookups']" :nav="navItems" />
</template>

<script setup>

const navItems = [
  {
    value: 'lookups',
    name: 'lookups',
    subNav: [
      {
        value: 'sources',
        name: 'sources',
        route: 'lookups/sources',
      },
      {
        value: 'slas',
        name: 'slas',
        route: 'lookups/slas',
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
</style>

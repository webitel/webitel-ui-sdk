<template>
  <main class="docs">
    <header>
      <h1>Webitel UI SDK v. 0.1.x</h1>
    </header>
    <wt-tabs v-model="currentTab" :tabs="tabs"></wt-tabs>
    <component :is="currentTab.value"></component>
  </main>
</template>

<script>
  import QuickStart from './pages/quick-start/quick-start.vue';
  import Typography from './pages/typography/typography.vue';
  import Colors from './pages/colors/colors.vue';
  import Badge from './pages/atoms/badge/badge.vue';
  import Btn from './pages/atoms/button/button.vue';

  export default {
    name: 'the-docs',
    components: {
      QuickStart,
      Typography,
      Colors,
      Badge,
      Btn, // Button name conflicts with default <button> tag
    },
    data: () => ({
      currentTab: {
        text: 'Quick Start',
        value: 'quick-start',
      },
      tabs: [
        {
          text: 'Quick Start',
          value: 'quick-start',

        },
        {
          text: 'Typography',
          value: 'typography',
        },
        {
          text: 'Colors',
          value: 'colors',
        },
        {
          text: 'Badge',
          value: 'badge',
        },
        {
          text: 'Button',
          value: 'btn',
        },
      ],
    }),
  };
</script>

<style lang="scss" scoped>
  .docs {
    padding: 30px;
  }

</style>

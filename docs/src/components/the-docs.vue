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
  import Buttons from './pages/buttons/buttons.vue';

  export default {
    name: 'the-docs',
    components: {
      QuickStart,
      Typography,
      Colors,
      Buttons,
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
          text: 'Buttons',
          value: 'buttons',
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

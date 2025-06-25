<template>
  <component-slots :slots="slots" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtHeadlineDocs',
  data: () => ({
    slots: [
      {
        name: 'default',
        description: 'headline direct child',
      },
      {
        name: 'title-wrapper',
        description:
          'headline direct child slot, but with search and actions slots available',
      },
      {
        name: 'title',
        description: 'Title slot',
      },
      {
        name: 'search',
        description: 'Search slot',
      },
      {
        name: 'actions',
        description: 'Action buttons slot',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>

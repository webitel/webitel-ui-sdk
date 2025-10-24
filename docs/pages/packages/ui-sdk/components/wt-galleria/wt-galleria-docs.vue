<template>
  <component-model
    :event="['update:visible', 'update:activeIndex']"
    :prop="['visible', 'activeIndex']"
  />
  <component-props :properties="properties" />
  <component-events :events="events" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtGalleriaDocs',
  data: () => ({
    properties: [
      {
        value: 'value',
        code: '<wt-galleria :value="images"></wt-galleria>',
        type: 'Array<WtGalleriaItem>',
        default: '[]',
        description:
          'Array of image objects. Each object should have: src (string), thumbnailSrc (string), title (string), description (string, optional)',
      },
      {
        value: 'visible',
        code: '<wt-galleria v-model:visible="isVisible"></wt-galleria>',
        type: 'Boolean',
        default: 'false',
        description:
          '[V-MODEL] Controls the visibility of the gallery modal. Use v-model:visible for two-way binding',
      },
      {
        value: 'activeIndex',
        code: '<wt-galleria v-model:active-index="currentIndex"></wt-galleria>',
        type: 'Number',
        default: '0',
        description:
          '[V-MODEL] Index of the currently displayed image. Use v-model:active-index for two-way binding',
      },
    ],
    events: [
      {
        value: 'download',
        params: [
          {
            name: 'activeIndex',
            type: 'Number',
            description: 'Index of the image to download',
          },
        ],
        description: 'Emitted when the download button is clicked',
      },
      {
        value: 'delete',
        params: [
          {
            name: 'activeIndex',
            type: 'Number',
            description: 'Index of the image to delete',
          },
        ],
        description:
          'Emitted when the delete button is clicked and confirmed via the confirmation popup',
      },
      {
        value: 'update:visible',
        params: [
          {
            name: 'visible',
            type: 'Boolean',
            description: 'New visibility state',
          },
        ],
        description: 'Emitted when gallery visibility changes',
      },
      {
        value: 'update:activeIndex',
        params: [
          {
            name: 'activeIndex',
            type: 'Number',
            description: 'New active image index',
          },
        ],
        description: 'Emitted when active image changes',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>

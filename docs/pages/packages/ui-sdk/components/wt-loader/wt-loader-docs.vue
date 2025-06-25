<template>
  <component-props :properties="properties" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtLoaderDocs',
  data: () => ({
    properties: [
      {
        value: 'size',
        type: 'String',
        default: 'md',
        options: ['sm', 'md'],
      },
      {
        value: 'color',
        type: 'String',
        default: 'contrast',
        options: ['main', 'contrast', 'icon'],
        description: 'Works only for sm loader',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>

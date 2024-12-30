<template>
  <component-props :properties="properties" />
  <component-slots :slots="slots" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtPageWrapperDocs',
  data: () => ({
    properties: [
      {
        value: 'actionsPanel',
        code: '<wt-page-wrapper :actions-panel="false"></wt-page-wrapper>',
        type: 'Boolean',
        default: 'true',
        description: 'Controls actions panel visibility',
      },
    ],
    slots: [
      {
        name: 'header',
        description:
          'Header (WT-HEADLINE component is highly recommended) slot',
      },
      {
        name: 'actions-panel',
        description: 'Actions or filters slot',
      },
      {
        name: 'main',
        description: 'Main content slot',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <component-props :properties="properties" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtNavigationBarDocs',
  data: () => ({
    properties: [
      {
        value: 'currentApp',
        code: '<wt-navigation-bar current-app="admin"></wt-navigation-bar>',
        type: 'String',
        description: 'Currently opened app',
      },
      {
        value: 'nav',
        code: '<wt-navigation-bar :nav="nav"></wt-navigation-bar>',
        type: 'Array',
        default: '[]',
        description: `Should receive array of nav objects. All objects should have following properties:
        "value" -- main inner logic property, should be unique. "name" -- display name. If none,
         displays "value" property. "route" -- relative path, used for :to attr ib router-link component.
          "subNav": array of objects, with properties, described above.
          If expansion has route, and subNav has route, subNav route computes like nav.route + / + subnav.route`,
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>

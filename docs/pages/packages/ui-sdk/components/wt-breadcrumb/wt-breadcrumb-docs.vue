<template>
  <section>
    <component-props :properties="properties" />
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtBreadcrumbDocs',
  data: () => ({
    properties: [
      {
        name: 'path',
        required: 'true',
        description: `
            // PATH EXAMPLE
            // default: () => [
            //   { name: 'directory' },
            //   { name: 'users', route: '/directory/users' },
            //   { name: 'adm', route: '/directory/users/3' },
            // ],
          `,
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>

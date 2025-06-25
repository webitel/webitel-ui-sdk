<template>
  <div>
    <section>
      <h2>App Header</h2>
      <component-slots :slots="headerSlots" />
    </section>
    <section>
      <h2>App Navigator</h2>
      <component-props :properties="appNavigatorProps" />
    </section>
    <section>
      <h2>Header Actions</h2>
      <component-props :properties="headerActionsProps" />
      <component-events :events="headerActionsEvents" />
    </section>
  </div>
</template>

<script>
import Prism from 'prismjs';

import WebitelApplications from '../../../../../src/enums/WebitelApplications/WebitelApplications.enum';

export default {
  name: 'WtAppHeaderDocs',
  data: () => ({
    headerSlots: [
      {
        name: 'default',
        description: 'Default slot',
      },
    ],
    appNavigatorProps: [
      {
        value: 'currentApp',
        code: '<wt-app-navigator current-app="admin"></wt-app-navigator>',
        type: 'String',
        description: 'Currently opened app',
      },
      {
        value: 'apps',
        code: '<wt-app-navigator :apps="[{name: WebitelApplications.ADMIN, href: `dev.webitel.com/admin`}]"></wt-app-navigator>',
        type: 'Array',
        default: '[]',
        description: 'Available apps with its links',
      },
    ],
    headerActionsProps: [
      {
        value: 'user',
        code: '<wt-user-actions :user="userInfo"></wt-user-actions>',
        type: 'Object',
        description: `User info object. Should have preferredUsername or account and name or username fields for representation.
          In most cases, this is the data returned from /userinfo api.1`,
      },
      {
        value: 'buildInfo',
        code: "<wt-user-actions :build-info=\"{ release: 'xx.xx', build: 'yy-yy' }\"></wt-user-actions>",
        type: 'Object',
        description: `Build info object. Should have "release" and "build"
         string fields for representation.`,
      },
    ],
    headerActionsEvents: [
      {
        value: 'settings',
        description: 'Fires when settings button is clicked',
      },
      {
        value: 'logout',
        description: 'Fires when logout button is clicked',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <section>
      <h2>App Header</h2>
      <article>
        <div class="example-wrapper">
          <wt-app-header></wt-app-header>
          <pre><code class="language-html">&lt;wt-app-header&gt;&lt;/wt-app-header&gt;</code></pre>
        </div>
      </article>
      <component-slots
        :slots="headerSlots"
      ></component-slots>
    </section>
    <section>
      <h2>App Navigator</h2>
      <article>
        <div class="example-wrapper">
          <wt-app-header>
            <wt-app-navigator current-app="admin" :apps="apps"></wt-app-navigator>
          </wt-app-header>
          <pre><code
            class="language-html">
        &lt;wt-app-header&gt;
            &lt;wt-app-navigator current-app="admin" :apps="apps"&gt;&lt;/wt-app-navigator&gt;
        &lt;/wt-app-header&gt;
        </code></pre>
        </div>
      </article>
      <component-props
        :properties="appNavigatorProps"
      ></component-props>
    </section>
    <section>
      <h2>Header Actions</h2>
      <article>
        <div class="example-wrapper">
          <wt-app-header>
            <wt-header-actions :user="user" :build-info="buildInfo"></wt-header-actions>
          </wt-app-header>
          <pre><code
            class="language-html">
        &lt;wt-app-header&gt;
            &lt;wt-header-actions
            :user="{ name: 'My name', preferredUsername: 'My username' }"
            :build-info="{ release: '21.02', build: 'AWS-12' }"
            &gt;&lt;/wt-header-actions>&gt;
        &lt;/wt-app-header&gt;
        </code></pre>
        </div>
      </article>
      <component-props
        :properties="headerActionsProps"
      ></component-props>
      <component-events
        :events="headerActionsEvents"
      ></component-events>
    </section>
  </div>
</template>

<script>
import Prism from 'prismjs';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';

export default {
  name: 'wt-app-header-docs',
  data: () => ({
    apps: [
      { name: WebitelApplications.AGENT, href: 'https://example.com' },
      { name: WebitelApplications.AUDIT, href: 'https://example.com' },
      { name: WebitelApplications.SUPERVISOR, href: 'https://example.com' },
      { name: WebitelApplications.ADMIN, href: 'https://example.com' },
      { name: WebitelApplications.HISTORY, href: 'https://example.com' },
      { name: WebitelApplications.ANALYTICS, href: 'https://example.com' },
    ],
    user: {
      name: 'My name',
      preferredUsername: 'My username',
    },
    buildInfo: {
      release: '21.02',
      build: 'AWS-12',
    },
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
        code: '<wt-user-actions :build-info="{ release: \'xx.xx\', build: \'yy-yy\' }"></wt-user-actions>',
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

<style scoped>

</style>

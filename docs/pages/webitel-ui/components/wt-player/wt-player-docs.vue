<template>
  <article>
    <p>
      <strong
        >Important: player is looking for icons in {/{$baseURL}/}img/plyr.svg
        (or /img/plyr.svg by default).</strong
      >
      First, download plyr.svg from
      <a
        href="https://github.com/webitel/webitel-ui-sdk/tree/master/public"
        target="_blank"
      >
        Github</a
      >
      and place it in project /public folder. Then, $baseURL should be passed as
      global variable in plugins/webitel-ui.js:
    </p>
    <pre><code class="language-javascript">
            const globals = {
              $baseURL: process.env.BASE_URL,
            };
            // init plugin
            Vue.use(WebitelUI, { eventBus, router, globals });
      </code></pre>
  </article>
  <component-props :properties="properties" />
  <component-events :events="events" />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtPlayerDocs',
  data: () => ({
    properties: [
      {
        value: 'src',
        code: '<wt-player :src="src"></wt-player>',
      },
      {
        value: 'autoplay',
        code: '<wt-player :loop="false"></wt-player>',
        default: 'true',
      },
      {
        value: 'loop',
        code: '<wt-player :loop="false"></wt-player>',
        default: 'false',
      },
      {
        value: 'mime',
        code: '<wt-player mime="video"></wt-player>',
        default: 'audio',
        description:
          'On mime type depends, wt-player will draw a video or audio component',
      },
      {
        value: 'resetOnEnd',
        code: '<wt-player reset-on-end></wt-player>',
        default: 'false',
        description:
          'Plyr-specific prop. Resets player position to start on file end.',
      },
      {
        value: 'invertTime',
        code: '<wt-player invert-time></wt-player>',
        default: 'true',
        description: 'Plyr-specific prop.',
      },
      {
        value: 'resetVolume',
        code: '<wt-player reset-volume></wt-player>',
        default: 'false',
        description:
          'plyr is caching volume settings ("muted" too) so we could reset them at init',
      },
      {
        value: 'download',
        code: '<wt-player :loop="false"></wt-player>',
        type: ['Boolean', 'String', 'Function'],
        default: "(url) => url.replace('/stream', '/download')",
        description: 'if false, no download button will be shown',
      },
    ],
    events: [{ value: 'all native <audio> events' }],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>

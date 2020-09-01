<template>
  <section>
    <h2>Player</h2>
    <article>
      <div class="example-wrapper">
        <wt-player src="https://cdn6.sefon.pro/files/prev/1/The%20Eagles%20-%20Hotel%20California%20%28192kbps%29.mp3" :download="false"></wt-player>
        <pre><code class="language-html">
          &lt;wt-player
            :src="src" :download="false"
          &gt;&lt;/wt-player&gt;
        </code></pre>
      </div>
    </article>
    <article>
      <p><strong>Important: player icons won't be shown without copied to /public/img/plyr.svg icons.</strong></p>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'table-actions',
  data: () => ({
    size: 10,
    isNext: true,
    isPrev: false,
    properties: [
      {
        value: 'src',
        code: '<wt-player :src="src"></wt-player>',
      },
      {
        value: 'loop',
        code: '<wt-player :loop="false"></wt-player>',
        default: 'true',
      },
      {
        value: 'download',
        code: '<wt-player :loop="false"></wt-player>',
        type: ['Boolean', 'String', 'Function'],
        default: '(url) => url.replace(\'/stream\', \'/download\')',
        description: 'if false, no download button will be shown',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
</style>

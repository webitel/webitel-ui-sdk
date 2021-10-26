<template>
  <section>
    <h2>Icons</h2>
    <article>
      <div class="example-wrapper">
        <wt-icon icon="bucket"></wt-icon>
        <pre><code class="language-html">&lt;wt-icon icon="bucket"&gt;&lt;/wt-icon&gt;</code></pre>
      </div>
    </article>
    <article>
      <h3>Wt-icon installation:</h3>
      <p>(FROM QUICK START PAGE) In order to use icons you need to install svg-sprite-loader and
        configure webpack build and import the sprite itself.</p>
      <ol>
        <li>
          Install sprite loader with <strong>npm</strong>:
          <pre><code class="language-bash">npm i svg-sprite-loader</code></pre>
        </li>
        <li>
          In plugins/webitel-ui.js
          <pre><code class="language-javascript">import '@webitel/ui-sdk/dist/img/svg-sprites/wt-icon.svg';</code></pre>
        </li>
        <li>
          in vue.config.js
          <pre><code class="language-javascript">
            // exclude sprites default building
            config.module.rule('svg').exclude.add(/^(.*sprites).*\.svg/);

            // use svg-sprite-loader to process icons sprite
          config.module.rule('svg-sprite').test(/^(.*sprites).*\.svg/)
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: () => '' });
          </code></pre>
        </li>
      </ol>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <icon-grid />
  </section>
</template>

<script>
  import Prism from 'prismjs';
  import IconGrid from './_internals/icon-grid.vue';

  export default {
    name: 'wt-icon-docs',
    components: {
      IconGrid,
    },
    data: () => ({
      properties: [
        {
          value: 'icon',
          code: '<wt-icon icon="close"></wt-icon>',
          type: 'String',
          required: true,
        },
        {
          value: 'size',
          code: '<wt-icon icon="close" size="sm"></wt-icon>',
          type: 'String',
          options: ['"sm", "md", "lg", "xl"'],
          default: 'md',
        },
        {
          value: 'color',
          code: '<wt-icon icon="close" color="success"></wt-icon>',
          type: 'String',
          default: 'default',
          options: [
            'default - var(--icon-color)',
            'contrast - var(--main-color)',
            'active - default icon color at :hover',
            'disabled - icon color, but with "disabled" opacity',
            'success - inherited from Semantic colors',
            'danger - inherited from Semantic colors',
            'transfer - inherited from Semantic colors',
            'hold - inherited from Semantic colors',
          ],
          description: 'Icon colors. Attention! Hover color is changing only for "default color".',
        },
        {
          value: 'iconPrefix',
          code: '<wt-icon icon="close" icon-prefix="adm"></wt-icon>',
          type: 'String',
          default: '',
          description: `inserts icon name prefix between "icon" and actual icon name ("icon" prop).
            Useful for library icons extension with project-level icons with this prefix in name`,
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

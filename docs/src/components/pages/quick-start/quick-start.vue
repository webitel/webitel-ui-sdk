<template>
  <section>
    <h2>Installation</h2>
    <ol>
      <li>
        Install with <strong>npm</strong>:
        <pre><code class="language-bash">npm i @webitel/ui-sdk</code></pre>
      </li>
      <li>
        Create <strong> plugins/webitel-ui.js</strong> file:
        <pre><code class="language-javascript">
            // import main file
            import WebitelUI from '@webitel/ui-sdk/dist/ui-sdk.common';

            // import locale
            import WebitelUIEn from '@webitel/ui-sdk/src/locale/en/en';
            import WebitelUIRu from '@webitel/ui-sdk/src/locale/ru/ru';
            import i18n from '../locale/i18n';

            // import styles
            import '@webitel/ui-sdk/dist/ui-sdk.css';
            // import scss variables and other reusables
            import '@webitel/ui-sdk/src/css/main.scss';

            // init plugin
            Vue.use(WebitelUI, {});
            // add plugin locales to main i18n
            i18n.mergeLocaleMessage('en', WebitelUIEn);
            i18n.mergeLocaleMessage('ru', WebitelUIRu);</code></pre>
      </li>
      <li>
        Import file to <strong>main.js</strong>:
        <pre><code class="language-javascript">import './plugins/webitel-ui';</code></pre>
      </li>
    </ol>
  </section>
</template>

<script>
  import Prism from 'prismjs';
  import 'prismjs/components/prism-bash';

  export default {
    name: 'quick-start',
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
  pre {
    min-width: 600px;
    width: 60%;
    padding: 10px;
    margin-right: 60px;
    background: var(--main-primary-accent-color);
    border-radius: var(--border-radius);
    color: var(--main-primary-color);
    cursor: text;
  }
</style>

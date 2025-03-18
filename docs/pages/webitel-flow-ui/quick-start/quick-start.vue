<template>
  <section>
    <h2>Installation</h2>
    <ol>
      <li>
        Install with <strong>npm</strong>:
        <pre><code class="language-javascript">npm i @webitel/flow-ui-sdk</code></pre>
      </li>
      <li>
        Create <strong> plugins/webitel-flow-ui.js</strong> file:
        <pre><code class="language-javascript">
            // import locale
            import WebitelUIEn from '@webitel/flow-ui-sdk/src/locale/en/en';
            import WebitelUIRu from '@webitel/flow-ui-sdk/src/locale/ru/ru';
            import WebitelUIUa from '@webitel/flow-ui-sdk/src/locale/ua/ua';
            import i18n from '../locale/i18n';

            // add plugin locales to main i18n
            i18n.mergeLocaleMessage('en', WebitelUIEn);
            i18n.mergeLocaleMessage('ru', WebitelUIRu);
            i18n.mergeLocaleMessage('ua', WebitelUIUa);</code></pre>
      </li>
      <li>
        Import file to <strong>main.js</strong>:
        <pre><code class="language-javascript">import './plugins/webitel-flow-ui';</code></pre>
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  name: 'QuickStart',
};
</script>

<style lang="scss" scoped>
pre {
  cursor: text;
  margin-right: 60px;
  border-radius: var(--border-radius);
  background: var(--contrast-color);
  padding: 10px;
  width: 60%;
  min-width: 600px;
  color: var(--main-color);
}
</style>

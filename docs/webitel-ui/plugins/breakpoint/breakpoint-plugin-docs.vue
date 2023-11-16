<template>
  <section class="markdown-body">
    <h2>Breakpoint Plugin</h2>
    <article>
      <h3>What and Why?</h3>
      <p>
        This plugin provides JavaScript code with screen resolution breakpoints
        through bunch of useful computed properties (for more information,
        see
        <a
          class="full-docs-link"
          href="https://vuetifyjs.com/en/features/display-and-platform/"
        >Vuetify docs</a>, or read source code :)
        )
      </p>
      <p>Why? - Sometimes you need screen resolution breakpoints not only in CSS,
        but in JavaScript.
        <br>
        For instance:
      <ul>
        <li>- computing "sm"/"md" size properties to library components;</li>
        <li>- attaching specific classes depending on screen size;</li>
        <li>- conditionally draw or hide some components;</li>
      </ul>
      </p>
      <p>
        However, if you're looking for CSS breakpoints, see
        <router-link
          class="full-docs-link"
          to="/ui/style/breakpoints"
        >Style/Breakpoints</router-link>
      section</p>
      <p>Plugin functionality is copy-pasted from Vuetify display breakpoints.</p>
    </article>
    <article>
      <h3>Installation</h3>
      <pre>
        <code class="language-javascript">
          // plugins/breakpoint.js
          import { install } from '@webitel/ui-sdk/src/plugins/breakpoint/breakpoint.plugin';
          import Vue from 'vue';

          install(Vue);


          // main.js
          import 'plugins/breakpoint';
        </code>
      </pre>
    </article>
    <article>
      <h3>Usage</h3>
      <p>See
        <a
          class="full-docs-link"
          href="https://vuetifyjs.com/en/features/display-and-platform/"
        >Vuetify docs</a></p>
    </article>
  </section>
</template>

<script>
export default {
  name: 'breakpoint-plugin-docs',
};
</script>

<style lang="scss" scoped>

</style>

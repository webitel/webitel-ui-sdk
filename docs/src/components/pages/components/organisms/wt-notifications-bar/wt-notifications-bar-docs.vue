<template>
  <section>
    <h2>Notifications bar</h2>
    <article>
      <div class="example-wrapper">
        <div
          style="position:relative; : 500px; height: 500px; background: var(--secondary-color);">
          <wt-notifications-bar style="position:absolute;"/>
        </div>
        <pre><code
          class="language-html">&lt;wt-notifications-bar&gt;&lt;/wt-notifications-bar&gt;</code></pre>
      </div>
    </article>
    <article>
      <h3>Specification</h3>
      <p>Notification bar listens to <b>eventBus 'notification' event</b> and represents sent
        notifications using wt-notification component. 'notification' <b>events</b> should have
        the following <b>format</b>:
      </p>
      <pre><code class="language-javascript">
        {
          type: 'info' || 'error', // icon
          text: 'Text, represented by wt-notification',
        }
    </code></pre>
      <p>After 4s message is being discarded.
        <br>
        <b>Notifications bar won't work without eventBus,
        registered in plugin (check "Quick start" page).</b></p>
    </article>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-notifications-bar-docs',
    data: () => ({}),
    mounted() {
      Prism.highlightAll();
      this.$eventBus.$emit('notification', { type: 'error', text: 'Text1' });
      this.$eventBus.$emit('notification', { type: 'info', text: 'Text2' });
      this.$eventBus.$emit('notification', { type: 'error', text: 'Text3' });
    },
  };
</script>

<style lang="scss" scoped>
</style>

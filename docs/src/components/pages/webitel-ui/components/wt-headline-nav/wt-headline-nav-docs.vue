<template>
  <section>
    <h2>Headline Nav</h2>
    <article>
      <div
        class="example-wrapper"
        style="padding: 30px; background: #EAEAEA;"
      >
        <wt-headline-nav
          :path="[
            { name: 'Admin' },
            { name: 'Contact-center' },
            { name: 'Queues', route: 'https://dev.webitel.com/contact-center/queues' },
          ]"
        />
        <pre><code
          class="language-html"
>
        &lt;wt-headline-nav
          :path="[
              { name: 'Admin' },
              { name: 'Contact-center' },
              { name: 'Queues', route: 'https://dev.webitel.com/contact-center/queues' },
          ]"
        &gt;&lt;/wt-headline-nav&gt;
        </code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    />
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'WtHeadlineNavDocs',
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

<style lang="scss" scoped>
</style>

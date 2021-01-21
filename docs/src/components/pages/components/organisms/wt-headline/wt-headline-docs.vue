<template>
  <section>
    <h2>Headline</h2>
    <article>
      <div class="example-wrapper" style="padding: 30px; background: #EAEAEA;">
        <wt-headline>
          <template slot="title">
            Headline
          </template>
          <template slot="search">
            <wt-search-bar></wt-search-bar>
          </template>
          <template slot="actions">
            <wt-button style="margin-left: 20px;">Hello</wt-button>
            <wt-button style="margin-left: 20px;" color="secondary">there!</wt-button>
          </template>
        </wt-headline>
        <pre><code
          class="language-html">
        &lt;wt-headline&gt;
          &lt;template slot="title"&gt;
            Headline
          &lt;/template&gt;
          &lt;template slot="search"&gt;
            &lt;wt-search-bar&gt;&lt;/wt-search-bar&gt;
          &lt;/template&gt;
          &lt;template slot="actions"&gt;
            &lt;wt-button>Hello&lt;/wt-button&gt;
          &lt;wt-button color="secondary"&gt;there!&lt;/wt-button&gt;
          &lt;/template&gt;
        &lt;/wt-headline&gt;
        </code></pre>
      </div>
    </article>
    <component-slots
      :slots="slots"
    ></component-slots>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-headline-docs',
    data: () => ({
      slots: [
        {
          name: 'default',
          description: 'headline direct child',
        },
        {
          name: 'title-wrapper',
          description: 'headline direct child slot, but with search and actions slots available',
        },
        {
          name: 'title',
          description: 'Title slot',
        },
        {
          name: 'search',
          description: 'Search slot',
        },
        {
          name: 'actions',
          description: 'Action buttons slot',
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

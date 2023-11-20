<template>
  <section>
    <h2>Filters panel wrapper</h2>
    <article>
      <div class="example-wrapper">
        <wt-filters-panel-wrapper>
          <wt-select label="filter" />
          <wt-select label="filter" />
          <wt-select label="filter" />
          <wt-select label="filter" />
          <wt-select label="filter" />
          <wt-select label="filter" />
          <wt-select label="filter" />
        </wt-filters-panel-wrapper>
        <pre><code class="language-html">
          /* there's 7 select filters */
          &lt;wt-filters-panel-wrapper
             wt-select*7
          &gt;&lt;/wt-filters-panel-wrapper&gt;
        </code></pre>
      </div>
    </article>
    <component-events
      :events="events"
    />
    <component-slots
      :slots="slots"
    />
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtFiltersPanelWrapperDocs',
  data: () => ({
    events: [
      {
        value: 'reset',
        description: 'Filters reset click event',
      },
    ],
    slots: [
      {
        name: 'default',
        description: `Default content slot, used for filters addition. All elements inside this slot
        are built inside grid with 230px width size`,
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

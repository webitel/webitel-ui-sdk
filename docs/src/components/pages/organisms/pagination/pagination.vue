<template>
  <section>
    <h2>Pagination</h2>
    <article>
      <div class="example-wrapper">
        <wt-pagination
          v-model="size"
          :next="isNext"
          :prev="isPrev"
        ></wt-pagination>
        <pre><code class="language-html">
          &lt;wt-pagination
            v-model="size"
            :next="isNext"
            :prev="isPrev"
          &gt;
          &lt;/wt-pagination&gt;
        </code></pre>
      </div>
    </article>
    <component-model
      prop="size"
      event="change"
    ></component-model>
    <component-props
      :properties="properties"
    ></component-props>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'pagination',
    data: () => ({
      size: 10,
      isNext: true,
      isPrev: false,
      properties: [
        {
          value: 'size',
          code: '<wt-pagination :size="`10`"></wt-pagination>',
          type: ['String', 'Number'],
          default: '10',
          description: 'SIZE CHANGE IS DEBOUNCED',
        },
        {
          value: 'next',
          code: '<wt-pagination :next="isNext"></wt-pagination>',
          type: Boolean,
          default: true,
          description: 'Is false, disables paging arrow',
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

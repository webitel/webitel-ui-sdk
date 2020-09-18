<template>
  <section class="mixins">
    <h2>Data filter Mixins</h2>
    <article class="mixin">
      <h3>Base Filter Mixin</h3>
      <p>Mixin contains basic get/set filter params to query logic.</p>
      <p><b>When component is created,
        retrieves filter value from query and calls this.restoreValue(value); method.
        Watches for url change to call restore() method.</b></p>
      <pre>
        <code class="language-javascript">
          // following options should be passed or overridden, if necessary
          data: () => ({
            defaultValue: '', // default value, that will be set, if query is empty. Default: ''. Can be overridden
            filterQuery: 'my-filter-name', // query object param name. Should be declared
          }),
          methods: {
            restore(( filterQuery }) {} // get value from query or from default value. May be overridden
            restoreValue(value) {} // receives restored value. Should be implemented

            // methods from _urlQueryMixin
            getValueFromQuery({ filterQuery }) // gets value from query by filter query. Should NOT be overridden
            setValueToQuery({ filterQuery, value, storedProp = 'id' }) /* sets value to query. If array of objects,
            stores only value by storedProp key (value[storedProp]).
            Tracks equality of previous and new value. Should NOT be overridden */
          },
        </code>
     </pre>
    </article>
    <article class="mixin">
      <h3>API Filter Mixin</h3>
      <p><b>Extends Base Filter Mixin</b>, plus implements value restoring logic.</p>
      <pre>
        <code class="language-javascript">
          // following options should be overridden, if necessary
          data: () => ({
            value: [], // filter value itself
            defaultValue: [],
            trackBy: 'id', // track-by prop value for wt-select
            storedProp: 'id', // value property, stored in query
          }),
          methods: {
            restoreValue(idList) {} // by default, works with value like id array. If not empty, calls fetchSelected method with these ids

            fetchSelected(idList) {} // API get call with ids filter. Should be implemented
          },
        </code>
     </pre>
    </article>
    <article class="mixin">
      <h3>Enum Filter Mixin</h3>
      <p><b>Extends Base Filter Mixin</b>, plus implements value restoring logic.</p>
      <pre>
        <code class="language-javascript">
          // following options should be overridden, if necessary
          data: () => ({
            value: [], // filter value itself
            defaultValue: [],
            options: [], // enum options. Should be overridden
            trackBy: 'id', // track-by prop value for wt-select
            storedProp: 'id', // value property, stored in query
          }),
          methods: {
            restoreValue(value) {} // by default, searches value (or values) in options and sets it
          },
        </code>
     </pre>
    </article>
    <article class="mixin">
      <h3>Sort Filter Mixin</h3>
      <p><b>Extends Base Filter Mixin</b>, plus implements value setting and restoring logic.</p>
      <pre>
        <code class="language-javascript">
          data: () => ({
            filterQuery: 'sort',
          }),
          methods: {
            sort(column) {} /* accepts header column with sort value (recommended as handler for
          wt-table @sort event). Computes next sort order and sets value to query. */

          restoreValue() {} /* restores and sets value to this.headers (!!) */
          },
        </code>
     </pre>
    </article>
    <article class="mixin">
      <h3>Pagination Filter Mixin</h3>
      <p><b>Extends Base Filter Mixin</b>, plus implements value setting and restoring logic.</p>
      <pre>
        <code class="language-javascript">
          props: {
            isNext: Boolean
          },
          data: () => ({
            page: '1',
            size: '10',
          }),
          methods: {
            next() {} // changes page and emits "input" event
            prev() {} // changes page and emits "input" event
            sizeChange(value) {} /* changes size to value and emits "input" event */
          },
        </code>
     </pre>
    </article>
    <article class="mixin">
      <h3>Simple usage example</h3>
      <p>Enum filter mixin</p>
      <pre>
        <code class="language-html">
          &lt;template&gt;
            &lt;wt-select
              v-model="value"
              :options="options"
              :track-by="trackBy"
              multiple
              @reset="setValueToQuery({ value, filterQuery, storedProp })"
              @closed="setValueToQuery({ value, filterQuery, storedProp })"
            &gt;&lt;/wt-select&gt;
          &lt;/template&gt;
        </code>
        <code class="language-javascript">
          &lt;script&gt;
            import enumFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/enumFilterMixin';
            import DirectionOptions from '@/api/DirectionOptions.enum';
            export default {
              mixins: [enumFilterMixin],
              data: () => ({
                options: DirectionOptions,
                filterQuery: 'direction',
              }),
            };
          &lt;/script&gt;
        </code>
     </pre>
    </article>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'validation-mixin-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>

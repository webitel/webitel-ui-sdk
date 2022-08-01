<template>
  <section class="module docs-content-wrapper">
    <h2>Query Filters Module</h2>
    <p><strong>Introduction: </strong> Query Filters Module contains necessary tools for filtering
    data in applications</p>
    <article>
      <h3><code>/classes</code></h3>
      Module has 3 <code>filterSchema</code> classes to represent a filter:
      <h4><code>BaseFilterSchema.js</code></h4>
      <p>Base filter schema module which represents base filter schema,
        shared across all filters in store, accepts following params:</p>
      <ul>
        <li><code>value</code> <i>(default = '')</i></li>
        <li><code>defaultValue</code> <i>(default = '')</i></li>
      </ul>

      <h4><code>ApiFilterSchema.js</code></h4>
      <p>used specifically for api-entities filtering (eg. agents or queues).
        Extends <code>BaseFilterSchema</code> and accepts additional optional params:</p>
      <ul>
          <li><code>locale</code> -- $t locale paths. <i>(default = { label: 'filter' } )</i></li>
          <li><code>storedProp</code> - object property, stored in url <i>(default = 'id' )</i></li>
          <li><code>multiple</code> - select multiple value boolean <i>(default = true )</i></li>
          <li><code>closeOnSelect</code> - close select options after select <i>(default = false )</i></li>
          <li><code>API</code> - Options API method for options fetch, search and restoring selected values</li>

        <h4><code>EnumFilterSchema.js</code></h4>
        <p>used specifically for lookup-entities filtering (eg. direction or statuses).
          Extends <code>BaseFilterSchema</code> and accepts additional optional params:</p>
        <li><code>options</code> - Array of options within following format: <code>{ value, locale?, name }</code>
          (if locale is passed, then name is overridden by $t(locale))</li>
        <li><code>storedProp</code> - same as <code>ApiFilterSchema</code>, but <i>(default = 'value' )</i></li>
        <li><strong>...same as ApiFilterSchema, without <code>API</code></strong></li>
      </ul>
    </article>
    <article class="module">
      <h3><code>/store</code></h3>
      <h4><code>QueryFiltersStore.js</code></h4>
      <p>extends <router-link to="/store/base-store-module">BaseStoreModule.js</router-link></p>
      <p>
        Constructor: ({ state? })
      </p>
      <ul>
        <li><b>getters:</b></li>
        <li><b>GET_FILTER(filterName)</b>: returns filter value by name</li>
        <li><b>GET_FILTERS()</b>: returns values of all filters in object</li>
      </ul>
      <ul>
        <li><b>actions:</b></li>
        <li><b>SET_FILTER({ filter, value })</b>: returns filter value by name.
          If value is empty, sets defaultValue from filter schema. If filter is multiple, but value is not
          array -- wraps it.
        </li>
        <li><b>RESET_FILTERS()</b>: sets values of all filters equal to defaultValue property in filter schema</li>
      </ul>
    </article>
    <section class="module">
      <article>
        <h3>Simple usage example, filters store module</h3>
        <pre>
        <code class="language-javascript">
            import QueryFilterStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFilterStoreModule';
            import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
            import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';

            const state = {
              search: new BaseFilterSchema(),
              agent: New ApiFilterSchema({
                API: () => {},
                locale: { label: 'path.to.agent' },
              }),
              from: new BaseFilterSchema({
                value: Date.now(),
                defaultValue: Date.now(),
              }),
            };

            export default new QueryFilterStoreModule({ state }).getModule();
        </code>
     </pre>
      </article>
    </section>
    <section>
      <article>
      <h3><code>/components</code></h3>
      <h4><code>abstract-api-filter.vue</code></h4>
      <p>Implements wt-select api filter with default actions.</p>
      <h5>Props:</h5>
      <ul>
        <li><code>namespace</code> - [String] filters store namespace</li>
        <li><code>filterQuery</code> - [String] store state apiFilterSchema prop and url query prop name</li>
      </ul>
      </article>
      <article>
        <h4><code>abstract-enum-filter.vue</code></h4>
        <p>Implements wt-select enum filter with default actions.</p>
        <h5>Props:</h5>
        <ul>
          <li><code>namespace</code> - [String] filters store namespace</li>
          <li><code>filterQuery</code> - [String] store state enumFilterSchema prop and url query prop name</li>
        </ul>
      </article>
       <article>
         <h4><code>filter-select.vue</code></h4>
         <p>Implements wt-select enum filter with default actions.</p>
         <h5>Props:</h5>
         <ul>
           <li><code>namespace</code> - [String] filters store namespace</li>
           <li><code>filterQuery</code> - [String] store state baseFilterSchema prop and url query prop name <i>(default='search')</i></li>
         </ul>
       </article>
     </section>
    <section>
      <h3><code>/api</code></h3>
      <article>
        <h4><code>defaults.js</code></h4>
        <p>exports <code>defaultParams</code> and <code>listResponseHandler</code> for select filters api</p>
      </article>
    </section>
    <h2><strong>Internals</strong></h2>
    <p>If you need to create a custom filter, you should extend source mixins and override their default
    methods.</p>
    <p>For detailed information please check mixins code on
      <a href="https://github.com/webitel/webitel-ui-sdk/tree/master/src/modules/QueryFilters/mixins">github</a>.
    These docs are in very bad condition now :(</p>
<!--    <article class="mixin">-->
<!--      <h3>Base Filter Mixin</h3>-->
<!--      <p>Mixin contains basic get/set filter params to query logic, 'namespace' string prop</p>-->
<!--      <p><b>When component is created,-->
<!--        retrieves filter value from query and calls this.restoreValue(value); method.-->
<!--        Watches for url change to call restore() method.</b></p>-->
<!--      <pre>-->
<!--        <code class="language-javascript">-->
<!--          // following options should be passed or overridden, if necessary-->
<!--          data: () => ({-->
<!--            filterQuery: 'my-filter-name', // query object param name. Should be declared-->
<!--          }),-->
<!--          methods: {-->
<!--            restore(( filterQuery }) {} // get value from query or from default value. May be overridden-->
<!--            restoreValue(value) {} // receives restored value. Should be implemented-->

<!--            // methods from _urlQueryMixin-->
<!--            getValueFromQuery({ filterQuery }) // gets value from query by filter query. Should NOT be overridden-->
<!--            setValueToQuery({ filterQuery, value, storedProp = 'id' }) /* sets value to query. If array of objects,-->
<!--            stores only value by storedProp key (value[storedProp]).-->
<!--            Tracks equality of previous and new value. Should NOT be overridden */-->

<!--            setValue(payload) {} // by default tries to dispatch SET_FILTER store action with namespace, passed as component prop-->
<!--          },-->
<!--        </code>-->
<!--     </pre>-->
<!--    </article>-->
<!--    <article class="mixin">-->
<!--      <h3>API Filter Mixin</h3>-->
<!--      <p><b>Extends Base Filter Mixin</b>, plus implements value restoring logic.</p>-->
<!--      <pre>-->
<!--        <code class="language-javascript">-->
<!--          methods: {-->
<!--            restoreValue(idList) {} /* by default, works with value like id array. If not empty, calls fetchSelected method with these ids.-->
<!--              Then, calls this.setValue() method, which should be mapped from filters store "SET_FILTER" action */-->
<!--            fetchSelected(idList) {} // API get call with id filter. Should be implemented-->
<!--          },-->
<!--        </code>-->
<!--     </pre>-->
<!--    </article>-->
<!--    <article class="mixin">-->
<!--      <h3>Enum Filter Mixin</h3>-->
<!--      <p><b>Extends Base Filter Mixin</b>, plus implements value restoring logic.</p>-->
<!--      <pre>-->
<!--        <code class="language-javascript">-->
<!--          // following options should be overridden, if necessary-->
<!--          methods: {-->
<!--            restoreValue(value) {} // by default, searches value (or values) in options and-->
<!--          calls this.setValue() method, which should be mapped from filters store "SET_FILTER" action */-->
<!--          },-->
<!--        </code>-->
<!--     </pre>-->
<!--    </article>-->
<!--    <article class="mixin">-->
<!--      <h3>Sort Filter Mixin</h3>-->
<!--      <p><b>Extends Base Filter Mixin</b>, plus implements value setting and restoring logic.</p>-->
<!--      <pre>-->
<!--        <code class="language-javascript">-->
<!--          data: () => ({-->
<!--            filterQuery: 'sort',-->
<!--          }),-->
<!--          methods: {-->
<!--            sort(column) {} /* accepts header column with sort value (recommended as handler for-->
<!--          wt-table @sort event). Computes next sort order and sets value to query. */-->

<!--          restoreValue() {} /* restores and calls this.setHeaders() method, that should be implemented (!!) */-->
<!--          },-->
<!--        </code>-->
<!--     </pre>-->
<!--    </article>-->
<!--    <article class="mixin">-->
<!--      <h3>Pagination Filter Mixin</h3>-->
<!--      <p><b>Extends Base Filter Mixin</b>, plus implements value setting and restoring logic.</p>-->
<!--      <pre>-->
<!--        <code class="language-javascript">-->
<!--          props: {-->
<!--            isNext: Boolean-->
<!--          },-->
<!--          methods: {-->
<!--            next() {} // calls setPage() and emits "input" event-->
<!--            prev() {} // calls setPage() and emits "input" event-->
<!--            sizeChange(value) {} /* calls setSize() to value and emits "input" event */-->
<!--          },-->
<!--        </code>-->
<!--     </pre>-->
<!--    </article>-->
<!--    <article class="mixin">-->
<!--      <h3>Simple usage example</h3>-->
<!--      <p>Enum filter mixin</p>-->
<!--      <pre>-->
<!--        <code class="language-html">-->
<!--          &lt;template&gt;-->
<!--            &lt;wt-select-->
<!--              :value="value"-->
<!--              :options="options"-->
<!--              :track-by="storedProp"-->
<!--              :multiple="multiple"-->
<!--              @input="setValue(filter: filterQuery, value: $event })"-->
<!--              @reset="setValueToQuery({ value, filterQuery, storedProp })"-->
<!--              @closed="setValueToQuery({ value, filterQuery, storedProp })"-->
<!--            &gt;&lt;/wt-select&gt;-->
<!--          &lt;/template&gt;-->
<!--        </code>-->
<!--        <code class="language-javascript">-->
<!--          &lt;script&gt;-->
<!--            import { mapState, mapActions } from 'vuex';-->
<!--            import enumFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/enumFilterMixin';-->
<!--            import DirectionOptions from '@/api/DirectionOptions.enum';-->
<!--            export default {-->
<!--              mixins: [enumFilterMixin],-->
<!--              data: () => ({-->
<!--                options: DirectionOptions,-->
<!--                filterQuery: 'direction',-->
<!--              }),-->
<!--              computed: mapState('filters', {-->
<!--                value: (state) => state.direction.value,-->
<!--                storedProp: (state) => state.direction.storedProp,-->
<!--                multiple: (state) => state.direction.multiple,-->
<!--              }),-->
<!--              methods: mapActions('filters, { setValue: 'SET_FILTER' },-->
<!--            };-->
<!--          &lt;/script&gt;-->
<!--        </code>-->
<!--     </pre>-->
<!--    </article>-->
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'validation-module-docs',
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
  ul {
    margin-bottom: 20px;
    li {
      margin-bottom: 5px;
    }
  }
</style>

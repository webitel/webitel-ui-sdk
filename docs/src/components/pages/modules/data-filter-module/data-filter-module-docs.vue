<template>
  <section class="module">
    <h2>Data filter Module</h2>
    <p><strong>Introduction: </strong> Data filter module has queryFilter store module getters, actions and mutations
    to control state of filters and get to their correctly computed values and filter mixins, that
      control the filters from the component side</p>
    <article class="module">
      <h3>QueryFilterStoreModule.js</h3>
      <p>the module is a constructor of the object with namespaced, getters, actions and mutations,
        which provide the ability to take the values of filters, set the value to filter, + reset filters action.
        Constructor: ({ state? })
        methods: getModule({ namespaced?, getters?, actions?, mutations? }) -- returns store module.
        If some arguments were passed, merges default values with them -- with arguments higher priority.
      </p>
      <p><b>State: </b> each filter should have the following schema: </p>
      <ul>
        <li><b>filter schema:</b></li>
        <li><b>value</b>: value of filter</li>
        <li><b>defaultValue</b>: default value of filter. Set, if filter is reset, or if value is falsy</li>
        <li><b>multiple</b>: Boolean, checks if filter is array-like</li>
        <li><b>storedProp</b>: String, prop stored in url and sent in request, if value is object </li>
      </ul>
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
    <article class="module">
      <h3>Simple usage example, filters store module</h3>
      <pre>
        <code class="language-javascript">
            import QueryFilterStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFilterStoreModule';

            const state = {
              search: {
                value: '',
                defaultValue: '',
              },
              agent: {
                value: [],
                defaultValue: [],
                storedProp: 'id',
                multiple: true,
              },
              from: {
                value: Date.now(),
                defaultValue: Date.now(),
              },
            };

            export default new QueryFilterStoreModule({ state }).getModule();
        </code>
     </pre>
    </article>
    <article class="mixin">
      <h3>Base Filter Mixin</h3>
      <p>Mixin contains basic get/set filter params to query logic, 'namespace' string prop</p>
      <p><b>When component is created,
        retrieves filter value from query and calls this.restoreValue(value); method.
        Watches for url change to call restore() method.</b></p>
      <pre>
        <code class="language-javascript">
          // following options should be passed or overridden, if necessary
          data: () => ({
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

            setValue(payload) {} // by default tries to dispatch SET_FILTER store action with namespace, passed as component prop
          },
        </code>
     </pre>
    </article>
    <article class="mixin">
      <h3>API Filter Mixin</h3>
      <p><b>Extends Base Filter Mixin</b>, plus implements value restoring logic.</p>
      <pre>
        <code class="language-javascript">
          methods: {
            restoreValue(idList) {} /* by default, works with value like id array. If not empty, calls fetchSelected method with these ids.
              Then, calls this.setValue() method, which should be mapped from filters store "SET_FILTER" action */
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
          computed: {
            options() { // enum options. Should be overridden
              return [];
            },
          },
          methods: {
            restoreValue(value) {} // by default, searches value (or values) in options and
          calls this.setValue() method, which should be mapped from filters store "SET_FILTER" action */
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

          restoreValue() {} /* restores and calls this.setHeaders() method, that should be implemented (!!) */
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
          methods: {
            next() {} // calls setPage() and emits "input" event
            prev() {} // calls setPage() and emits "input" event
            sizeChange(value) {} /* calls setSize() to value and emits "input" event */
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
              :value="value"
              :options="options"
              :track-by="storedProp"
              :multiple="multiple"
              @input="setValue(filter: filterQuery, value: $event })"
              @reset="setValueToQuery({ value, filterQuery, storedProp })"
              @closed="setValueToQuery({ value, filterQuery, storedProp })"
            &gt;&lt;/wt-select&gt;
          &lt;/template&gt;
        </code>
        <code class="language-javascript">
          &lt;script&gt;
            import { mapState, mapActions } from 'vuex';
            import enumFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/enumFilterMixin';
            import DirectionOptions from '@/api/DirectionOptions.enum';
            export default {
              mixins: [enumFilterMixin],
              data: () => ({
                options: DirectionOptions,
                filterQuery: 'direction',
              }),
              computed: mapState('filters', {
                value: (state) => state.direction.value,
                storedProp: (state) => state.direction.storedProp,
                multiple: (state) => state.direction.multiple,
              }),
              methods: mapActions('filters, { setValue: 'SET_FILTER' },
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

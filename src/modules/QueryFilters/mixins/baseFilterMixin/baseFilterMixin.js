import getNamespacedState from '../../../../store/helpers/getNamespacedState';

export default {
  props: {
    namespace: {
      type: String,
      description: 'Store module namespace for state and actions mapping.',
    },
  },
  created() {
    this.restore({ filterQuery: this.filterQuery });
  },
  computed: {
    filterSchema() {
      if (!this.$store) throw new Error('Vuex is required for default filterSchema baseFilterMixin property');
      return getNamespacedState(this.$store.state, this.namespace)[this.filterQuery];
    },
    value() {
      return this.filterSchema.value;
    },
  },
  methods: {
    restore({ filterQuery }) {
      const value = this.getValueFromQuery({ filterQuery });
      if (value) this.restoreValue(value);
    },
    setValue(payload) {
      if (!this.$store) throw new Error('Vuex is required for default setValue() baseFilterMixin method');
      return this.$store.dispatch(`${this.namespace}/SET_FILTER`, payload);
    },
    setValueToQuery(payload) {
      if (!this.$store) throw new Error('Vuex is required for default setValueToQuery() baseFilterMixin method');
      return this.$store.dispatch(`${this.namespace}/SET_VALUE_TO_QUERY`, payload);
    },
    getValueFromQuery({ filterQuery }) {
      if (!this.$store) throw new Error('Vuex is required for default getValueFromQuery() baseFilterMixin method');
      return this.$route.query[filterQuery];
    },
  },
};

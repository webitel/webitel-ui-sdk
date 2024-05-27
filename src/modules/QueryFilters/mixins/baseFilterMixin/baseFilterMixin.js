import getNamespacedState from '../../../../store/helpers/getNamespacedState.js';
import _urlControllerMixin from '../_urlControllerMixin/_urlControllerMixin.js';

export default {
  mixins: [_urlControllerMixin],
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
  },
};

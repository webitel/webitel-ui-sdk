import VueMultiselect from 'vue-multiselect';
import { ObserveVisibility } from 'vue-observe-visibility';
import validationMixin
  from '../../../mixins/validationMixin/validationMixin';
import debounce from '../../../scripts/debounce';
import isEmpty from '../../../scripts/isEmpty';
import labelUsageMixin from '../../wt-label/mixins/labelUsageMixin';

export default {
  mixins: [validationMixin, labelUsageMixin],
  directives: { ObserveVisibility },
  components: {
    VueMultiselect,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },

    placeholder: {
      type: String,
      default: '',
    },

    trackBy: {
      type: String,
      default: 'id',
    },

    optionLabel: {
      type: String,
    },

    searchMethod: {
      type: Function,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    required: {
      type: Boolean,
      default: false,
    },

    allowEmpty: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    apiOptions: [],
    isLoading: false,
    defaultOptionLabel: 'name',

    searchParams: {
      search: '',
      page: 1,
    },
    searchHasNext: true,
  }),
  computed: {
    selectOptionLabel() {
      // trackBy === null means that options are not objects but primitives
      if (this.trackBy === null) return null;
      return this.optionLabel || this.defaultOptionLabel;
    },
    isApiMode() {
      return !!this.searchMethod;
    },
    showIntersectionObserver() {
      return this.isApiMode && !this.isLoading && this.apiOptions.length;
    },
    selectValue() {
      // vue-multiselect doesn't show placeholder if value is empty object
      return this.isValue ? this.value : '';
    },

    selectOptions() {
      return this.isApiMode ? this.apiOptions : this.options;
    },

    isValue() {
      return !isEmpty(this.value);
    },
    listeners() {
      return {
        'update:model-value': this.input,
        close: this.close,
        tag: this.tag,
        'search-change': (search) => {
          this.$emit('search-change', search);
          this.handleSearchChange(search);
        },
      };
    },
  },

  methods: {
    getOptionLabel({ option, optionLabel }) {
      if (optionLabel && option[optionLabel]) return option[optionLabel];
      if (option.locale) {
        if (Array.isArray(option.locale)) return this.$t(...option.locale);
        return this.$t(option.locale);
      }
      return option[this.defaultOptionLabel] || option;
    },
    handleSearchChange(search) {
      // search can be used in non-api mode too
      this.searchParams.search = search;

      if (!this.isApiMode) return;
      this.isLoading = true;
      this.searchParams.page = 1;
      this.fetchOptions();
    },

    handleAfterListIntersect(isVisible) {
      if (isVisible && this.searchHasNext) {
        this.isLoading = true;
        this.searchParams.page += 1;
        this.fetchOptions();
      }
    },

    async fetchOptions({ search, page } = this.searchParams) {
      if (!this.isApiMode) return;
      const { items, next } = await this.searchMethod({ search, page });
      this.apiOptions = this.searchParams.page === 1 ? items : this.apiOptions.concat(items);
      this.searchHasNext = next;
      this.isLoading = false;
    },

    input(value) {
      this.$emit('input', value);
    },

    close() {
      this.$emit('closed');
    },

    tag() {},
  },

  watch: {
    disabled() {
      // load options if becomes enabled
      if (!this.disabled) this.fetchOptions();
    }
  },

  created() {
    // load options only if not disabled
    if (!this.disabled) this.fetchOptions();
    this.fetchOptions = debounce(this.fetchOptions, 500);
  },
};

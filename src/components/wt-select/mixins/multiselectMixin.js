import VueMultiselect from 'vue-multiselect';
import { ObserveVisibility } from 'vue-observe-visibility';

import validationMixin from '../../../mixins/validationMixin/validationMixin.js';
import debounce from '../../../scripts/debounce.js';
import isEmpty from '../../../scripts/isEmpty.js';
import labelUsageMixin from '../../wt-label/mixins/labelUsageMixin.js';

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
    /**
     * pass "value" prop as string, receive @input event with string,
     * but pass options as objects and calculate value from options by this prop
     */
    useValueFromOptionsByProp: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    apiOptions: [],
    cachedOptionsMap: {}, // is needed for props.useValueFromOptionsByProp
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
      /* vue-multiselect doesn't show placeholder if value is empty object */
      if (!this.isValue) return '';

      let returnedValue = this.value;

      /*
      coerce single value to array, if it was passed with `multiple` prop
      by dev mistake or internal error
       */
      if (this.multiple && !Array.isArray(returnedValue)) {
        console.warn(
          'wt-select: value prop should be an array when using multiple mode',
        );
        returnedValue = [returnedValue];
      }

      if (this.useValueFromOptionsByProp) {
        if (this.multiple) {
          returnedValue = returnedValue.map(
            (item) => this.cachedOptionsMap[item] || item,
          );
        } else {
          returnedValue = this.cachedOptionsMap[returnedValue] || returnedValue;
        }
      }

      return returnedValue;
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
      // https://webitel.atlassian.net/browse/WTEL-3181
      // if allowCustomValue select mode, return vue-multiselect label as is
      if (this.allowCustomValues && option.isTag) return option.label;

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
      this.apiOptions =
        this.searchParams.page === 1 ? items : this.apiOptions.concat(items);
      this.searchHasNext = next;
      this.isLoading = false;
    },

    input(value) {
      let emittedValue = value;
      if (this.useValueFromOptionsByProp) {
        if (this.multiple) {
          emittedValue = value.map(
            (item) => item[this.useValueFromOptionsByProp],
          );
        } else {
          emittedValue = value[this.useValueFromOptionsByProp];
        }
      }
      this.$emit('input', emittedValue); // vue 2
      this.$emit('update:model-value', emittedValue); // vue 3
    },

    close(event) {
      this.$emit('closed', event);
    },

    tag() {},
  },

  watch: {
    disabled() {
      // load options if becomes enabled
      if (!this.disabled) this.fetchOptions();
    },
    selectOptions: {
      handler() {
        if (this.trackBy === null) return; // then, options are primitives

        for (const opt of this.selectOptions) {
          this.cachedOptionsMap[
            opt[this.useValueFromOptionsByProp || this.trackBy]
          ] = opt;
        }
      },
      immediate: true,
    },
    value: {
      async handler() {
        /*
        use case: select api option while using `useValueFromOptionsByProp` prop,
        then, refresh page and restore selected id. but it may not be in options list,

        when using api-fetched options, selected value, tracked by id,
         may be not in returned options list,
        so its necessary to fetch those values separately
         */
        if (this.useValueFromOptionsByProp && this.isApiMode) {
          const valuesArr = Array.isArray(this.value)
            ? this.value
            : [this.value];
          const uncachedValues = valuesArr.filter(() => {
            return !this.cachedOptionsMap[this.value];
          });

          if (uncachedValues.length) {
            const { items } = await this.searchMethod({
              id: uncachedValues,
              size: uncachedValues.length,
            });
            items.forEach((item) => {
              this.cachedOptionsMap[item[this.useValueFromOptionsByProp]] =
                item;
            });
          }
        }
      },
      immediate: true,
    },
  },

  created() {
    // load options only if not disabled
    if (!this.disabled) this.fetchOptions();

    this.fetchOptions = debounce(this.fetchOptions, 500);
  },
};

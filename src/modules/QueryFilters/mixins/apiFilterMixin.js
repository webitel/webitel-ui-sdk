import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],
  computed: {
    locale() {
      return this.filterSchema?.locale;
    },
    storedProp() {
      return this.filterSchema?.storedProp;
    },
    multiple() {
      return this.filterSchema?.multiple;
    },
    closeOnSelect() {
      return this.filterSchema?.storedProp;
    },
    label() {
      return Array.isArray(this.locale.label)
        ? this.$t(...this.locale.label)
        : this.$t(this.locale.label);
    },
  },
  methods: {
    async restoreValue(id) {
      if (id && id.length) {
        let newValue;
        if (this.multiple) {
          const idsArr = Array.isArray(id) ? id : [id];
          this.setValue({ filter: this.filterQuery, value: idsArr.map((id) => ({ id })) });
          newValue = await this.fetchSelected(idsArr);
        } else {
          this.setValue({ filter: this.filterQuery, value: { id } });
          newValue = await this.fetchSelected(id);
        }
        this.setValue({ filter: this.filterQuery, value: newValue });
      }
    },
    fetchSelected() {},
  },
};

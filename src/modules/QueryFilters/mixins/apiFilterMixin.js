import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

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

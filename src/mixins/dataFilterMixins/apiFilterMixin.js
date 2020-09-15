import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  data: () => ({
    value: [],
    defaultValue: [],
    trackBy: 'id',
    storedProp: 'id',
  }),

  methods: {
    async restoreValue(idList) {
      this.value = idList && idList.length
        ? await this.fetchSelected(idList) : this.defaultValue;
    },

    async fetchSelected(idList) {
      return idList;
    },
  },
};

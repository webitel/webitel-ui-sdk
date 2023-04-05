import deepEqual from 'deep-equal';

export default {
  methods: {
    changeRouteQuery({ filterQuery, value }) {
      const query = { ...this.$route.query };
      query[filterQuery] = value;
      return this.$router.replace({
        name: this.$router.currentRoute.name,
        query,
      });
    },

    async setValueToQuery({ filterQuery, value, storedProp = 'id' }) {
      let newValue = '';
      if (Array.isArray(value)) {
        if (value.length && typeof value[0] !== 'object') {
          newValue = value;
        } else {
          newValue = value.map((item) => item[storedProp]);
        }
      } else if (typeof value === 'object' && value !== null) {
        newValue = value[storedProp];
      } else {
        newValue = value;
      }
      if (!deepEqual(this.$route.query[filterQuery], newValue)) {
        await this.changeRouteQuery({
          value: newValue,
          filterQuery,
        });
      }
    },

    getValueFromQuery({ filterQuery }) {
      return this.$route.query[filterQuery];
    },
  },
};

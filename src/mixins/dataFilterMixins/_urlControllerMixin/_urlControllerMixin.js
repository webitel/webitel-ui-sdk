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

    setValueToQuery({ filterQuery, value, storedProp = 'id' }) {
      let newValue = '';
      if (Array.isArray(value)) {
        if (value.length && typeof value[0] !== 'object') {
          newValue = value;
        } else {
          newValue = value.map((item) => item[storedProp]);
        }
      } else {
        newValue = value;
      }
      if (!deepEqual(this.$route.query[filterQuery], newValue)) {
        this.changeRouteQuery({
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

export default {
  methods: {
    // TODO: WHAT IS "ID" PARAM?!
    tag(searchQuery, id) {
      this.emitTagEvent(searchQuery, id);

      const tag = this.trackBy ? {
        [this.optionLabel || 'name']: searchQuery,
        [this.trackBy]: id || searchQuery,
      } : searchQuery;

      const isTagExist = (newTag) => {
        if (typeof newTag === 'string') {
          return this.options.some((elem) => elem === newTag);
        }
        return this.options.some((elem) => elem[this.trackBy] === newTag[this.trackBy]);
      }

      if (isTagExist(tag)) return;

      this.options.unshift(tag);
      if (!this.manualTagging) {
        const value = this.multiple ? [...this.value, tag] : tag;
        this.input(value);
      }
    },
    // method to override
    emitTagEvent(searchQuery, id) {
      this.$emit('tag', searchQuery, id);
    },
  },
};


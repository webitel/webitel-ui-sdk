import UploadCsvPopup from '../components/upload-csv-popup.vue';

export default {
  components: { UploadCsvPopup },
  props: {
    file: {
      required: true,
    },
  },
  data: () => ({
    mappingFields: [],
  }),
  methods: {
    close() {
      this.$emit('close');
    },
  },
};

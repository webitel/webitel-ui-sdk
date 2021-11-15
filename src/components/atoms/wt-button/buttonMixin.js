export default {
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colorClass() {
      if (!this.disabled) return `${this.color}`;
      return '';
    },
    loaderColor() {
      if (['success', 'transfer', 'danger'].includes(this.color)) return 'main';
      return 'contrast';
    },
  },
};

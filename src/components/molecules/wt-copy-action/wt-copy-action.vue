<template>
  <wt-tooltip class="wt-copy-action">
    <template v-slot:activator>
      <wt-icon-btn
        v-bind="$attrs"
        :icon="copied ? 'done' : 'copy'"
        class="copy-action"
        @click="copy"
      ></wt-icon-btn>
    </template>
    {{ copied ? copiedTooltip : copyTooltip }}
  </wt-tooltip>
</template>

<script>
import copy from 'clipboard-copy';

let copiedIdTimeout = null;

export default {
  name: 'wt-copy-action',
  data: () => ({
    copied: false,
  }),
  props: {
    value: {
      type: String,
    },
    tooltips: {
      type: Object,
      default: () => ({
        copy: '',
        copied: '',
      }),
    },
  },
  computed: {
    copyTooltip() {
      return this.tooltips.copy || this.$t('webitelUI.copy.copy');
    },
    copiedTooltip() {
      return this.tooltips.copied || this.$t('webitelUI.copy.copied');
    },
  },
  methods: {
    async copy() {
      try {
        await copy(this.value);
        this.copied = this.value;
        if (copiedIdTimeout) window.clearTimeout(copiedIdTimeout);
        copiedIdTimeout = setTimeout(() => {
          this.copied = null;
        }, 1500);
      } catch (err) {
        throw err;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

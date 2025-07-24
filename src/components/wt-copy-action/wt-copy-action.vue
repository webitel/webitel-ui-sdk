<template>
  <wt-icon-btn
    v-tooltip="copied ? copiedTooltip : copyTooltip"
    :icon="copied ? 'done' : 'copy'"
    class="copy-action"
    v-bind="$attrs"
    @click="copy"
  />
</template>

<script>
import copy from 'clipboard-copy';

let copiedIdTimeout = null;

export default {
  name: 'WtCopyAction',
  props: {
    value: {
      type: String,
    },
    tooltips: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    copied: false,
  }),
  computed: {
    copyTooltip() {
      return this.tooltips.copy || this.$t('webitelUI.copyAction.copy');
    },
    copiedTooltip() {
      return this.tooltips.copied || this.$t('webitelUI.copyAction.copied');
    },
  },
  methods: {
    async copy() {
      await copy(this.value);
      this.copied = this.value;
      if (copiedIdTimeout) window.clearTimeout(copiedIdTimeout);
      copiedIdTimeout = setTimeout(() => {
        this.copied = null;
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped></style>

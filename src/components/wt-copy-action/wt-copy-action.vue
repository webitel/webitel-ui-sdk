<template>
  <wt-tooltip class="wt-copy-action">
    <template #activator>
      <wt-icon-btn
        v-bind="$attrs"
        :icon="copied ? 'done' : 'copy'"
        class="copy-action"
        @click="copy"
      />
    </template>
    {{ copied ? copiedTooltip : copyTooltip }}
  </wt-tooltip>
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
      default: () => ({
        copy: '',
        copied: '',
      }),
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

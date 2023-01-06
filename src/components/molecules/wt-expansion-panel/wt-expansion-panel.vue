<template>
  <div class="wt-expansion-panel">
    <div
      class="wt-expansion-panel__header"
      @click="open = !open"
    >
      <div
        class="wt-expansion-panel__header-title"
      >
        {{ $t(title) }}
      </div>
      <wt-icon-btn
        :icon="open ? 'arrow-down' : 'arrow-right'"
      ></wt-icon-btn>
    </div>
    <transition name="fade">
      <div v-show="open">
        <slot name="wt-expansion-panel-content"></slot>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'wt-expansion-panel',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    open: true,
  }),
};
</script>

<style lang="scss" scoped>
.wt-expansion-panel {
  @extend %typo-body-2;

  &__header {
    @extend %typo-subtitle-2;
    display: flex;
    justify-content: space-between;
    background-color: var(--secondary-middle-color);
    padding: var(--spacing-2xs) var(--spacing-xs);

  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all var(--transition);
}
</style>

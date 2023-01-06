<template>
  <div class="wt-expansion-panel">
    <div
      class="wt-expansion-panel-header"
      @click="open = !open"
    >
      <div
        class="wt-expansion-panel-header__title"
      >
        <slot name="title"></slot>
      </div>
      <wt-icon
        :class="{'wt-expansion-panel__arrow':open}"
        icon="arrow-right"
      ></wt-icon>
    </div>
    <transition name="fade">
      <div v-show="open">
        <slot></slot>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'wt-expansion-panel',
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
    background-color: var(--secondary-color-50);
    padding: var(--spacing-2xs) var(--spacing-xs);
  }

  .wt-icon{
    margin-left: auto;
  }

  &__arrow {
    transform: rotate(90deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all var(--transition);
}
</style>

<template>
  <div class="wt-popup">
    <div class="wt-popup__shadow"></div>
    <aside
      class="wt-popup__popup"
      :class="{'wt-popup__popup--overflow': overflow}"
      :style="popupStyle"
    >
      <header class="wt-popup__header">
        <slot name="header">
          <h3 class="wt-popup__title">
            <slot name="title"></slot>
          </h3>
        </slot>
        <wt-icon-btn
          class="wt-popup__close-btn"
          icon="close"
          @click="$emit('close')"
        ></wt-icon-btn>
      </header>
      <section class="wt-popup__main" v-if="$slots.main">
        <slot name="main"></slot>
      </section>
      <footer class="wt-popup__actions" v-if="$slots.actions">
        <slot name="actions"></slot>
      </footer>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'wt-popup',
  props: {
    minWidth: {
      type: [Number, String],
    },
    overflow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    popupStyle() {
      return this.minWidth ? `min-width: ${this.minWidth}px;` : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--popup-wrapper-z-index);

  &__shadow {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--popup-shadow-color);
    z-index: 0;
  }
}

.wt-popup__popup {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: var(--popup-sections-gap);
  max-height: var(--popup-max-height);
  padding: var(--popup-padding);
  background: var(--popup-bg-color);
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-10);
  z-index: 1;

  &--overflow {
    overflow: visible;
  }
}

.wt-popup__header {
  @extend %typo-subtitle-1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--popup-header-padding);
  padding: var(--popup-header-padding);
  background: var(--popup-header-bg-color);
  border-radius: var(--border-radius);

  .wt-popup__title {
    font: inherit;
    flex-grow: 1;
  }

  .wt-popup__close-btn {
    flex: 0 0 var(--icon-md-size);
  }
}

.wt-popup__main {
  @extend %wt-scrollbar;
  @extend %typo-body-1;
  min-height: 0;
  flex-grow: 1;
  overflow-y: auto;
  padding-right: var(--popup-main-section-padding-right);
}

.wt-popup__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--popup-actions-padding);
  padding: var(--popup-actions-padding);
}
</style>

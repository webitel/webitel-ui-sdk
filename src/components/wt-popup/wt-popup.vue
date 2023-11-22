<template>
  <div
    :class="{ 'wt-popup--overflow': overflow }"
    class="wt-popup"
  >
    <aside
      :style="popupStyle"
      class="wt-popup__popup"
    >
      <header class="wt-popup__header">
        <slot name="header">
          <h3 class="wt-popup__title">
            <slot name="title" />
          </h3>
        </slot>
        <wt-icon-btn
          class="wt-popup__close-btn"
          icon="close"
          @click="$emit('close')"
        />
      </header>
      <section
        v-if="$slots.main"
        class="wt-popup__main"
      >
        <slot name="main" />
      </section>
      <footer
        v-if="$slots.actions"
        class="wt-popup__actions"
      >
        <slot name="actions" />
      </footer>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'WtPopup',
  props: {
    minWidth: {
      type: [Number, String],
    },
    width: {
      type: [Number, String],
    },
    overflow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    popupStyle() {
      let style = '';
      style += this.minWidth ? `min-width: ${this.minWidth}px;` : '';
      style += this.width ? `width: ${this.width}px;` : '';
      return style;
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-popup {
  position: fixed;
  z-index: var(--popup-wrapper-z-index);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--popup-shadow-color);
}

.wt-popup__popup {
  z-index: 1;
  display: flex;
  flex-direction: column;
  max-height: var(--popup-max-height);
  margin: var(--popup-padding);
  padding: var(--popup-padding);
  border-radius: var(--border-radius);
  background: var(--popup-bg-color);
  box-shadow: var(--elevation-10);
  gap: var(--popup-sections-gap);
}

.wt-popup__header {
  @extend %typo-subtitle-1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--popup-header-padding);
  border-radius: var(--border-radius);
  background: var(--popup-header-bg-color);
  gap: var(--popup-header-padding);

  .wt-popup__title {
    flex-grow: 1;
    font: inherit;
  }

  .wt-popup__close-btn {
    flex: 0 0 var(--icon-md-size);
  }
}

.wt-popup__main {
  @extend %wt-scrollbar;
  @extend %typo-body-1;
  overflow-y: auto;
  flex-grow: 1;
  min-height: 0;
  padding-right: var(--popup-main-section-padding-right);
}

.wt-popup__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--popup-actions-padding);
  gap: var(--popup-actions-padding);
}

.wt-popup--overflow {
  .wt-popup__popup {
    overflow: visible;
  }

  .wt-popup__main {
    overflow: visible;
    padding-right: 0;
  }
}
</style>

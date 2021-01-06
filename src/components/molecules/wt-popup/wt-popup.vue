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
          <h3 class="wt-popup__header__title">
            <slot name="title"></slot>
          </h3>
        </slot>
        <wt-icon-btn
          class="wt-popup__close-btn"
          icon="remove-rounded"
          size="sm"
          color="active"
          @click.native="$emit('close')"
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
    background: var(--main-primary-accent-color);
    opacity: var(--popup-shadow-opacity);
    z-index: 0;
  }
}

.wt-popup__popup {
  @extend %wt-scrollbar;

  position: absolute;
  top: 50%;
  left: 50%;
  max-height: var(--popup-max-height);
  padding: var(--popup-padding);
  background: var(--popup-bg-color);
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow-y: auto;
  z-index: 1;

  &--overflow {
    overflow: visible;
  }
}

.wt-popup__header {
  position: relative;
  padding: var(--popup-header-padding);

  .wt-popup__header__title {
    @extend %typo-strong-lg;
    text-align: center;
    padding: var(--popup-header-title-padding);
  }

  .wt-popup__close-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.wt-popup__main {
  padding: var(--popup-main-padding);
}

.wt-popup__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--popup-actions-padding);

  .wt-button {
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>

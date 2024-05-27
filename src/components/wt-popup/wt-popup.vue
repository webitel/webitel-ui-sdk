<template>
  <div
    v-show="wrapperShown"
    :class="[
      `wt-popup--size-${size}`,
      { 'wt-popup--overflow': overflow }
    ]"
    class="wt-popup"
  >
    <transition-slide
      :offset="[0, -1440/2]"
    >
      <aside
        v-if="shown"
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
    </transition-slide>
  </div>
</template>

<script>
import { TransitionSlide } from '@morev/vue-transitions';

export default {
  name: 'WtPopup',
  components: {
    TransitionSlide,
  },
  props: {
    shown: {
      type: Boolean,
      default: true, // TODO: change me to false after refactor
    },
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['xs', 'sm', 'md', 'lg'].includes(v),
    },
    overflow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  data: () => ({
    wrapperShown: false,
  }),
  watch: {
    // overlay should be shown before popup to show animation properly
    shown: {
      handler(value) {
        if (value) {
          this.wrapperShown = true;
        } else {
          setTimeout(() => {
            this.wrapperShown = value;
          }, 200); // 200 -> 0.2s css var(--transition); duration
        }
      }, immediate: true,
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
  background: var(--wt-popup-shadow-color);

  &--size {
    &-xs {
      .wt-popup__popup {
        width: var(--wt-popup-size-xs);
      }
    }

    &-sm {
      .wt-popup__popup {
        width: var(--wt-popup-size-sm);
      }
    }

    &-md {
      .wt-popup__popup {
        width: var(--wt-popup-size-md);
      }
    }

    &-lg {
      .wt-popup__popup {
        width: var(--wt-popup-size-lg);
      }
    }

  }
}

.wt-popup__popup {
  z-index: 1;
  display: flex;
  flex-direction: column;
  max-height: var(--popup-max-height);
  margin: var(--popup-padding);
  padding: var(--popup-padding);
  border-radius: var(--border-radius);
  background: var(--wt-popup-background-color);
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
  color: var(--wt-popup-header-text-color);
  border-radius: var(--border-radius);
  background: var(--wt-popup-header-background-color);
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

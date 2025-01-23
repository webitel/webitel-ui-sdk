<template>
  <div
    v-show="showPopupComponent"
    :class="[`wt-popup--size-${size}`, { 'wt-popup--overflow': overflow }]"
    class="wt-popup"
  >

<!--    &lt;!&ndash;  @slot check source code for scoped bindings :( &ndash;&gt;-->
<!--    <slot-->
<!--      class="wt-popup-activator"-->
<!--      name="activator"-->
<!--      v-bind="{-->
<!--    shown: wrapperShown,-->
<!--    size,-->
<!--    disabled,-->
<!--    open: openPopup,-->
<!--    close: closePopup,-->
<!--    toggle: togglePopup,-->
<!--  } as ActivatorSlotScope"-->
<!--    />-->

    <transition-slide :offset="[0, -1440 / 2]">
      <aside
        v-if="wrapperShown"
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
            @click="closePopup"
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

<script lang="ts" setup>
import {TransitionSlide} from '@morev/vue-transitions';
import {computed, defineEmits, defineProps, ref, watch} from 'vue';

import {ComponentSize} from "../../enums/ComponentSize/ComponentSize.enum.ts";

interface Props {
  /**
   * can be used to force popup visibility state
   * even if it is controlled by activator slot
   */
  shown?: boolean;
  size?: ComponentSize;
  /**
   * if true, popup contents will overflow popup container, without scrolling
   * useful for small popups with select components, which have not enough space
   * to show its dropdown content without scrolling the popup
   */
  overflow?: boolean;
  /**
   * disable popup visibility
   * __even if `shown` prop is "true"__
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  shown: true,  // TODO: change me to false after refactor
  size: ComponentSize.MD,
  overflow: false,
  disabled: false,
});

const emit = defineEmits<{
  /**
   * popup header "close" button clicked
   */
  close: [];
  'popup:opened': [];
  'popup:closed': [];
}>();

interface ActivatorSlotScope {
  shown: Props['shown'];
  size: Props['size'];
  disabled: Props['disabled'];
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const slots = defineSlots<{
  activator?: ActivatorSlotScope;
}>();
const activatorMode = !!slots.activator;

const wrapperShown = ref(false);
const isCloseAnimationPlaying = ref(false);


const openPopup = () => {
  wrapperShown.value = true;
};

const closePopup = () => {
  isCloseAnimationPlaying.value = true;
  wrapperShown.value = false;

  setTimeout(() => {
    isCloseAnimationPlaying.value = false;
  }, 200); // 200 -> 0.2s css var(--transition); duration
};

// const togglePopup = () => {
//   if (wrapperShown.value) {
//     closePopup();
//   } else {
//     openPopup();
//   }
// };

const showPopupComponent = computed(() => {
  return wrapperShown.value || isCloseAnimationPlaying.value;
});

// overlay should be shown before popup to show animation properly
watch(
  () => props.shown,
  (value) => {

    /*
     * prop shown default value =true is used to allow backwards compatibility with
     * older wt-popup API, when popup visibility was controlled simply by v-if
     *
     * however, in latest component API design using activator slot is recommended,
     * but if that's so, there's no `shown` prop => it's true by default => popup is initially shown
     * so we need to handle initial popup visibility depending on activator slot presence
     */
    if (activatorMode) return;


    if (value) {
      openPopup();
    } else {
      closePopup();
    }
  },
  {immediate: true}
);

watch(wrapperShown, (value) => {
  if (value) {
    emit('popup:opened');
  } else {
    emit('popup:closed');
  }
});

</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../css/main.scss';

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

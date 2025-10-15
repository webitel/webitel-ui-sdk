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
            v-if="closable"
            class="wt-popup__close-btn"
            icon="close"
            @click="emit('close')"
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
import { TransitionSlide } from '@morev/vue-transitions';
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

import { ComponentSize } from '../../enums/ComponentSize/ComponentSize';

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
  closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  shown: true, // TODO: change me to false after refactor
  size: ComponentSize.MD,
  overflow: false,
  disabled: false,
  closable: true
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

const wrapperShown = ref(props.shown);
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
@use './popup.scss';
// need to reuse popup styles in wt-player--md @author @liza-pohranichna
</style>


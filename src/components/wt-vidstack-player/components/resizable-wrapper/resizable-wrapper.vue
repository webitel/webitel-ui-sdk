<template>
  <div
    class="resizable-wrapper"
    :class="[`resizable-wrapper--${size}`]"
  >
    <slot name="content" />

    <slot name="default" :size="size" :change-size="changeSize" />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  provide,
  ref,
} from 'vue';

import {ComponentSize} from '../../../../enums';

interface Props {
  staticLayout?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  staticLayout: false
});

const size = ref(ComponentSize.SM);

const changeSize = (value) => {
  size.value = value;
}

/** @author liza-pohranichna
 * options: [sm, md, lg]
 * lg-size is fullscreen
 */
provide('size', { size, changeSize });
</script>

<style scoped lang="scss">
@use '../../../wt-popup/mixins.scss' as *;

.resizable-wrapper {
  transition: var(--transition);

  &--sm {
    position: fixed;
    right: var(--spacing-md);
    bottom: var(--spacing-md);
    max-width: var(--p-player-wrapper-sm-width);
    max-height: var(--p-player-wrapper-sm-height);
    z-index: 100;
    border-radius: var(--p-player-wrapper-sm-border-radius);
    overflow: hidden;
    box-shadow: var(--elevation-10);
    height: var(--p-player-wrapper-sm-height);

    .resizable-wrapper__provider {
      display: block;
      height: 100%;
      // Control bar sm height
      padding-bottom: 48px;
    }
  }

  &--md {
    @include popup-wrapper;
    /** @author liza-pohranichna
    * need to use wt-popup styles for md size https://webitel.atlassian.net/browse/WTEL-7723 */
  }

  &--lg {
    .resizable-wrapper {
      &__player {
        display: flex;
        align-items: center;
      }
      &__provider {
        width: 100%;
        min-width: 0;
      }
    }
  }
}
</style>

<style lang="scss">
.resizable-wrapper {
  video {
    height: 100%;
    object-fit: contain;
    width: 100%;
    min-width: 0;
  }
}
</style>

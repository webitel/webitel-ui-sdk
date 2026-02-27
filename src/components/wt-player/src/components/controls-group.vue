<template>
  <media-controls-group
    class="controls-group"
    :class="`controls-group--${size}`"
  >
    <div class="controls-group__actions">
      <slot />
    </div>
  </media-controls-group>
</template>

<script
  setup
  lang="ts"
>
import { inject } from 'vue';

import type { WtVidstackPlayerSizeProvider } from '../../types/WtVidstackPlayerSizeProvider';

const { size } = inject<WtVidstackPlayerSizeProvider>('size');
</script>

<style scoped>
.controls-group {
  display: flex;
  justify-content: center;
  max-width: fit-content;
  align-self: center;
}

.controls-group__actions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--p-player-control-bar-background);
  box-shadow: var(--elevation-10);
}
</style>

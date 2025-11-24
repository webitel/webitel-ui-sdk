<template>
  <div
    class="chat-message-player"
    @click="emit('open', props.file)"
  >
    <wt-player
      :src="mediaUrl"
      :mime="props.type"
      :autoplay="false"
      :hide-duration="type.includes('video')"
      reset-on-end
      reset-volume
      @initialized="handlePlayerInitialize"
    />
  </div>
</template>

<script setup lang="ts">

import { computed, defineEmits, defineProps } from 'vue';

interface Props {
  file: object;
  type: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['open']);
const mediaUrl = computed(() => props.file.streamUrl || props.file.url);

function handlePlayerInitialize(player) {
  this.$emit('initialized', player);
};

</script>

<style lang="scss" scoped>
.chat-message-player {
  //min-height: var(--player-audio-height);
  .wt-player :deep(.plyr) {
    .wt-player__close-icon,
      //.plyr__menu,
      //.plyr__control[download]
    .plyr__volume {
      display: none;
    }

    &.plyr--video {
      max-height: var(--chat-file-max-height);
      max-width: var(--chat-file-max-width);
    }
  }
}
</style>

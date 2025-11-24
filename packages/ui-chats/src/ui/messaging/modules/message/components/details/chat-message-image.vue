<template>
  <div class="chat-message-image" @click="emit('open', props.file)">
    <img
      class="chat-message-image__img"
      :src="props.file.url"
      :alt="props.file.name"
      draggable="false"
    >
  </div>
</template>


<script setup lang="ts">

import { defineEmits, defineProps } from 'vue';

interface Props {
  file: object;
}

const props = defineProps<Props>();
const emit = defineEmits(['open']);

</script>


<style lang="scss" scoped>
.chat-message-image {
  cursor: pointer;

  &__img {
    @extend %typo-body-1;
    max-height: var(--chat-file-max-height);
    max-width: var(--chat-file-max-width);
    width: 100%;
  }
}
</style>

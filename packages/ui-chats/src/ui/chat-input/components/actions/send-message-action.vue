<template>
  <wt-rounded-action
    icon="chat-send"
    color="accent"
    :size="size"
    rounded
    wide
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import { ComponentSize } from '@webitel/ui-sdk/enums';

const props = defineProps<{
  size: ComponentSize;
}>();

const emit = defineEmits<{
  'click': [];
}>();

</script>
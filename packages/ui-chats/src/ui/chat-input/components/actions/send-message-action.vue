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
import { inject } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';

const size = inject<ComponentSize>('size');

const emit = defineEmits<{
  'click': [];
}>();

</script>
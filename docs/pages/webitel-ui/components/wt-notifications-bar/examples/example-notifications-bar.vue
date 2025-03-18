<script setup>
import { onMounted, provide } from 'vue';
import eventBus from '../../../../../../src/scripts/eventBus';

provide('$eventBus', eventBus);

function sendNotification(type) {
  eventBus.$emit('notification', { type, text: 'Text4' });
}
</script>

<template>
  <wt-button @click="sendNotification('error')">
    Send error notification
  </wt-button>
  <wt-button
    style="margin-left: 10px"
    @click="sendNotification('info')"
  >
    Send info notification
  </wt-button>

  <div style="margin-top: 10px">
    <wt-notifications-bar style="position: static" />
  </div>
</template>

<style scoped lang="scss"></style>

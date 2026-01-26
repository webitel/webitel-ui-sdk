<script setup>
import { provide } from 'vue';
import { eventBus } from '@webitel/ui-sdk/scripts';

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
    <wt-notifications-bar />
  </div>
</template>


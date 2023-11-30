<script setup>
import { onMounted, provide } from 'vue';
import eventBus from '../../../../../../src/scripts/eventBus';

provide('$eventBus', eventBus);

function sendNotification() {
  eventBus.$emit('notification', { type: 'error', text: 'Text4' });
}
</script>

<template>
  <wt-button @click="sendNotification">Send notification</wt-button>
  <div style="position:relative; : 500px; height: 500px;">
    <wt-notifications-bar style="position:absolute;" />
  </div>
</template>

<style scoped lang="scss">

</style>

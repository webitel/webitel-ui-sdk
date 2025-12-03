<script setup>
import { provide } from 'vue';

import { VideoCallControlsPanel } from '../../../../../../../../src/components/wt-vidstack-player/components/index.js';

const micCallback = () => {}
const videoCallback = () => {}
const settingsCallback = () => {}
const chatCallback = () => {}
const hangOverCallback = () => {}

provide('size', {size: 'md'})
</script>

<template>
  <video-call-controls-panel
    :mic-callback="micCallback"
    :video-callback="videoCallback"
    :settings-callback="settingsCallback"
    :chat-callback="chatCallback"
    :hang-over-callback="hangOverCallback"
  />
</template>

<style scoped lang="scss"></style>

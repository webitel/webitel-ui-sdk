<template>
  <component-props :properties="properties" />
</template>

<script setup>
import Prism from 'prismjs';
import { onMounted } from 'vue';

const properties = [
  {
    value: 'is-mic-muted',
    type: 'Boolean',
    required: true,
    description: 'Determines whether the microphone is muted. Controls the microphone icon state.',
  },
  {
    value: 'is-video-muted',
    type: 'Boolean',
    required: true,
    description: 'Determines whether the camera is turned off. Controls the camera icon state.',
  },
  {
    value: 'screenshot-is-loading',
    type: 'Boolean',
    required: false,
    description: 'Indicates whether the screenshot process is currently in progress.',
  },
  {
    value: 'screenshot-status',
    type: 'ScreenshotStatus | null',
    required: false,
    description:
      'Result of the last screenshot action. Affects the displayed icon. Possible values: "done", "error", null.',
  },
  {
    value: 'recordings',
    type: 'Boolean',
    required: false,
    description: 'Defines whether the call recording is currently active.',
  },

  // Callbacks ----------------------------------------------------
  {
    value: 'screenshot-callback',
    type: 'Function',
    required: false,
    description: 'Triggered when the screenshot button is clicked.',
  },
  {
    value: 'recordings-callback',
    type: 'Function',
    required: false,
    description: 'Triggered when the recordings button is clicked.',
  },
  {
    value: 'mic-callback',
    type: 'Function',
    required: false,
    description: 'Triggered when the microphone button is clicked.',
  },
  {
    value: 'video-callback',
    type: 'Function',
    required: false,
    description: 'Triggered when the video camera button is clicked.',
  },
  {
    value: 'settings-callback',
    type: 'Function',
    required: false,
    description: 'Triggered when the settings button is clicked.',
  },
  {
    value: 'chat-callback',
    type: 'Function',
    required: false,
    description: 'Triggered when the chat button is clicked.',
  },
  {
    value: 'hang-over-callback',
    type: 'Function',
    required: false,
    description: 'Triggered when the hang-up button is clicked.',
  },
];


onMounted(() => {
  Prism.highlightAll();
});
</script>

<style lang="scss" scoped></style>

<template>
  <component-props :properties="properties" />
</template>

<script setup>
import Prism from 'prismjs';
import { onMounted } from 'vue';

const properties = [
  {
    value: 'sender',
    type: 'MediaStream',
    required: true,
    description:
      'Outgoing video/audio stream. Used as a fallback if `receiver` is not available.',
  },
  {
    value: 'receiver',
    type: 'MediaStream',
    required: true,
    description:
      'Incoming remote stream. When defined, it becomes the primary stream displayed in the main player.',
  },
  {
    value: 'is-mic-muted',
    type: 'Boolean',
    required: true,
    description:
      'Whether the microphone is currently muted. Passed into the controls panel to update microphone icon state.',
  },
  {
    value: 'is-video-muted',
    type: 'Boolean',
    required: true,
    description:
      'Whether the camera is currently disabled. Affects camera icon in the controls panel.',
  },
  {
    value: 'recordings',
    type: 'Boolean',
    required: false,
    description:
      'Indicates whether recording is currently active. Also controls visibility of the recording indicator.',
  },
  {
    value: 'screenshot-status',
    type: 'ScreenshotStatus | null',
    required: false,
    description:
      'Status of the latest screenshot attempt. Allowed values: `"done"` | `"error"` | `null`. The value is forwarded to the controls panel.',
  },
  {
    value: 'screenshot-is-loading',
    type: 'Boolean',
    required: false,
    description:
      'Shows whether the screenshot process is still loading. Used to display loading state on the screenshot button.',
  },

  // Callbacks
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
    description: 'Triggered when the video toggle button is clicked.',
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

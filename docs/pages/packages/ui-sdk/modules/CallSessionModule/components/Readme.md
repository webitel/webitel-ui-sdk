<script setup>
import Docs from './video-call-docs.vue';
import ExampleVideoCallControlsPanel from './examples/vide-call-controls-panel-example.vue';
</script>

# VideoCall

A panel of interactive call controls used in video/audio communication sessions.
It displays microphone, camera, recording, screenshot, chat, settings, and hang-up buttons.
Each button becomes visible only if its corresponding callback prop is provided.

## Props

::: raw
<Docs/>
:::

## Example Pagination

::: raw
<ExampleVideoCallControlsPanel/>
:::

::: details Code
<<< ./examples/vide-call-controls-panel-example.vue
:::

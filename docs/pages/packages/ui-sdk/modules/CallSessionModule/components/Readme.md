<script setup>
import Docs from './video-call-docs.vue';
import ExampleVideoCallControlsPanel from './examples/vide-call-controls-panel-example.vue';
</script>

# VideoCall

A high-level video call container built on top of `wt-vidstack-player`.  
It manages two video streams (`sender` and `receiver`), displays a preview window,
renders a recording indicator, and provides a customizable control panel via the
`video-call-controls-panel` component.

The component automatically chooses the primary displayed stream and supports
dynamic sizing (`sm`, `md`, `lg`) inherited from the parent player.  
All control actions (microphone toggle, camera toggle, screenshots, etc.) are passed
via callback props.

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

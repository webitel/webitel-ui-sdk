<script setup>
import { onMounted, shallowRef } from 'vue';

// TinyMCE touches `window` on import, so the component (and with it TinyMCE)
// is loaded in the browser only, never during the docs' server render.
const info = shallowRef(null);

onMounted(async () => {
	const { default: Component } = await import(
		'__lib__/components/on-demand/wt-rich-text-editor/wt-rich-text-editor.vue'
	);
	info.value = Component.docs;
});
</script>

<template>
  <component-info
    v-if="info"
    :info="info"
  />
</template>

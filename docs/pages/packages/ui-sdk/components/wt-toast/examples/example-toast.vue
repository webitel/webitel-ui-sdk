<script setup>
import { useToast } from 'primevue/usetoast';

const toast = useToast();

function showToast() {
	toast.add({
		severity: 'success',
		summary: 'Success',
		detail: 'Operation completed successfully.',
		life: 4000,
	});
}
</script>

<template>
  <wt-button @click="showToast">Show toast</wt-button>
</template>

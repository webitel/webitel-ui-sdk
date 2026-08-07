<script setup>
import { useToast } from 'primevue/usetoast';

const positions = [
	'top-left',
	'top-center',
	'top-right',
	'bottom-left',
	'bottom-center',
	'bottom-right',
	'center',
];

const toast = useToast();

function showToast(position) {
	toast.add({
		group: position,
		severity: 'info',
		summary: position,
		detail: `This toast is shown at "${position}".`,
		life: 4000,
	});
}
</script>

<template>
  <wt-toast
    v-for="pos of positions"
    :key="pos"
    :group="pos"
    :position="pos"
  />
  <div style="display: flex; flex-wrap: wrap; gap: 10px">
    <wt-button
      v-for="pos of positions"
      :key="pos"
      color="secondary"
      @click="showToast(pos)"
    >
      {{ pos }}
    </wt-button>
  </div>
</template>

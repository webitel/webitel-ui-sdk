<script setup>
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const lifeMs = 400000;

const toastActions = [
	{
		type: 'success',
		color: 'success',
	},
	{
		type: 'info',
		color: 'primary',
	},
	{
		type: 'warn',
		color: 'warn',
	},
	{
		type: 'error',
		color: 'error',
	},
	{
		type: 'contrast',
		color: 'job',
	},
	{
		type: 'secondary',
		color: 'secondary',
	},
];

const showWtLike = (type) => {
	const map = {
		success: {
			severity: 'success',
			summary: 'Success',
			detail: 'Operation completed',
		},
		info: {
			severity: 'info',
			summary: 'Info',
			detail: 'Informational message',
		},
		warn: {
			severity: 'warn',
			summary: 'Warning',
			detail: 'Please review this warning',
		},
		error: {
			severity: 'error',
			summary: 'Error',
			detail: 'Some error occurred',
		},
		contrast: {
			severity: 'contrast',
			summary: 'Contrast',
			detail: 'Toast text',
		},
		secondary: {
			severity: 'secondary',
			summary: 'Secondary',
			detail: 'Toast text',
		},
	};
	const payload = map[type];
	if (payload) {
		toast.add({
			...payload,
			life: lifeMs,
		});
	}
};
</script>

<template>
  <div class="wt-toast-migration-demo">
    <p class="wt-toast-migration-demo__hint">
      Кнопки нижче викликають PrimeVue Toast (той самий контейнер, що й у застосунках після додавання
      <code>&lt;WtToast /&gt;</code> у корінь і <code>ToastService</code> у плагіні PrimeVue).
    </p>
    <div class="wt-toast-migration-demo__actions">
      <wt-button
        v-for="action in toastActions"
        :key="action.type"
        :style="{
          background: `var(--p-toast-${action.type}-background)`,
          color: `var(--p-toast-${action.type}-color)`
        }"
        @click="showWtLike(action.type)"
      >
        {{ action.type }}
      </wt-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wt-toast-migration-demo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
}

.wt-toast-migration-demo__hint {
  margin: 0;
  max-width: 48rem;
  line-height: 1.4;
}

.wt-toast-migration-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs, 8px);
}
</style>

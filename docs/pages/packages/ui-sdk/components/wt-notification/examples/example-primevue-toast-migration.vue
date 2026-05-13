<script setup>
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const lifeMs = 4000;

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
		warning: {
			severity: 'warn',
			summary: 'Warning',
			detail: 'Please review this warning',
		},
		error: {
			severity: 'error',
			summary: 'Error',
			detail: 'Something went wrong',
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
      <code>&lt;PToast /&gt;</code> у корінь і <code>ToastService</code> у плагіні PrimeVue).
    </p>
    <div class="wt-toast-migration-demo__actions">
      <wt-button color="success" @click="showWtLike('success')"> success </wt-button>
      <wt-button color="primary" @click="showWtLike('info')"> info </wt-button>
      <wt-button color="warning" @click="showWtLike('warning')"> warning </wt-button>
      <wt-button color="error" @click="showWtLike('error')"> error </wt-button>
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

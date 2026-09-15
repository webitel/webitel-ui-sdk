<script setup>
import { ref } from 'vue';

import WtIcon from '../../../components/wt-icon/wt-icon.vue';
import WtSwitcher from '../../../components/wt-switcher/wt-switcher.vue';
import { createAppearanceStore } from '../pinia/store/AppearanceStore';

const emit = defineEmits([
	'changedMode',
]);

const useAppearanceStore = createAppearanceStore();
const appearanceStore = useAppearanceStore();

const mode = ref('light');

const setMode = (value) => {
	if (value === 'dark') {
		mode.value = 'dark';
		document.documentElement.classList.add('theme--dark');
		localStorage.setItem('theme', 'dark');
	} else {
		mode.value = 'light';
		document.documentElement.classList.remove('theme--dark');
		localStorage.setItem('theme', 'light');
	}
	emit('changedMode', value);
	appearanceStore.setTheme(mode.value);
};

const toggleDarkMode = () => {
	if (mode.value === 'light') {
		setMode('dark');
	} else {
		setMode('light');
	}
};

const cachedTheme = localStorage.getItem('theme');

if (cachedTheme) {
	setMode(cachedTheme);
} else {
	setMode('light');
}
</script>

<template>
  <div class="wt-dark-mode-switcher">
    <wt-icon icon="dark-mode" />
    <wt-switcher
      :model-value="mode === 'dark'"
      @update:model-value="toggleDarkMode"
    />
  </div>
</template>

<style lang="scss" scoped>
.wt-dark-mode-switcher {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>

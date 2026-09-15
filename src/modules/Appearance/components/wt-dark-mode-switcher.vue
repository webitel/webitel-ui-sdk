<script setup>
import { getActivePinia } from 'pinia';
import { inject, ref } from 'vue';

import WtIcon from '../../../components/wt-icon/wt-icon.vue';
import WtSwitcher from '../../../components/wt-switcher/wt-switcher.vue';
import { createAppearanceStore } from '../pinia/store/AppearanceStore';

const props = defineProps({
	namespace: {
		type: String,
		default: 'appearance',
	},
});

const emit = defineEmits([
	'changedMode',
]);

// vuex's useStore() is just inject('store') under the hood (its default
// injection key) — reading it directly avoids a hard dependency on the
// `vuex` package, which apps that migrated fully to Pinia don't install.
const store = inject('store', null);
const useAppearanceStore = createAppearanceStore();

const mode = ref('light');

const setThemeToStore = (theme) => {
	if (store) {
		store.dispatch(`${props.namespace}/SET_THEME`, theme);
	}

	// Pinia apps share the same `appearance` store id via createAppearanceStore()
	if (getActivePinia()) {
		useAppearanceStore().setTheme(theme);
	}
};

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
	setThemeToStore(mode.value);
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

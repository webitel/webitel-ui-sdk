<script setup>

import { ref } from 'vue';
import { useStore } from 'vuex';
import WtIcon from '../../../components/wt-icon/wt-icon.vue';
import WtSwitcher from '../../../components/wt-switcher/wt-switcher.vue';

const props = defineProps({
  namespace: {
    type: String,
    default: 'appearance',
  },
});

const store = useStore();

const mode = ref('light');

const setThemeToStore = (theme) => {
  store.dispatch(`${props.namespace}/SET_THEME`, theme);
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
  setThemeToStore(mode.value);
};

const toggleDarkMode = () => {
  if (mode.value === 'light') {
    setMode('dark');
  } else {
    setMode('light');
  }
  setThemeToStore(mode.value);
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
      :value="mode === 'dark'"
      @change="toggleDarkMode"
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

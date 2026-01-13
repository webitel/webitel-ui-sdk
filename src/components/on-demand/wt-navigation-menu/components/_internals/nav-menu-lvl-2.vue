<template>
  <ul class="nav-menu__category nav-menu-lvl-2">
    <li v-for="(category, key) of categories" :key="key" class="typo-body-1 nav-menu__option nav-menu__item nav-menu-lvl-2--inner">
      <span class="nav-menu-lvl-2__indicator" />
      <router-link :to="category.route" class="nav-menu-lvl-2__link">
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	categories: {
		type: Array,
		default: () => [],
	},
});
</script>

<style scoped>
@import '../../css/nav-menu.css';

.nav-menu-lvl-2 {
  overflow-y: auto;
}

.nav-menu-lvl-2__indicator {
  display: block;
  position: relative;
  width: var(--spacing-md);
  height: var(--spacing-md);
}

.nav-menu-lvl-2__indicator:after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: var(--text-main-color);
  width: var(--spacing-2xs);
  height: var(--spacing-2xs);
  content: '';
}

.nav-menu-lvl-2__link {
  color: var(--text-main-color);
  overflow-wrap: anywhere;
}

.nav-menu-lvl-2__link:hover,
.nav-menu-lvl-2__link:active {
  text-decoration: underline;
}
</style>

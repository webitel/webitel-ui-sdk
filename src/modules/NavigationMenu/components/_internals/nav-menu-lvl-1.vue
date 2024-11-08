<template>
  <ul class="nav-menu__category nav-menu-lvl-1">
    <li
      v-for="(category, key) of categories"
      :key="key"
      class="nav-menu__option"
    >
      <button
        :class="{ 'nav-menu-lvl-1__button--selected': selected.value === category.value }"
        class="nav-menu__item nav-menu-lvl-1__button"
        @click="select(category)"
      >
        <wt-icon
          :color="selected.value === category.value ? 'on-primary' : 'default'"
          :icon="getIcon(category.value)"
        />
        {{ category.name }}
      </button>
      <div v-show="selected.value === category.value">
        <slot />
      </div>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  selected: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['select']);

function select(category) {
  emit('select', category);
}

function getIcon(category) {
  switch (category) {
    case 'contact-center':
      return 'call-ringing';
    case 'customization':
      return 'system';
    default:
      return category;
  }
}
</script>

<style lang="scss" scoped>
@import '../../css/nav-menu';

.nav-menu-lvl-1__button {
  background: var(--secondary-color);

  &:hover {
    background: var(--secondary-hover-color);
  }

  &--selected {
    color: var(--primary-on-color);
    background: var(--primary-color);

    &:hover {
      color: var(--primary-on-color);
      background: var(--primary-color);
    }
  }
}
</style>

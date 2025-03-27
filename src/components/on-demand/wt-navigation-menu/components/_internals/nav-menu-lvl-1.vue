<template>
  <ul class="nav-menu__category nav-menu-lvl-1">
    <li
      v-for="(category, key) of categories"
      :key="key"
      class="nav-menu__option"
    >
      <button
        :class="{
          'nav-menu__item--selected': selected.value === category.value,
        }"
        class="nav-menu__item nav-menu__item--active"
        @click="select(category)"
      >
        <wt-icon
          :color="selected.value === category.value ? 'on-primary' : 'default'"
          :icon="icons.find((icon) => icon.includes(category.value))"
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
import { defineEmits,defineProps } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  selected: {
    type: Object,
    default: () => ({}),
  },
  icons: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['select']);

function select(category) {
  emit('select', category);
}
</script>

<style lang="scss" scoped>
@use '../../css/nav-menu';

.nav-menu__item {
  &--active {
    background: var(--secondary-color);

    &:hover {
      background: var(--secondary-hover-color);
    }
  }

  &--selected {
    background: var(--primary-color);
    color: var(--primary-on-color);

    &:hover {
      background: var(--primary-color);
      color: var(--primary-on-color);
    }
  }
}
</style>

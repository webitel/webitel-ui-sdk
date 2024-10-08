<template>
  <ul class="nav-menu__category nav-menu__category--lvl-1">
    <li
      v-for="(category, key) of categories"
      :key="key"
      class="nav-menu__category-option__wrapper"
    >
      <button
        :class="{ 'nav-menu__category-option--selected': selected.value === category.value }"
        class="nav-menu__category-option nav-menu__category-option--lvl-1"
        @click="select(category)"
      >
        <wt-icon
          :color="selected.value === category.value ? 'on-primary' : 'default'"
          :icon="category.value"
          icon-prefix="conf"
        />
        {{ category.name }}
      </button>
      <div>
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
</script>

<style lang="scss" scoped>
@import '../../css/navMenu';

.nav-menu__category-option--lvl-1 {
  background: var(--lvl-1-bg);
  text-transform: uppercase;
  padding: var(--spacing-xs) var(--spacing-sm);

  &:hover {
    background: var(--lvl-1-bg--hover);
  }

  &.nav-menu__category-option--selected {
    color: var(--lvl-1-text--selected);
    background: var(--lvl-1-bg--selected);
  }
}
</style>

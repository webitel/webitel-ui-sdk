<template>
  <p-divider
    :layout="variant"
  />
</template>

<script setup lang="ts">
import type { DividerProps } from 'primevue';
import { defineProps, withDefaults } from 'vue';

interface Props extends DividerProps {
  variant?: 'horizontal' | 'vertical';
}

withDefaults(defineProps<Props>(), {
  variant: 'horizontal',
});
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-divider {
  display: block;
  box-sizing: border-box;
  margin: 0;
  border-color: var(--divider-border-color);
  padding: 0;

  &-vertical {
    display: flex;
    position: relative;
    justify-content: center;
    border-top: 0;
    border-right: var(--divider-border-color) solid 1px;
    border-bottom: 0;
    border-left: 0;
    padding: var(--spacing-md) 0 0;
    width: 1px;
    min-height: 100%;
  }

  &-horizontal {
    border-top: var(--divider-border-color) solid 1px;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
    border-top-width: thin;
    width: 100%;
    max-width: 100%;
    height: 0;
    max-height: 0;
  }
}
</style>

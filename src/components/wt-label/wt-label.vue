<template>
  <label
    :class="{
      'wt-label--invalid': invalid,
      'wt-label--disabled': disabled,
      'wt-label--required': required,
    }"
    class="wt-label typo-subtitle-2"
  >
    <slot />

    <wt-hint v-if="hint">{{ hint }} </wt-hint>
  </label>
</template>

<script lang="ts" setup>
defineProps<{
	disabled?: boolean;
	invalid?: boolean;
	required?: boolean;
	hint?: string;
}>();
</script>

<style scoped>
.wt-label {
  display: flex;
  align-items: center;
  cursor: text;
  transition: var(--transition);
  color: var(--wt-label-color);
  padding: var(--wt-label-padding);
}

.wt-label--invalid {
  color: var(--wt-label-error-color);
}

.wt-label--disabled {
  color: var(--wt-label-disabled-color);
}

.wt-label--required::after {
  content: '*';
}

.wt-hint {
  margin-left: var(--spacing-2xs);
}
</style>

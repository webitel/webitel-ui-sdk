import { computed } from 'vue';

export const useInputControl = (input) => {
  const inputEl = computed(() => input.value?.$el?.querySelector('input'));

  const focus = () => inputEl.value?.focus() 

  // prevent double triggering
  const handleKeyup = (e) => e.stopPropagation();

  return { 
    focus,
    handleKeyup
  };
};
<template>
  <div 
    class="wt-checkbox__wrapper"
    v-bind="attrs"
    @click="inputHandler"
  >
    <p-checkbox
      v-model="_selected"
      :disabled="disabled"
      :value="value"
      :binary="isSingle"
      @click.stop
    />
    <!-- @slot Custom label markup -->
    <slot
      name="label"
      v-bind="{ label, isChecked, disabled }"
    >
      <div
        v-if="label"
        class="wt-checkbox__label"
      >
        {{ label }}
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxProps } from 'primevue/checkbox';
import { computed, defineEmits, defineProps, useAttrs } from 'vue';

interface WtCheckboxProps extends CheckboxProps {
  value?: string | boolean;
  selected?: boolean | string[];
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<WtCheckboxProps>(), {
  value: '',
  selected: () => [],
  label: '',
  disabled: false,
});

const emit = defineEmits(['change']);

const attrs = useAttrs();

const _selected = computed({
  get: () => props.selected,
  set: () => inputHandler(),
});

const isSingle = computed(() => typeof props.selected === 'boolean');

const isChecked = computed(() => {
  if (isSingle.value) {
    return props.selected;
  }
  return props.selected.includes(props.value);
});

const inputHandler = () => {
  if (isSingle.value) {
    emit('change', !props.selected);
  } else {
    let selected = [...props.selected];
    if (selected.includes(props.value)) {
      selected = selected.filter((value) => value !== props.value);
    } else {
      selected.push(props.value);
    }
    emit('change', selected);
  }
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-checkbox__wrapper {
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
}

.wt-checkbox__label {
  transition: var(--transition);
  cursor: pointer;
  margin-left: var(--checkbox-icon-margin);
}
</style>

<template>
  <div 
    class="wt-checkbox"
  >
    <p-checkbox
      v-model="model"
      :input-id="checkboxId"
      :disabled="disabled"
      :value="value"
      :binary="isSingle"
      @change="inputHandler"
    />
    <wt-label 
      v-if="label"
      :for="checkboxId"
      :disabled="disabled"
    >
      <!-- @slot Custom label markup -->
      <slot
        name="label"
        v-bind="{ label, isChecked, disabled }"
      >
        <div
          class="wt-checkbox__label"
        >
          {{ label }}
        </div>
      </slot>
    </wt-label>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxProps } from 'primevue/checkbox';
import { computed, defineModel, defineProps } from 'vue';

interface WtCheckboxProps extends CheckboxProps {
  value?: string | boolean;
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<WtCheckboxProps>(), {
  value: '',
  label: '',
  disabled: false,
});

const model = defineModel<boolean | string[]>('show', {required: true});

const checkboxId = `checkbox-${Math.random().toString(36).slice(2, 11)}`;

const isSingle = computed(() => typeof model.value === 'boolean');

const isChecked = computed(() => {
  if (isSingle.value) {
    return model.value;
  }
  return model.value.includes(props.value);
});

const inputHandler = () => {
  if (isSingle.value) {
    model.value = !model.value;
  } else {
    const selected = [...model.value];
    if (selected.includes(props.value)) {
      model.value = selected.filter((value) => value !== props.value);
    } else {
      model.value.push(props.value);
    }
  }
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-checkbox {
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

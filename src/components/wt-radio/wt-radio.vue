<template>
  <div 
    class="wt-radio"
  >
    <p-radio
      v-model="model"
      :input-id="radioId"
      :disabled="disabled"
      :value="value"
    />
    <wt-label 
      v-if="label"
      :for="radioId"
      :disabled="disabled"
    >
      <!-- @slot Custom label markup -->
      <slot
        name="label"
        v-bind="{ label, isChecked, disabled }"
      >
        <div
          class="wt-radio__label"
        >
          {{ label }}
        </div>
      </slot>
    </wt-label>
  </div>
</template>

<script setup lang="ts">
import type { RadioButtonProps } from 'primevue/radiobutton';
import { computed, defineModel, defineProps } from 'vue';

interface WtRadioProps extends RadioButtonProps {
  // value, set by radio
  value: string | number | boolean | object;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  outline?: boolean;
}

const props = withDefaults(defineProps<WtRadioProps>(), {
  label: '',
  required: false,
  disabled: false,
  outline: false,
});

const model = defineModel<string | number | boolean | object>('selected', {required: true});

const radioId = `radio-${Math.random().toString(36).slice(2, 11)}`;

const isChecked = computed(() => {
  return props.value === model.value;
});
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-radio {
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
}

.wt-radio__label {
  transition: var(--transition);
  cursor: pointer;
  margin-left: var(--radio-icon-margin);
}
</style>

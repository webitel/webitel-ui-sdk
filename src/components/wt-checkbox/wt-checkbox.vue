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
    >
      <template #icon>
        <span class="wt-checkbox__checkmark">
          <wt-icon
            :color="iconColor"
            :icon="checkboxIcon"
            style="width: 14px; height: 14px;"
          />
        </span>
      </template>
    </p-checkbox>
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

const model = defineModel<boolean | string[]>('selected', {required: true});

const checkboxId = `checkbox-${Math.random().toString(36).slice(2, 11)}`;

const isSingle = computed(() => typeof model.value === 'boolean');

const isChecked = computed(() => {
  if (isSingle.value) {
    return model.value;
  }
  return model.value.includes(props.value);
});

const checkboxIcon = computed(() => {
  return isChecked.value ? 'tick' : '';
})

const iconColor = computed(() => {
  if (props.disabled) return 'disabled';
  if (isChecked.value) return 'active';
  return null;
})
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

.wt-checkbox__checkmark {
  display: inline-flex
}

.wt-checkbox__label {
  transition: var(--transition);
  cursor: pointer;
  margin-left: var(--checkbox-icon-margin);
}
</style>

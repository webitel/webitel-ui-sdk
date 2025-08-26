<template>
  <div
    class="wt-checkbox"
  >
    <p-checkbox
      v-model="model"
      :binary="isSingle"
      :disabled="disabled"
      :input-id="checkboxId"
      :value="value"
    >
      <template #icon>
        <span class="wt-checkbox__checkmark">
          <wt-icon
            :color="iconColor"
            :icon="checkboxIcon"
          />
        </span>
      </template>
    </p-checkbox>
    <wt-label
      :disabled="disabled"
      :for="checkboxId"
    >
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
    </wt-label>
  </div>
</template>

<script lang="ts" setup>
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

const isSingle = computed(() => !Array.isArray(model.value));

const isChecked = computed(() => {
  if (isSingle.value) {
    return model.value;
  }
  return model.value.includes(props.value);
});

const checkboxIcon = computed(() => {
  return isChecked.value ? 'checkbox-tick' : '';
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
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
}

.wt-checkbox__checkmark {
  display: inline-flex;
}

.wt-checkbox__label {
  margin-left: var(--checkbox-icon-margin);
  cursor: pointer;
  transition: var(--transition);
}
</style>

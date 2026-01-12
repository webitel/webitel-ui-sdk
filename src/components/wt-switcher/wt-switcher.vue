<template>
  <div
    class="wt-switcher typo-subtitle-2"
    :class="{ 'wt-switcher--label-left': labelLeft }"
  >
    <p-toggle-switch
      :key="switcherKey"
      :model-value="model"
      :input-id="switcherId"
      :disabled="disabled"
      @update:model-value="handleSwitcherClick"
    />
    <wt-label
      v-if="hasLabel"
      :disabled="disabled"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label, value, disabled }"
      >
        <div
          v-if="label"
          class="wt-switcher__label typo-subtitle-2"
        >
          {{ label }}
        </div>
      </slot>
    </wt-label>
  </div>
</template>

<script setup lang="ts">
import { ToggleSwitchProps } from 'primevue/toggleswitch';
import { computed, defineEmits, defineModel, defineProps,
          nextTick, ref, useSlots, withDefaults } from 'vue';

interface LabelProps {
  [key: string]: any;
}

interface Props extends ToggleSwitchProps {
  label?: string;
  labelLeft?: boolean;
  disabled?: boolean;
  labelProps?: LabelProps;
  controlled?: boolean;  // for controlled mode, when need to sync visual state with model
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  labelLeft: false,
  disabled: false,
  labelProps: () => ({}),
  controlled: false
});

const model = defineModel<boolean>();
const switcherKey = ref(0);

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const hasLabel = computed(() => {
  return props.label || slots.label;
});

const switcherId = `switcher-${Math.random().toString(36).slice(2, 11)}`;

const handleSwitcherClick = () => {
  if (props.controlled) {
    nextTick(() => {
      switcherKey.value++
    })
  }
  emit('update:modelValue', !model.value);
}
</script>

<style  scoped>
.wt-switcher {
position: relative;
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.wt-switcher .wt-switcher.wt-switcher--label-left {
flex-direction: row-reverse;
}

.wt-label {
font-family: 'Montserrat', monospace;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  text-transform: none;
}

.wt-switcher__label {
user-select: none;
  transition: var(--transition);
  .wt-switcher--label-left .wt-label {
    margin-left: 0;
  }
}
</style>

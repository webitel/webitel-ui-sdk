<template>
  <div
    class="wt-switcher"
    :class="{ 'wt-switcher--label-left': labelLeft }"
  >
    <p-toggle-switch
      v-model="model"
      :input-id="switcherId"
      :disabled="disabled"
    />
    <wt-label
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
          class="wt-switcher__label"
        >
          {{ label }}
        </div>
      </slot>
    </wt-label>
  </div>
</template>

<script setup lang="ts">
import { ToggleSwitchProps } from 'primevue/toggleswitch';
import { defineModel, defineProps, withDefaults } from 'vue';

interface LabelProps {
  [key: string]: any;
}

interface Props extends ToggleSwitchProps {
  label?: string;
  labelLeft?: boolean;
  disabled?: boolean;
  labelProps?: LabelProps;
}

withDefaults(defineProps<Props>(), {
  label: '',
  labelLeft: false,
  disabled: false,
  labelProps: () => ({}),
});

const model = defineModel<boolean>();

const switcherId = `switcher-${Math.random().toString(36).slice(2, 11)}`;
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-switcher {
  position: relative;
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;

  &.wt-switcher--label-left {
    flex-direction: row-reverse;
  }
}

.wt-label {
  @extend %typo-subtitle-2;
}

.wt-switcher__label {
  @extend %typo-subtitle-2;
  user-select: none;
  transition: var(--transition);

  .wt-switcher--label-left & {
    margin-left: 0;
  }
}
</style>

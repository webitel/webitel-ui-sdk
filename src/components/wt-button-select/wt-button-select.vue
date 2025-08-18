<template>
  <div
    ref="buttonSelect"
    v-clickaway="atClickaway"
    class="wt-button-select"
  >
    <wt-button
      :color="color"
      :disabled="disabled"
      class="wt-button-select__button"
      v-bind="$attrs"
      @click="$emit('click', $event)"
    >
      <slot />
    </wt-button>

    <wt-context-menu
      :disabled="disabled"
      :options="options"
      :visible="isOpened"
      :tooltip-triggers="[]"
      @click="selectOption"
    >
      <template #activator="{ toggle, show }">
        <wt-button
          :color="color"
          :disabled="disabled"
          :loading="false"
          class="wt-button-select__select-btn"
          v-bind="$attrs"
          @click="toggleContextMenu(toggle, $event)"
        >
          <wt-icon
            :class="{ 'wt-button-select__select-arrow--active': isOpened }"
            :color="color === 'primary' ? 'on-primary' : 'default'"
            :disabled="disabled"
            class="wt-button-select__select-arrow"
            icon="arrow-down"
          />
        </wt-button>
      </template>
    </wt-context-menu>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue';

const props = defineProps({
  /**
   * See context-menu component docs
   */
  options: {
    type: Array,
    required: true,
  },
  /**
   * @values 'primary', 'secondary'
   * @example <wt-button color="secondary"></wt-button>
   */
  color: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  /**
   * @event click
   */
  'click',
  /**
   * Click on option in context-menu
   *
   * @event click:option
   *
   * @property {object} option clicked option object
   * @property {index} index clicked option index in options list
   */
  'click:option',
]);

const isOpened = ref(false);
const buttonSelect = useTemplateRef('buttonSelect');

const selectOption = ({ option, index }) => {
  emit('click:option', option, index);
  isOpened.value = false;
};

const atClickaway = () => {
  isOpened.value = false;
};

const toggleContextMenu = (toggle, e) => {
  isOpened.value = !isOpened.value;
  // The menu is positioned relative to `buttonSelect` (reference button).
  // If not provided, it defaults to centering on the trigger button (`e`).
  // https://webitel.atlassian.net/browse/WTEL-7349
  toggle(e, buttonSelect.value)
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-button-select {
  display: inline-flex;
  position: relative;
  align-items: center;
  gap: var(--button-select-buttons-gap);

  .wt-button-select__button {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    padding: var(--button-select-button-padding);
  }

  .wt-button-select__select-btn {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    padding: var(--button-select-icon-button-padding);
    min-width: auto;

    // OPEN AND SHUT ARROW
    .wt-button-select__select-arrow {
      display: flex;
      transform: rotate(0);

      &--active {
        transform: rotate(180deg);
      }
    }
  }
}
</style>

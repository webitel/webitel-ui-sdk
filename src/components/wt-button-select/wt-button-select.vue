<template>
  <div
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
      :options="options"
      :visible="isOpened"
      @click="selectOption"
    >
      <template #activator>
        <wt-button
          :color="color"
          :disabled="disabled"
          :loading="false"
          class="wt-button-select__select-btn"
          v-bind="$attrs"
          @click="isOpened = !isOpened"
        >
          <wt-icon
            :class="{'wt-button-select__select-arrow--active': isOpened}"
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
import { ref } from 'vue';

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

function selectOption({ option, index }) {
  emit('click:option', option, index);
  isOpened.value = false;
}

function atClickaway() {
  isOpened.value = false;
}

</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-button-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--button-select-buttons-gap);
}

.wt-button-select__button {
  padding: var(--button-select-button-padding);
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

button.wt-button-select__select-btn {
  min-width: auto;
  padding: var(--button-select-icon-button-padding);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;

  // OPEN AND SHUT ARROW
  .wt-button-select__select-arrow {
    display: flex;
    transform: rotate(0);

    &--active {
      transform: rotate(180deg);
    }
  }
}
</style>

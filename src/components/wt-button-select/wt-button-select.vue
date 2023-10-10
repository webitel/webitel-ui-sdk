<template>
  <div
    class="wt-button-select"
    v-clickaway="away"
  >

    <wt-button
      v-bind="$attrs"
      class="wt-button-select__button"
      :color="color"
      :disabled="disabled"
      @click="$emit('click', $event)"
    >
      <slot></slot>
    </wt-button>

    <wt-context-menu
      :options="options"
      :visible="isOpened"
      @click="selectOption"
    >
      <template v-slot:activator>
        <wt-button
          v-bind="$attrs"
          class="wt-button-select__select-btn"
          :color="color"
          :disabled="disabled"
          :loading="false"
          @click="isOpened = !isOpened"
        >
          <wt-icon
            class="wt-button-select__select-arrow"
            :class="{'wt-button-select__select-arrow--active': isOpened}"
            icon="arrow-down"
            :color="color === 'primary' ? 'on-primary' : 'default'"
            :disabled="disabled"
          ></wt-icon>
        </wt-button>
      </template>
    </wt-context-menu>
  </div>
</template>

<script>
export default {
  name: 'wt-button-select',
  data: () => ({
    isOpened: false,
  }),
  props: {
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
  },
  emits: [
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
  ],
  methods: {
    selectOption({ option, index }) {
      this.$emit('click:option', option, index);
      this.isOpened = false;
    },
    away() {
      this.isOpened = false;
    },
  },
};
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

.wt-button-select__select-btn {
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

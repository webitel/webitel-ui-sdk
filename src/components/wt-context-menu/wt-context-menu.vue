<template>
  <wt-tooltip
    :triggers="['click', 'touch']"
    :visible="visible"
    :disabled="disabled"
    class="wt-context-menu"
    placement="bottom-end"
    popper-class="wt-context-menu__floating-wrapper"
    @update:visible="visible = $event"
  >
    <template #activator>
      <slot name="activator" />
    </template>
    <template #default="{ hide }">
      <ul
        :style="`width: ${width}; min-width: ${minWidth}; max-width: ${maxWidth};`"
        class="wt-context-menu__menu"
      >
        <li
          v-for="(option, index) of options"
          :key="index"
          class="wt-context-menu__option-wrapper"
        >
          <a
            :class="[
              { 'wt-context-menu__option--disabled': option.disabled },
            ]"
            class="wt-context-menu__option"
            href="#"
            @click.prevent="handleOptionClick({ option, index, hide })"
          >
            <slot
              name="option"
              v-bind="option"
            >
              {{ option.text || option }}
            </slot>
          </a>
        </li>
      </ul>
    </template>
  </wt-tooltip>
</template>

<script setup>
  const props = defineProps({
    options: {
      type: Array,
      required: true,
      description: '[{ text, disabled, ... anything you need }]',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String],
      default: 'auto',
    },
    minWidth: {
      type: [String],
      default: '160px',
    },
    maxWidth: {
      type: [String],
      default: '300px',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits([
    'click',
    'update:visible'
  ]);

  function handleOptionClick({ option, index, hide }) {
    emit('click', { option, index });
    hide();
  }
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';

.wt-context-menu {
  line-height: 0;

  &.wt-tooltip :deep(.wt-context-menu__floating-wrapper) {
    padding: 0;
  }
}

.wt-context-menu__menu {
  @extend %typo-body-2;
  z-index: 1;
  transition: var(--transition);
  border-radius: var(--border-radius);
  background-color: var(--wt-context-menu-background-color);
  box-shadow: var(--box-shadow);
}

.wt-context-menu__option-wrapper {
  &:first-of-type {
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }

  &:only-of-type {
    border-radius: var(--border-radius);
  }
}

.wt-context-menu__option {
  display: block;
  padding: var(--wt-context-menu-option-padding);
  cursor: pointer;
  transition: var(--transition);
  color: var(--wt-context-menu-option-text-color);

  &:hover {
    background-color: var(--wt-context-menu-option-background-hover-color);
  }

  &--disabled {
    pointer-events: none;
    color: var(--wt-context-menu-option-text-disabled-color);
    background-color: var(--wt-context-menu-option-background-disabled-color);
  }
}
</style>

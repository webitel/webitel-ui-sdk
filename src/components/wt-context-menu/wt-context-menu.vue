<template>
  <wt-tooltip
    class="wt-context-menu"
    :visible="visible"
    :triggers="['click', 'touch']"
    placement="bottom-end"
    popper-class="wt-context-menu__floating-wrapper"
  >
    <template #activator>
      <slot name="activator" />
    </template>
    <template #default="{ hide }">
      <ul
        class="wt-context-menu__menu"
        :style="`width: ${width}; min-width: ${minWidth}; max-width: ${maxWidth};`"
      >
        <li
          v-for="(option, index) of options"
          :key="index"
          class="wt-context-menu__option-wrapper"
        >
          <!--      <a> click.prevent prevents redirect to # -->
          <a
            :class="[
              { 'wt-context-menu__option--disabled': option.disabled },
            ]"
            class="wt-context-menu__option"
            href="#"
            @click.prevent="handleOptionClick({ option, index, hide })"
          >
            <slot
              v-bind="option"
              name="option"
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
});

const emit = defineEmits([
  'click',
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

.wt-context-menu {
  line-height: 0;

  &.wt-tooltip :deep(.wt-context-menu__floating-wrapper) {
    padding: 0;
  }
}

.wt-context-menu__menu {
  @extend %typo-body-2;
  background-color: var(--wt-context-menu-background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  z-index: 1;
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
  color: var(--wt-context-menu-option-text-color);

  &:hover {
    background-color: var(--wt-context-menu-option-hover-color);
    transition: var(--transition);
  }

  &--disabled {
    pointer-events: none;
    color: var(--wt-context-menu-option-text-disabled-color);
    background-color: var(--wt-context-menu-option-background-disabled-color);
  }
}
</style>

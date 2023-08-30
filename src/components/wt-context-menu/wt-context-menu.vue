<template>
  <wt-tooltip
    class="wt-context-menu"
    :visible="visible"
    :triggers="['click', 'touch']"
    placement="bottom-end"
    popper-class="wt-context-menu__floating-wrapper"
  >
    <template v-slot:activator>
      <slot name="activator"></slot>
    </template>
    <template v-slot:default="{ hide }">
      <ul
        class="wt-context-menu__menu"
        :style="`width: ${width}; min-width: ${minWidth}; max-width: ${maxWidth};`"
      >
        <li
          class="wt-context-menu__option-wrapper"
          v-for="(option, index) of options"
          :key="index"
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
            <slot name="option" v-bind="option">
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

<style lang="scss" scoped>
@import './variables.scss';

.wt-context-menu {
  line-height: 0;

  &.wt-tooltip :deep(.wt-context-menu__floating-wrapper) {
    padding: 0;
  }
}

.wt-context-menu__menu {
  @extend %typo-body-2;
  background-color: var(--context-menu-background-color);
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
  padding: var(--context-menu-option-padding);
  cursor: pointer;

  &:hover {
    background-color: var(--context-menu-option-color--hover);
    transition: var(--transition);
  }

  &--disabled {
    pointer-events: none;
    color: var(--context-menu-option-color--disabled);
  }
}
</style>

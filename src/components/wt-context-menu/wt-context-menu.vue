<template>
  <div class="wt-context-menu">
    <slot
      name="activator"
      v-bind="{ toggle }"
    />

    <wt-popover
      ref="popover"
      :visible="visible"
      :disabled="disabled"
      unstyled
      placement="bottom-end"
      class="wt-context-menu__floating-wrapper"
    >
      <template #default>
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
              :class="[{ 'wt-context-menu__option--disabled': option.disabled }]"
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
    </wt-popover>
  </div>
</template>

<script setup>
import {useTemplateRef} from "vue";

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
  tooltipTriggers: {
    type: Array,
    default: () => ['click', 'touch'],
  },
});

const emit = defineEmits(['click', 'update:visible']);
const popover = useTemplateRef('popover');

function handleOptionClick({ option, index, hide }) {
  emit('click', { option, index });
  hide();
}

const toggle = (event) => {
  popover.value.toggle(event);
};

const hide = () => {
  popover.value.hide()
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

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
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  background-color: var(--wt-context-menu-background-color);
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
  transition: var(--transition);
  cursor: pointer;
  padding: var(--wt-context-menu-option-padding);
  color: var(--wt-context-menu-option-text-color);

  &:hover {
    background-color: var(--wt-context-menu-option-background-hover-color);
  }

  &--disabled {
    background-color: var(--wt-context-menu-option-background-disabled-color);
    pointer-events: none;
    color: var(--wt-context-menu-option-text-disabled-color);
  }
}
</style>

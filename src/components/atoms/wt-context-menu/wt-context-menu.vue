<template>
  <v-dropdown
    class="wt-context-menu"
    :shown="visible"
    :triggers="['click', 'touch']"
    placement="bottom-end"
  >
    <slot name="activator"></slot>
    <template #popper="{ hide }">
      <ul
        class="wt-context-menu__menu"
        :style="`width: ${width}; min-width: ${minWidth}; max-width: ${maxWidth};`"
      >
        <li
          class="wt-context-menu__option-wrapper"
          v-for="(option, index) in options"
          :key="index"
        >
          <!--      <a> click.prevent prevents redirect to # -->
          <a
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
  </v-dropdown>
</template>

<script>
export default {
  name: 'wt-context-menu',
  props: {
    options: {
      type: Array,
      required: true,
      description: '[{ text }] or [\'str\']',
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
  },
  methods: {
    handleOptionClick({ option, index, hide }) {
      this.$emit('click', { option, index });
      hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-context-menu {
  line-height: 0;
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
  &:hover {
    background-color: var( --context-menu-option-color--hover);
    transition: var(--transition);
  }
}

.wt-context-menu__option {
  display: block;
  padding: var(--context-menu-option-padding);
  cursor: pointer;
}
</style>

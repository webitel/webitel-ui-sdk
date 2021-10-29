<!-- eslint-disable -->
<template>
  <i
    class="wt-icon"
    :class="[
       `wt-icon--size-${size}`,
       `wt-icon--color-${color}`,
       { 'wt-icon--disabled': disabled }
     ]"
  >
    <svg
      class="wt-icon__icon"
      :viewBox="viewBox"
    >
      <use :xlink:href="iconName"></use>
    </svg>
  </i>
</template>

<script>
export default {
  name: 'wt-icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
    },
    color: {
      type: String,
      default: 'default',
      options: ['default', 'contrast', 'active', 'disabled', 'success', 'danger', 'transfer', 'hold'],
    },
    iconPrefix: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconName() {
      // let name = '#_icon';
      // if (this.iconPrefix) name += `-${this.iconPrefix}`;
      // return `${name}-${this.icon}--${this.size}`;
      let name = '#';
      if (this.iconPrefix) name += `${this.iconPrefix}-`;
      return `${name}${this.icon}`;
    },
    viewBox() {
      switch (this.size) {
        case 'sm': return '0 0 16 16';
        case 'md': return '0 0 24 24';
        case 'lg': return '0 0 32 32';
        case 'xl': return '0 0 40 40';
        default: return '0 0 24 24';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);

  /*svg instead of .icon to override styles by .icon-icon-name-size without any other seelectors*/
  svg {
    display: block;
    width: 100%;
    height: 100%;
    stroke-width: 0;
    fill: var(--icon-color);
    transition: var(--transition);
  }
}

.wt-icon--color {
  &-default .wt-icon__icon {
    fill: var(--icon-color);
  }

  &-accent .wt-icon__icon {
    fill: var(--icon-color-accent);
  }

  &-contrast .wt-icon__icon {
    fill: var(--icon-color-contrast);
  }

  &-active .wt-icon__icon {
    fill: var(--icon-color-active);
  }

  &-success .wt-icon__icon {
    fill: var(--icon-color-success);
  }

  &-danger .wt-icon__icon {
    fill: var(--icon-color-danger);
  }

  &-transfer .wt-icon__icon {
    fill: var(--icon-color-transfer);
  }

  &-hold .wt-icon__icon {
    fill: var(--icon-color-hold);
  }

  &-disabled .wt-icon__icon {
    fill: var(--icon-color-disabled);
  }
}

.wt-icon.wt-icon--disabled .wt-icon__icon {
  fill: var(--icon-color-disabled);
}

.wt-icon--size {
  &-xl {
    width: var(--icon-xl-size);
    height: var(--icon-xl-size);
  }

  &-lg {
    width: var(--icon-lg-size);
    height: var(--icon-lg-size);
  }

  &-md {
    width: var(--icon-md-size);
    height: var(--icon-md-size);
  }

  &-sm {
    width: var(--icon-sm-size);
    height: var(--icon-sm-size);
  }
}
</style>

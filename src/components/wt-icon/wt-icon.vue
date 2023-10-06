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
    <svg class="wt-icon__icon">
      <use :xlink:href="iconName"></use>
    </svg>
  </i>
</template>

<script>

export default {
  name: 'wt-icon',
  props: {
    /**
     * Icon name
     * @example '<wt-icon icon="close"></wt-icon>'
     */
    icon: {
      type: String,
      required: true,
    },
    /**
     * @values sm (16px), md (24px), lg (32px), xl (40px)
     * @example '<wt-icon icon="close" size="sm"></wt-icon>'
     */
    size: {
      type: String,
      default: 'md',
    },
    /**
     *Icon colors. Attention! Hover color is changing only for "default color"
     * @values default, contrast, active, disabled, success, danger, transfer, hold, secondary-50
     */
    color: {
      type: String,
      default: 'default',
    },
    /**
     * inserts icon name prefix between "icon" and actual icon name ("icon" prop).
     * Useful for library icons extension with project-level icons with this prefix in name
     */
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
      let name = '#';
      if (this.iconPrefix) name += `${this.iconPrefix}-`;
      return `${name}${this.icon}`;
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);
}

/*svg instead of .icon to override styles by .icon-icon-name-size without any other seelectors*/
svg {
  display: block;
  width: 100%;
  height: 100%;
  stroke-width: 0;
  fill: var(--icon-color);
  transition: var(--transition);
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

  &-secondary .wt-icon__icon {
    fill: var(--secondary-color);
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

  &-job .wt-icon__icon {
    fill: var(--job-color);
  }

  &-hold .wt-icon__icon {
    fill: var(--icon-color-hold);
  }

  &-secondary-50 .wt-icon__icon {
    fill: var(--icon-color-secondary-50);
  }

  &-icon-secondary .wt-icon__icon {
    fill: var(--icon-color-secondary);
  }

  &-disabled .wt-icon__icon {
    fill: var(--icon-color-disabled);
  }
}

.wt-icon.wt-icon--disabled .wt-icon__icon {
  fill: var(--icon-color-disabled);
}

.wt-icon--size {
  &-3xl {
    width: var(--icon-3xl-size);
    height: var(--icon-3xl-size);
  }

  &-2xl {
    width: var(--icon-2xl-size);
    height: var(--icon-2xl-size);
  }

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

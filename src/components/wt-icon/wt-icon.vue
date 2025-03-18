<template>
  <i
    :class="[
      `wt-icon--size-${size}`,
      `wt-icon--color-${color}`,
      { 'wt-icon--disabled': disabled },
    ]"
    class="wt-icon"
  >
    <svg class="wt-icon__icon">
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  /**
   * Icon name
   * @example '<wt-icon icon="close"></wt-icon>'
   */
  icon: {
    type: String,
    required: true,
  },
  /**
   * @values xs, sm (16px), md (24px), lg (32px), xl (40px), 2xl, 3xl
   * @example '<wt-icon icon="close" size="sm"></wt-icon>'
   */
  size: {
    type: String,
    default: 'md',
  },
  /**
   * @values 'default', 'active', 'disabled', 'primary', 'error', 'success', 'warning', 'on-dark', 'on-light', 'on-primary', 'info', 'chat', 'transfer', 'job'
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
});

const iconName = computed(() => {
  let name = '#';
  if (props.iconPrefix) name += `${props.iconPrefix}-`;
  return `${name}${props.icon}`;
});
</script>

<style lang="scss">
@use './variables.scss';
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
  transition: var(--transition);
  width: 100%;
  height: 100%;
  stroke-width: 0;
  fill: var(--icon-color);
}

.wt-icon--color {
  &-default .wt-icon__icon {
    fill: var(--icon-color);
  }

  &-active .wt-icon__icon {
    fill: var(--icon-active-color);
  }

  &-primary .wt-icon__icon {
    fill: var(--icon-primary-color);
  }

  &-error .wt-icon__icon {
    fill: var(--icon-error-color);
  }

  &-success .wt-icon__icon {
    fill: var(--icon-success-color);
  }

  &-warning .wt-icon__icon {
    fill: var(--icon-warning-color);
  }

  &-on-dark .wt-icon__icon {
    fill: var(--icon-on-dark-color);
  }

  &-on-light .wt-icon__icon {
    fill: var(--icon-on-light-color);
  }

  &-on-primary .wt-icon__icon {
    fill: var(--icon-on-primary-color);
  }

  &-info .wt-icon__icon {
    fill: var(--icon-info-color);
  }

  &-chat .wt-icon__icon {
    fill: var(--icon-chat-color);
  }

  &-transfer .wt-icon__icon {
    fill: var(--icon-transfer-color);
  }

  &-job .wt-icon__icon {
    fill: var(--icon-job-color);
  }

  &-disabled .wt-icon__icon {
    fill: var(--icon-disabled-color);
  }
}

.wt-icon--disabled .wt-icon__icon {
  fill: var(--icon-disabled-color);
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

  &-xs {
    width: var(--icon-xs-size);
    height: var(--icon-xs-size);
  }
}
</style>

<template>
  <article
    class="wt-notification"
    @click="$emit('close')"
  >
    <wt-icon
      :color="notificationIconColor"
      :icon="notificationIcon"
      class="wt-notification__icon"
    />

    <p class="wt-notification__text">
      <slot />
    </p>
  </article>
</template>

<script>
export default {
  name: 'WtNotification',
  props: {
    type: {
      type: String,
      default: 'success',
    },
  },
  computed: {
    notificationIcon() {
      switch (this.type) {
        case 'info':
          return 'rounded-info';
        case 'error':
          return 'attention';
        case 'warning':
          return 'attention';
        case 'success':
          return 'done';
        default:
          return '';
      }
    },
    notificationIconColor() {
      return this.type || '';
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-notification {
  @extend %typo-body-1;
  position: relative;

  display: flex;
  align-items: flex-start;
  width: fit-content;
  min-width: var(--wt-notification-min-width);
  max-width: var(--wt-notification-max-width);
  padding: var(--wt-notification-padding);
  cursor: pointer;
  color: var(--wt-notification-text-color);
  border-radius: var(--border-radius);
  background: var(--wt-notification-bg-color);
  box-shadow: var(--elevation-1);
}

.wt-notification__icon {
  flex: 0 0 var(--icon-md-size);
  margin-right: var(--wt-notification-icon-margin);
}

.wt-notification__text {
  align-self: center;
  flex-grow: 1;
  margin: 0;
}
</style>

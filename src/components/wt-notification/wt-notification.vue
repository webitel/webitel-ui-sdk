<template>
  <article
    class="wt-notification"
    @click="$emit('close')"
  >
    <wt-icon
      class="wt-notification__icon"
      :icon="notificationIcon"
      :color="notificationIconColor"
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
      default: 'info',
    },
  },
  computed: {
    notificationIcon() {
      switch (this.type) {
        case 'info':
          return 'done';
        case 'error':
          return 'attention';
        default:
          return '';
      }
    },
    notificationIconColor() {
      switch (this.type) {
        case 'info':
          return 'success';
        case 'error':
          return 'error';
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-notification {
  @extend %typo-body-1;
  @include width-fit-content;

  position: relative;
  display: flex;
  align-items: flex-start;
  min-width: var(--wt-notification-min-width);
  max-width: var(--wt-notification-max-width);
  padding: var(--wt-notification-padding);
  color: var(--wt-notification-text-color);
  background: var(--wt-notification-bg-color);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-1);
  cursor: pointer;
}

.wt-notification__icon {
  flex: 0 0 var(--icon-md-size);
  margin-right: var(--wt-notification-icon-margin);
}

.wt-notification__text {
  flex-grow: 1;
  align-self: center;
  margin: 0;
}
</style>

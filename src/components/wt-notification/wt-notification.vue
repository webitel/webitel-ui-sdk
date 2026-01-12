<template>
  <article class="wt-notification typo-body-1" @click="$emit('close')">
    <wt-icon :color="notificationIconColor" :icon="notificationIcon" class="wt-notification__icon" />

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

<style scoped>
.wt-notification {
  display: flex;
  position: relative;
  align-items: flex-start;
  cursor: pointer;
  box-shadow: var(--elevation-1);
  border-radius: var(--border-radius);
  background: var(--wt-notification-bg-color);
  padding: var(--wt-notification-padding);
  width: fit-content;
  min-width: var(--wt-notification-min-width);
  max-width: var(--wt-notification-max-width);
  color: var(--wt-notification-text-color);
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

<template>
  <aside class="wt-notifications-bar">
    <transition-group
      name="wt-notifications-transition"
      tag="div"
    >
      <wt-notification
        v-for="(notification, key) of notifications"
        :key="key+notification.text"
        :type="notification.type"
        @close="closeNotification(notification)"
      >
        {{ notification.text }}
      </wt-notification>
    </transition-group>
  </aside>
</template>

<script>
export default {
  name: 'WtNotificationsBar',
  inject: ['$eventBus'],
  data: () => ({
    notificationDuration: 4000,
    notifications: [],
  }),
  created() {
    try {
      this.$eventBus.$on('notification', this.showNotification);
    } catch (err) {
      console.error('wt-notifications-bar cannot work without globally registered eventBus', err);
    }
  },
  unmounted() {
    this.$eventBus.$off('notification', this.showNotification);
  },
  methods: {
    showNotification(notification) {
      this.notifications.unshift(notification);
      setTimeout(() => this.closeNotification(notification), this.notificationDuration);
    },
    closeNotification(notification) {
      const index = this.notifications.indexOf(notification);
      this.notifications.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-notifications-bar {
  @extend %wt-scrollbar;

  position: fixed;
  top: var(--notifications-bar-corner-margin);
  right: var(--notifications-bar-corner-margin);
  max-height: var(--notifications-bar-max-height);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: var(--notifications-bar-z-index);

  .wt-notification {
    margin: var(--notifications-bar-notifications-margin);
  }
}

.wt-notifications-transition-enter-active,
.wt-notifications-transition-leave-active {
  transition: all var(--transition);
}

.wt-notifications-transition-enter,
.wt-notifications-transition-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
</style>

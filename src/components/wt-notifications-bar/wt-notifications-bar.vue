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
      setTimeout(
        () => this.closeNotification(notification),
        notification.timeout * 1000 || this.notificationDuration,
      );
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
@import '../../../src/css/main.scss';

.wt-notifications-bar {
  @extend %wt-scrollbar;

  position: fixed;
  z-index: var(--notifications-bar-z-index);
  top: var(--notifications-bar-corner-margin);
  right: var(--notifications-bar-corner-margin);
  overflow-x: hidden;
  overflow-y: auto;
  max-height: var(--notifications-bar-max-height);

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
  transform: translateX(60px);
  opacity: 0;
}
</style>

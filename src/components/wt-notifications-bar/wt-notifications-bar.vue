<template>
  <aside class="wt-notifications-bar">
    <transition-group
      name="wt-notifications-transition"
      tag="div"
    >
      <wt-notification
        v-for="(notification, key) of notifications"
        :key="key + notification.text"
        :type="notification.type"
        @close="closeNotification(notification)"
      >
        {{ notification.text }}
      </wt-notification>
    </transition-group>
  </aside>
</template>

<script>
import defaultEventBus from '../../scripts/eventBus.js';
import { _wtUiLog as loggr } from '../../scripts/logger.js';

export default {
  name: 'WtNotificationsBar',
  inject: ['$eventBus'],
  data: () => ({
    notificationDuration: 4000,
    notifications: [],

    eventBus: defaultEventBus,
  }),
  created() {
    if (this.$eventBus) {
      this.eventBus = this.$eventBus;
    } else {
      loggr.warn({ entity: 'component', module: 'wt-notification-bar' })(
        'no globally provided $eventBus found, using default webitel-ui eventBus',
      );
    }

    this.eventBus.$on('notification', this.showNotification);
  },
  unmounted() {
    this.eventBus.$off('notification', this.showNotification);
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
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../css/main.scss';

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

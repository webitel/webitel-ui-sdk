<template>
  <article
    class="wt-notification"
    @click="$emit('close')"
  >
    <wt-icon
      class="wt-notification__icon"
      :icon="notificationIcon"
      :color="notificationIconColor"
    ></wt-icon>

    <p class="wt-notification__text">
      <slot></slot>
    </p>
  </article>
</template>

<script>

  export default {
    name: 'wt-notification',
    props: {
      type: {
        type: String,
        default: 'info',
      },
    },
    computed: {
      notificationIcon() {
        switch (this.type) {
          case 'info': return 'done';
          case 'error': return 'attention';
          default: return '';
        }
      },
      notificationIconColor() {
        switch (this.type) {
          case 'info': return 'success';
          case 'error': return 'danger';
          default: return '';
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-notification {
    @extend %typo-body-1;
    @include width-fit-content;

    position: relative;
    display: flex;
    align-items: flex-start;
    min-width: var(--notification-min-width);
    max-width: var(--notification-max-width);
    padding: var(--notification-padding);
    color: var(--notification-text-color);
    background: var(--notification-bg-color);
    border-radius: var(--border-radius);
    box-shadow: var(--elevation-1);
    cursor: pointer;
  }

  .wt-notification__icon {
    flex: 0 0 var(--icon-md-size);
    margin-right: var(--notification-icon-margin);
  }

  .wt-notification__text {
    flex-grow: 1;
    align-self: center;
    margin: 0;
  }
</style>

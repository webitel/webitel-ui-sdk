<template>
  <div class="wt-header-actions">
    <wt-icon-btn
      v-clickaway="close"
      :class="{'active': isOpened}"
      :tooltip="$t('webitelUI.headerActions.account')"
      class="wt-header-actions__btn"
      icon="account"
      @click="isOpened = !isOpened"
    ></wt-icon-btn>
    <transition name="fade">
      <section v-show="isOpened" class="wt-header-actions__panel-wrapper">
        <header v-if="isHeader" class="wt-header-actions__header">
          <h3
            class="wt-header-actions__name"
          >{{ userName }}</h3>
          <p
            class="wt-header-actions__account"
          >{{ userAccount }}</p>
        </header>
        <ul class="wt-header-actions__actions-wrapper">
          <li class="wt-header-actions__action">
            <a
              class="wt-header-actions__action__link"
              href="https://docs.webitel.com/display/WEP/Webitel+Elastic+Platform"
              target="_blank"
              @click="close"
            >
              <wt-icon icon="docs" size="sm"></wt-icon>
              <span>{{ $t('webitelUI.headerActions.docs') }}</span>
            </a>
          </li>
          <li class="wt-header-actions__action">
            <a
              class="wt-header-actions__action__link"
              @click.prevent="settings"
            >
              <wt-icon icon="settings" size="sm"></wt-icon>
              <span>{{ $t('webitelUI.headerActions.settings') }}</span>
            </a>
          </li>
          <li class="wt-header-actions__action wt-header-actions__action--logout">
            <a
              class="wt-header-actions__action__link"
              @click.prevent="logout"
            >
              <wt-icon color="danger" icon="logout" size="sm"></wt-icon>
              <span>{{ $t('webitelUI.headerActions.logout') }}</span>
            </a>
          </li>
        </ul>
        <footer v-if="isFooter" class="wt-header-actions__footer">
          <p class="wt-header-actions__build__version">
            {{ buildVersion }}
          </p>
        </footer>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'wt-header-actions',
  data: () => ({
    isOpened: false,
  }),
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    buildInfo: {
      type: Object,
    },
  },

  computed: {
    isHeader() {
      return !!(this.userName || this.userAccount);
    },
    isFooter() {
      return this.buildInfo;
    },
    userName() {
      return this.user.name || this.user.username;
    },
    userAccount() {
      return this.user.preferredUsername || this.user.account;
    },
    buildVersion() {
      return `${this.$t('webitelUI.headerActions.buildVersion')}: v${this.buildInfo.release}-${this.buildInfo.build}`;
    },
  },

  methods: {
    settings() {
      this.$emit('settings');
      this.close();
    },

    logout() {
      this.$emit('logout');
      this.close();
    },

    close() {
      this.isOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-header-actions {
  position: relative;
  z-index: var(--wt-app-header-content-z-index);
  display: flex;
  align-items: center;
}

.wt-header-actions__panel-wrapper {
  position: absolute;
  top: 100%; // icon
  right: 0;
  display: flex;
  flex-direction: column;
  gap: var(--wt-header-actions-content-sections-gap);
  min-width: var(--wt-header-actions-min-width);
  margin-top: var(--wt-app-header-content-panel-margin);
  padding: var(--wt-header-actions-padding);
  transition: var(--transition);
  border-radius: var(--border-radius);
  background: var(--wt-app-header-content-bg-color);
  box-shadow: var(--elevation-1);
}

.wt-header-actions__name {
  @extend %typo-subtitle-1;
  white-space: nowrap;
}

.wt-header-actions__account {
  @extend %typo-body-1;
  white-space: nowrap;
}

.wt-header-actions__action {
  display: flex;
  transition: var(--transition);

  &:hover {
    background: var(--wt-header-actions-action-bg-color--hover);
  }

  .wt-header-actions__action__link {
    @extend %typo-body-1;
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--wt-header-actions-action-link-padding);
    cursor: pointer;

    .wt-icon {
      margin-right: var(--wt-header-actions-action-link-padding);
    }
  }

  &--logout .wt-header-actions__action__link {
    color: var(--false-color);
  }
}

.wt-header-actions__build__version {
  @extend %typo-caption;
  white-space: nowrap;
}
</style>

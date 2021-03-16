<template>
  <div class="wt-header-actions">
    <wt-icon-btn
      class="wt-header-actions__btn"
      :class="{'active': isOpened}"
      :tooltip="$t('webitelUI.headerActions.account')"
      icon="account"
      @click="isOpened = !isOpened"
      v-clickaway="close"
    ></wt-icon-btn>
    <transition name="fade">
    <section class="wt-header-actions__panel-wrapper" v-show="isOpened">
      <header class="wt-header-actions__header" v-if="isHeader">
        <h3
          class="wt-header-actions__name">{{ userName }}</h3>
        <p
          class="wt-header-actions__account">{{ userAccount }}</p>
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
            <span>{{$t('webitelUI.headerActions.docs')}}</span>
          </a>
        </li>
        <li class="wt-header-actions__action">
          <a
            class="wt-header-actions__action__link"
            @click.prevent="settings"
          >
            <wt-icon icon="settings" size="sm"></wt-icon>
            <span>{{$t('webitelUI.headerActions.settings')}}</span>
          </a>
        </li>
        <li class="wt-header-actions__action wt-header-actions__action--logout">
          <a
            class="wt-header-actions__action__link"
            @click.prevent="logout"
          >
            <wt-icon icon="logout" size="sm" color="false"></wt-icon>
            <span>{{$t('webitelUI.headerActions.logout')}}</span>
          </a>
        </li>
      </ul>
      <footer class="wt-header-actions__footer" v-if="isFooter">
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
    display: flex;
    align-items: center;
    margin-left: var(--wt-app-header-content-gap);
    z-index: var(--wt-app-header-content-z-index);
  }

  .wt-header-actions__panel-wrapper {
    @extend %typo-body-md;
    position: absolute;
    top: 100%; // icon
    right: 0;
    min-width: var(--wt-header-actions-min-width);
    margin-top: var(--wt-app-header-content-panel-margin);
    background: var(--wt-app-header-content-bg-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: var(--transition);
  }

  .wt-header-actions__header, .wt-header-actions__footer {
    padding: var(--wt-app-header-content-gap);
  }

  .wt-header-actions__name {
    @extend %typo-body-lg;
    white-space: nowrap;
  }

  .wt-header-actions__account {
    @extend %typo-body-lg;
    white-space: nowrap;
  }

  .wt-header-actions__action {
    display: flex;

    &:hover {
      background: var(--wt-header-actions-action-bg-color--hover);
    }

    .wt-header-actions__action__link {
      @extend %typo-body-md;
      display: flex;
      align-items: center;
      width: 100%;
      padding: var(--wt-header-actions-action-link-padding);
      cursor: pointer;

      .wt-icon {
        margin-right: 10px;
      }
    }

    &--logout .wt-header-actions__action__link {
      color: var(--false-color);
    }
  }

  .wt-header-actions__build__version {
    @extend %typo-body-sm;
    white-space: nowrap;
  }
</style>

<template>
  <div class="wt-header-actions">
    <wt-icon-btn
      v-clickaway="close"
      v-tooltip="$t('webitelUI.headerActions.account')"
      :class="{ active: isOpened }"
      class="wt-header-actions__btn"
      icon="account"
      @click="isOpened = !isOpened"
    />

    <transition name="fade">
      <section
        v-show="isOpened"
        class="wt-header-actions__panel-wrapper"
      >
        <header
          v-if="isHeader"
          class="wt-header-actions__header"
        >
          <h3 class="wt-header-actions__name typo-subtitle-1">
            {{ userName }}
          </h3>
          <p class="wt-header-actions__account typo-body-1">
            {{ userAccount }}
          </p>
        </header>
        <ul class="wt-header-actions__actions-wrapper">
          <li class="wt-header-actions__action">
            <a
              class="wt-header-actions__action__link typo-body-1"
              href="https://docs.webitel.com/display/WEP/Webitel+Elastic+Platform"
              target="_blank"
              @click="close"
            >
              <wt-icon icon="docs" />
              <span>{{ $t('webitelUI.headerActions.docs') }}</span>
            </a>
          </li>
          <li class="wt-header-actions__action">
            <a
              class="wt-header-actions__action__link typo-body-1"
              @click.prevent="settings"
            >
              <wt-icon icon="settings" />
              <span>{{ $t('webitelUI.headerActions.settings') }}</span>
            </a>
          </li>
          <li
            class="wt-header-actions__action wt-header-actions__action--logout"
          >
            <a
              class="wt-header-actions__action__link typo-body-1"
              @click.prevent="logout"
            >
              <wt-icon
                color="error"
                icon="logout"
              />
              <span>{{ $t('webitelUI.headerActions.logout') }}</span>
            </a>
          </li>
        </ul>
        <footer
          v-if="isFooter"
          class="wt-header-actions__footer"
        >
          <p class="wt-header-actions__build__version typo-caption">
            {{ buildVersion }}
          </p>
        </footer>
      </section>
    </transition>
  </div>
</template>

<script>
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';

export default {
  name: 'WtHeaderActions',
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    buildInfo: {
      type: Object,
    },
  },
  data: () => ({
    isOpened: false,
  }),

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
      let buildString = '';
      buildString = `${this.$t('webitelUI.headerActions.buildVersion')}: v${this.buildInfo.release}-${this.buildInfo.build}`;
      if (this.buildInfo.timestamp) {
        buildString += `, ${formatDate(this.buildInfo.timestamp, FormatDateMode.DATETIME)}`;
      }
      return buildString;
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

<style  scoped>.wt-header-actions {
display: flex;
  position: relative;
  align-items: center;
  z-index: var(--wt-app-header-content-z-index);
}

.wt-header-actions__panel-wrapper {
display: flex;
  position: absolute;
  top: 100%; // icon
  right: 0;
  flex-direction: column;
  gap: var(--wt-header-actions-content-sections-gap);
  transition: var(--transition);
  margin-top: var(--wt-app-header-content-panel-margin);
  box-shadow: var(--elevation-10);
  border-radius: var(--border-radius);
  background: var(--wt-app-header-content-bg-color);
  padding: var(--wt-header-actions-padding);
  min-width: var(--wt-header-actions-min-width);
}

.wt-header-actions__name {
  color: var(--text-main-color);
  white-space: nowrap;
}

.wt-header-actions__account {
  color: var(--text-main-color);
  white-space: nowrap;
}

.wt-header-actions__action {
display: flex;
  transition: var(--transition);
}

.wt-header-actions__action .wt-header-actions:hover {
background: var(--wt-header-actions-action-bg-color--hover);
}

.wt-header-actions__action .wt-header-actions__action__link {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: var(--wt-header-actions-action-link-padding);
    width: 100%;
    color: var(--text-main-color);

    .wt-icon {
      margin-right: var(--wt-header-actions-action-link-padding);
}

  .wt-icon--logout .wt-header-actions__action__link {
color: var(--error-color);
}
}

.wt-header-actions__build__version {
  color: var(--text-main-color);
  white-space: nowrap;
}</style>

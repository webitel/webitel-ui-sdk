<template>
  <div class="wt-app-navigator" v-clickaway="close">
    <wt-icon-btn
      class="wt-app-navigator__btn"
      :class="{'active': isOpened}"
      :tooltip="$t('webitelUI.appNavigator.title')"
      icon="app-navigator"
      @click="isOpened = !isOpened"
    ></wt-icon-btn>
    <transition name="fade">
      <nav
        class="wt-app-navigator__nav-wrapper"
        v-show="isOpened"
      >
        <h3 class="wt-app-navigator__nav-title">
          {{ $t('webitelUI.appNavigator.title') }}
        </h3>
        <ul class="wt-app-navigator__nav">

          <li
            v-if="formattedApps.agent"
            class="wt-app-navigator__card"
            :class="{'active': formattedApps.agent.currentApp }"
          >
            <a
              class="wt-app-navigator__card__link"
              :href="formattedApps.agent.href"
              :title="$t('webitelUI.appNavigator.agent')"
              target="_blank"
            >
              <img
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-agent.svg"
                alt="agent-pic"
              >
            </a>
          </li>

          <li
            v-if="formattedApps.supervisor"
            class="wt-app-navigator__card"
            :class="{'active': formattedApps.supervisor.currentApp }"
          >
            <a
              class="wt-app-navigator__card__link"
              :href="formattedApps.supervisor.href"
              :title="$t('webitelUI.appNavigator.supervisor')"
              target="_blank"
            >
              <img
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-supervisor.svg"
                alt="supervisor-pic"
              >
            </a>
          </li>

          <li
            v-if="formattedApps.history"
            class="wt-app-navigator__card"
            :class="{'active': formattedApps.history.currentApp }"
          >
            <a
              class="wt-app-navigator__card__link"
              :href="formattedApps.history.href"
              :title="$t('webitelUI.appNavigator.history')"
              target="_blank"
            >
              <img
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-history.svg"
                alt="history-pic"
              >
            </a>
          </li>

          <li
            v-if="formattedApps.audit"
            class="wt-app-navigator__card"
            :class="{'active': formattedApps.audit.currentApp }"
          >
            <a
              class="wt-app-navigator__card__link"
              :href="formattedApps.audit.href"
              :title="$t('webitelUI.appNavigator.audit')"
              target="_blank"
            >
              <img
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-audit.svg"
                alt="audit-pic"
              >
            </a>
          </li>

          <li
            v-if="formattedApps.admin"
            class="wt-app-navigator__card"
            :class="{'active': formattedApps.admin.currentApp }"
          >
            <a
              class="wt-app-navigator__card__link"
              :href="formattedApps.admin.href"
              :title="$t('webitelUI.appNavigator.admin')"
              target="_blank"
            >
              <img
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-admin.svg"
                alt="admin-pic"
              >
            </a>
          </li>

          <li
            v-if="formattedApps.grafana"
            class="wt-app-navigator__card"
            :class="{'active': formattedApps.grafana.currentApp }"
          >
            <a
              class="wt-app-navigator__card__link"
              :href="formattedApps.grafana.href"
              :title="$t('webitelUI.appNavigator.grafana')"
              target="_blank"
            >
              <img
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-analytics.svg"
                alt="grafana-pic"
              >
            </a>
          </li>

        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'wt-app-navigator',
  data: () => ({
    isOpened: false,
  }),

  props: {
    currentApp: {
      type: String,
    },
    apps: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    formattedApps() {
      return this.apps.reduce((apps, app) => ({
        ...apps,
        [app.name]: {
          ...app,
          currentApp: this.currentApp === app.name,
        },
      }), {});
    },
  },

  methods: {
    close() {
      this.isOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-app-navigator {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: var(--wt-app-header-content-gap);
  z-index: var(--wt-app-header-content-z-index);
}

// dropdown part
.wt-app-navigator__nav-wrapper {
  @extend %wt-scrollbar;
  position: absolute;
  top: 100%; // icon
  right: 0;
  max-height: var(--wt-app-navigator-max-height);
  padding: var(--wt-app-header-content-gap);
  margin-top: var(--wt-app-header-content-panel-margin);
  background: var(--wt-app-header-content-bg-color);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  transition: var(--transition);
  overflow: auto;
}

.wt-app-navigator__nav-title {
  @extend %typo-strong-lg;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: var(--wt-app-header-content-gap);
}

// ul with li apps
.wt-app-navigator__nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--wt-app-header-content-gap);
}

.wt-app-navigator__card {
  width: var(--wt-app-navigator-item-size);
  height: var(--wt-app-navigator-item-size);
  box-sizing: border-box;
  border: var(--wt-app-navigator-item-border);
  border-color: var(--wt-app-navigator-item-border-color);
  border-radius: var(--border-radius);
  transition: var(--transition);

  &.active, &:hover {
    border-color: var(--wt-app-navigator-item-border-color--hover);
  }
}

// a tag
.wt-app-navigator__card__link {
  display: inline-block;
  width: 100%;
  height: 100%;
}

// img inside a
.wt-app-navigator__card__img {
  width: 100%;
  height: 100%;
}
</style>

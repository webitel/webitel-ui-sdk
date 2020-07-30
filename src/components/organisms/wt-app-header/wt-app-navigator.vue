<template>
  <div class="wt-app-navigator" v-clickaway="close">
    <wt-icon-btn
      class="wt-app-navigator__btn"
      :class="{'active': isOpened}"
      :tooltip="$t('webitelUI.appNavigator.title')"
      icon="app_navigator"
      @click="isOpened = !isOpened"
    ></wt-icon-btn>
    <nav
      class="wt-app-navigator__nav-wrapper"
      v-show="isOpened"
    >
      <h3 class="wt-app-navigator__nav-title">
        {{$t('webitelUI.appNavigator.title')}}
      </h3>
      <ul class="wt-app-navigator__nav">
        <li
          class="wt-app-navigator__card"
          :class="{'active': activeApp === app.name}"
          v-for="(app, key) of navApps"
          :key="key"
        >
          <a
            class="wt-app-navigator__card__link"
            :href="app.href"
            :title="app.title"
            target="_blank"
          >
            <img
              class="wt-app-navigator__card__img"
              :src="app.img"
              :alt="`${app.name}-pic`"
            >
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  const imgAdmin = require('../../../assets/components/organisms/wt-app-header/app-navigator/app-admin.svg');
  const imgAgent = require('../../../assets/components/organisms/wt-app-header/app-navigator/app-agent.svg');
  const imgAudit = require('../../../assets/components/organisms/wt-app-header/app-navigator/app-audit.svg');
  const imgHistory = require('../../../assets/components/organisms/wt-app-header/app-navigator/app-history.svg');
  const imgSupervisor = require('../../../assets/components/organisms/wt-app-header/app-navigator/app-supervisor.svg');
  const imgGrafana = require('../../../assets/components/organisms/wt-app-header/app-navigator/app-grafana.svg');

  export default {
    name: 'wt-wt-app-navigator',
    data: () => ({
      isOpened: false,
      imgAdmin,
    }),

    props: {
      activeApp: {
        type: String,
      },
      apps: {
        type: Array,
        default: () => [],
      },
    },

    computed: {
      navApps() {
        const agentApp = {
          name: 'agent',
          title: this.$t('webitelUI.appNavigator.agent'),
          img: imgAgent,
        };
        const supervisorApp = {
          name: 'supervisor',
          title: this.$t('webitelUI.appNavigator.supervisor'),
          img: imgSupervisor,
        };
        const historyApp = {
          name: 'history',
          title: this.$t('webitelUI.appNavigator.history'),
          img: imgHistory,
        };

        const auditApp = {
          name: 'audit',
          title: this.$t('webitelUI.appNavigator.audit'),
          img: imgAudit,
        };

        const adminApp = {
          name: 'admin',
          title: this.$t('webitelUI.appNavigator.admin'),
          img: imgAdmin,
        };

        const grafanaApp = {
          name: 'grafana',
          title: this.$t('webitelUI.appNavigator.grafana'),
          img: imgGrafana,
        };

        const navApps = [agentApp, supervisorApp, historyApp, auditApp, adminApp];
        if (this.$config?.ON_SITE) navApps.push(grafanaApp);

        const apps = navApps
          // filter apps, passed in prop
          .filter((navApp) => this.apps.some((app) => navApp.name === app.name))
          // and merge with props apps properties
          .map((navApp) => {
            const app = this.apps.find((app) => navApp.name === app.name);
            return {
              ...navApp,
              ...app,
            };
          });
        return apps;
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

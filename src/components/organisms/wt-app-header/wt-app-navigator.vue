<template>
  <div v-clickaway="close" class="wt-app-navigator">
    <wt-icon-btn
      :class="{'active': isOpened}"
      :tooltip="$t('webitelUI.appNavigator.title')"
      class="wt-app-navigator__btn"
      icon="app-navigator"
      @click="isOpened = !isOpened"
    ></wt-icon-btn>
    <transition name="fade">
      <nav
        v-show="isOpened"
        class="wt-app-navigator__nav-wrapper"
      >
        <h3 class="wt-app-navigator__nav-title">
          {{ $t('webitelUI.appNavigator.title') }}
        </h3>
        <ul class="wt-app-navigator__nav">

          <li
            v-if="formattedApps[WebitelApplications.AGENT]"
            :class="{'active': formattedApps[WebitelApplications.AGENT].currentApp }"
            class="wt-app-navigator__card"
          >
            <a
              :href="formattedApps[WebitelApplications.AGENT].href"
              :title="$t(`webitelUI.appNavigator.${[WebitelApplications.AGENT]}`)"
              class="wt-app-navigator__card__link"
              target="_blank"
            >
              <img
                :alt="`${[WebitelApplications.AGENT]}-pic`"
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-agent.svg"
              >
            </a>
          </li>

          <li
            v-if="formattedApps[WebitelApplications.SUPERVISOR]"
            :class="{'active': formattedApps[WebitelApplications.SUPERVISOR].currentApp }"
            class="wt-app-navigator__card"
          >
            <a
              :href="formattedApps[WebitelApplications.SUPERVISOR].href"
              :title="$t(`webitelUI.appNavigator.${[WebitelApplications.SUPERVISOR]}`)"
              class="wt-app-navigator__card__link"
              target="_blank"
            >
              <img
                :alt="`${[WebitelApplications.SUPERVISOR]}-pic`"
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-supervisor.svg"
              >
            </a>
          </li>

          <li
            v-if="formattedApps[WebitelApplications.HISTORY]"
            :class="{'active': formattedApps[WebitelApplications.HISTORY].currentApp }"
            class="wt-app-navigator__card"
          >
            <a
              :href="formattedApps[WebitelApplications.HISTORY].href"
              :title="$t(`webitelUI.appNavigator.${[WebitelApplications.HISTORY]}`)"
              class="wt-app-navigator__card__link"
              target="_blank"
            >
              <img
                :alt="`${[WebitelApplications.HISTORY]}-pic`"
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-history.svg"
              >
            </a>
          </li>

          <li
            v-if="false && formattedApps[WebitelApplications.AUDIT]"
            :class="{'active': formattedApps[WebitelApplications.AUDIT].currentApp }"
            class="wt-app-navigator__card"
          >
            <a
              :href="formattedApps[WebitelApplications.AUDIT].href"
              :title="$t(`webitelUI.appNavigator.${[WebitelApplications.AUDIT]}`)"
              class="wt-app-navigator__card__link"
              target="_blank"
            >
              <img
                :alt="`${[WebitelApplications.AUDIT]}-pic`"
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-audit.svg"
              >
            </a>
          </li>

          <li
            v-if="formattedApps[WebitelApplications.ADMIN]"
            :class="{'active': formattedApps[WebitelApplications.ADMIN].currentApp }"
            class="wt-app-navigator__card"
          >
            <a
              :href="formattedApps[WebitelApplications.ADMIN].href"
              :title="$t(`webitelUI.appNavigator.${[WebitelApplications.ADMIN]}`)"
              class="wt-app-navigator__card__link"
              target="_blank"
            >
              <img
                :alt="`${[WebitelApplications.ADMIN]}-pic`"
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-admin.svg"
              >
            </a>
          </li>

          <li
            v-if="formattedApps[WebitelApplications.ANALYTICS]"
            :class="{'active': formattedApps[WebitelApplications.ANALYTICS].currentApp }"
            class="wt-app-navigator__card"
          >
            <a
              :href="formattedApps[WebitelApplications.ANALYTICS].href"
              :title="$t(`webitelUI.appNavigator.${[WebitelApplications.ANALYTICS]}`)"
              class="wt-app-navigator__card__link"
              target="_blank"
            >
              <img
                :alt="`${[WebitelApplications.ANALYTICS]}-pic`"
                class="wt-app-navigator__card__img"
                src="../../../assets/components/organisms/wt-app-header/app-navigator/app-analytics.svg"
              >
            </a>
          </li>

        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
import WebitelApplications from '../../../enums/WebitelApplications/WebitelApplications.enum';

export default {
  name: 'wt-app-navigator',
  data: () => ({
    WebitelApplications,
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
  z-index: var(--wt-app-header-content-z-index);
  display: flex;
  align-items: center;
}

// dropdown part
.wt-app-navigator__nav-wrapper {
  @extend %wt-scrollbar;
  position: absolute;
  top: 100%; // icon
  right: 0;
  overflow: auto;
  max-height: var(--wt-app-navigator-max-height);
  margin-top: var(--wt-app-header-content-panel-margin);
  padding: var(--wt-app-header-content-gap);
  transition: var(--transition);
  border-radius: var(--border-radius);
  background: var(--wt-app-header-content-bg-color);
  box-shadow: var(--elevation-1);
}

.wt-app-navigator__nav-title {
  @extend %typo-subtitle-1;
  margin-bottom: var(--wt-app-header-content-gap);
  text-align: center;
  text-transform: uppercase;
}

// ul with li apps
.wt-app-navigator__nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--wt-app-navigator-item-gap);
}

.wt-app-navigator__card {
  box-sizing: border-box;
  width: var(--wt-app-navigator-item-size);
  height: var(--wt-app-navigator-item-size);
  transition: var(--transition);
  border: var(--wt-app-navigator-item-border);
  border-color: var(--wt-app-navigator-item-border-color);
  border-radius: var(--border-radius);

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

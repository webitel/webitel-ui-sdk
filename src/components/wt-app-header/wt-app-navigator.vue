<template>
  <div
    v-clickaway="close"
    class="wt-app-navigator"
  >
    <wt-tooltip>
      <template #activator>
        <wt-icon-btn
          :class="{'active': isOpened}"
          class="wt-app-navigator__btn"
          icon="app-navigator"
          @click="isOpened = !isOpened"
        />
      </template>
      {{ $t('webitelUI.appNavigator.title') }}
    </wt-tooltip>

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
            v-for="app of formattedApps"
            :key="app.name"
            :class="{'active': app.currentApp }"
            class="wt-app-navigator__card"
          >
            <a
              :href="app.href"
              :title="$t(`webitelUI.appNavigator.${app.name}`)"
              class="wt-app-navigator__card__link"
              target="_blank"
            >
              <img
                :alt="`${app.name}-pic`"
                :src="app.img"
                class="wt-app-navigator__card__img"
              >
              <p
                class="wt-app-navigator__card__title"
              >
                {{ $t(`webitelUI.appNavigator.${app.name}`) }}
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import WebitelApplications from '../../enums/WebitelApplications/WebitelApplications.enum.js';

import AdminDark from './assets/admin-dark.svg';
import AdminLight from './assets/admin-light.svg';
import AgentDark from './assets/agent-dark.svg';
import AgentLight from './assets/agent-light.svg';
import AnalyticsDark from './assets/analytics-dark.svg';
import AnalyticsLight from './assets/analytics-light.svg';
import AuditDark from './assets/audit-dark.svg';
import AuditLight from './assets/audit-light.svg';
import CrmDark from './assets/crm-dark.svg';
import CrmLight from './assets/crm-light.svg';
import HistoryDark from './assets/history-dark.svg';
import HistoryLight from './assets/history-light.svg';
import SupervisorDark from './assets/supervisor-dark.svg';
import SupervisorLight from './assets/supervisor-light.svg';

const pics = {
  [WebitelApplications.ADMIN]: {
    dark: AdminDark,
    light: AdminLight,
  },
  [WebitelApplications.AGENT]: {
    dark: AgentDark,
    light: AgentLight,
  },
  [WebitelApplications.ANALYTICS]: {
    dark: AnalyticsDark,
    light: AnalyticsLight,
  },
  [WebitelApplications.CRM]: {
    dark: CrmDark,
    light: CrmLight,
  },
  [WebitelApplications.HISTORY]: {
    dark: HistoryDark,
    light: HistoryLight,
  },
  [WebitelApplications.AUDIT]: {
    dark: AuditDark,
    light: AuditLight,
  },
  [WebitelApplications.SUPERVISOR]: {
    dark: SupervisorDark,
    light: SupervisorLight,
  },
};

const props = defineProps({
  currentApp: {
    type: String,
  },
  apps: {
    type: Array,
    default: () => [],
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
});

const isOpened = ref(false);

const order = [
  WebitelApplications.AGENT,
  WebitelApplications.SUPERVISOR,
  WebitelApplications.HISTORY,
  WebitelApplications.ADMIN,
  WebitelApplications.AUDIT,
  WebitelApplications.CRM,
  WebitelApplications.ANALYTICS,
];

const formattedApps = computed(() =>
  props.apps
    .reduce(
      (apps, app) => [
        ...apps,
        {
          ...app,
          img: props.darkMode ? pics[app.name].dark : pics[app.name].light,
          currentApp: props.currentApp === app.name,
        },
      ],
      [],
    )
    .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name)),
);

function close() {
  isOpened.value = false;
}
</script>

<style lang="scss" scoped>
@use '../../../src/css/main.scss';

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
  box-shadow: var(--elevation-10);
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
  width: var(--wt-app-navigator-item-width);
  height: var(--wt-app-navigator-item-height);
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
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: var(--wt-app-navigator-item-padding);
  cursor: pointer;
}

// img inside a
.wt-app-navigator__card__img {
  width: var(--wt-app-navigator-item-pic-size);
  height: var(--wt-app-navigator-item-pic-size);
  margin: auto;
}

// app title
.wt-app-navigator__card__title {
  @extend %typo-overline;
  text-align: center;
  color: var(--text-main-color);
}
</style>

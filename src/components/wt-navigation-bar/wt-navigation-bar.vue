<template>
  <aside
    v-clickaway="close"
    class="wt-navigation-bar"
  >
    <wt-icon-btn
      :class="{'active': isOpened}"
      class="wt-navigation-bar__menu-btn"
      icon="menu"
      @click="isOpened = !isOpened"
    />
    <transition name="fade">
      <nav
        v-show="isOpened"
        class="wt-navigation-bar__nav"
      >
        <header class="wt-navigation-bar__nav-header">
          <!--        vue cli build target lib cant handle dynamic require :( -->
          <img
            :alt="currentApp"
            :src="darkMode ? appLogo[currentApp].dark : appLogo[currentApp].light"
            class="wt-navigation-bar__app-pic"
          >
          <wt-icon-btn
            class="wt-navigation-bar__nav-close"
            icon="close"
            @click="isOpened = false"
          />
        </header>
        <wt-divider />
        <ul class="wt-navigation-bar__nav-list">
          <li
            v-for="(navItem, key) of nav"
            :key="key"
            class="wt-navigation-bar__nav-item"
          >
            <div v-if="!navItem.subNav">
              <div class="wt-navigation-bar__nav-item-wrapper">
                <router-link
                  :class="{'wt-navigation-bar__nav-item-link--active': currentNav.nav === navItem.value}"
                  :to="navItem.route"
                  class="wt-navigation-bar__nav-item-link"
                  @click="close"
                >
                  {{ navItem.name || navItem.value }}
                </router-link>
              </div>
            </div>
            <div v-else>
              <button
                :class="{
                  'wt-navigation-bar__nav-expansion--expanded': isExpanded(navItem),
                  'wt-navigation-bar__nav-expansion--active': currentNav.expansion === navItem.value,
                }"
                class="wt-navigation-bar__nav-expansion"
                type="button"
                @click="expand(navItem)"
              >
                <span class="wt-navigation-bar__nav-expansion-name">{{ navItem.name || navItem.value }}</span>
                <wt-icon
                  class="wt-navigation-bar__expansion-arrow"
                  color="active"
                  icon="arrow-right"
                />
              </button>
              <expand-transition>
                <ul v-if="isExpanded(navItem)">
                  <li
                    v-for="(subNavItem, subNavKey) of navItem.subNav"
                    :key="subNavKey"
                    class="wt-navigation-bar__nav-item"
                  >
                    <div class="wt-navigation-bar__nav-item-wrapper">
                      <router-link
                        :class="{'wt-navigation-bar__nav-item-link--active': currentNav.nav === subNavItem.value}"
                        :to="nestedRoute(subNavItem, navItem)"
                        class="wt-navigation-bar__nav-item-link wt-navigation-bar__nav-item-link--subnav"
                        @click="close"
                      >
                        {{ subNavItem.name || subNavItem.value }}
                      </router-link>
                    </div>
                  </li>
                </ul>
              </expand-transition>
            </div>
          </li>
        </ul>
      </nav>
    </transition>
  </aside>
</template>

<script>
import WebitelApplications from '../../enums/WebitelApplications/WebitelApplications.enum.js';
import ExpandTransition from '../transitions/wt-expand-transition.vue';
import AdminDark from './assets/dark/app-logo-dark-admin.svg';
import AuditDark from './assets/dark/app-logo-dark-audit.svg';
import CrmDark from './assets/dark/app-logo-dark-crm.svg';
import HistoryDark from './assets/dark/app-logo-dark-history.svg';
import SupervisorDark from './assets/dark/app-logo-dark-supervisor.svg';
import WorkspaceDark from './assets/dark/app-logo-dark-workspace.svg';
import AdminLight from './assets/light/app-logo-light-admin.svg';
import AuditLight from './assets/light/app-logo-light-audit.svg';
import CrmLight from './assets/light/app-logo-light-crm.svg';
import HistoryLight from './assets/light/app-logo-light-history.svg';
import SupervisorLight from './assets/light/app-logo-light-supervisor.svg';
import WorkspaceLight from './assets/light/app-logo-light-workspace.svg';

const appLogo = {
  [WebitelApplications.SUPERVISOR]: {
    dark: SupervisorDark,
    light: SupervisorLight,
  },
  [WebitelApplications.ADMIN]: {
    dark: AdminDark,
    light: AdminLight,
  },
  [WebitelApplications.AGENT]: {
    dark: WorkspaceDark,
    light: WorkspaceLight,
  },
  [WebitelApplications.AUDIT]: {
    dark: AuditDark,
    light: AuditLight,
  },
  [WebitelApplications.HISTORY]: {
    dark: HistoryDark,
    light: HistoryLight,
  },
  [WebitelApplications.CRM]: {
    dark: CrmDark,
    light: CrmLight,
  },
};

export default {
  name: 'WtNavigationBar',
  components: { ExpandTransition },
  props: {
    currentApp: {
      type: String,
      default: 'admin',
    },
    nav: {
      type: Array,
      default: () => [],
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isOpened: false,
    expandedName: '',
    appLogo,
  }),

  computed: {
    currentNav() {
      const path = this.$route.fullPath;
      const currentNav = this.nav
        .reduce((flatNav, currentNavItem) => {
          if (currentNavItem.subNav) return flatNav.concat(currentNavItem.subNav);
          return [...flatNav, currentNavItem];
        }, [])
        .find((navItem) => path.includes(navItem.route));
      const currentExpansion = this.nav
        .filter((nav) => nav.subNav)
        .find((nav) => nav.subNav.indexOf(currentNav) !== -1);
      return {
        nav: currentNav?.value,
        expansion: currentExpansion?.value,
      };
    },
  },
  methods: {
    nestedRoute(subNavItem, navItem) {
      return navItem.route ? `${navItem.route}/${subNavItem.route}` : subNavItem.route;
    },
    expand(navItem) {
      this.expandedName = this.expandedName !== navItem.value ? navItem.value : '';
    },
    isExpanded(navItem) {
      return this.expandedName === navItem.value;
    },
    close() {
      this.isOpened = false;
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';

.wt-navigation-bar__menu-btn {
  display: block;
  width: fit-content;
}

.wt-navigation-bar__nav {
  @extend %wt-scrollbar;
  position: fixed;
  z-index: var(--wt-navigation-bar-z-index);
  top: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  width: var(--wt-navigation-bar-width);
  padding: var(--wt-navigation-bar-padding);
  border-radius: var(--border-radius);
  background: var(--wt-navigation-bar-background-color);
  box-shadow: var(--elevation-10);

  // expand animation optimization
  * {
    transform: translateZ(0);
    will-change: height;
    backface-visibility: hidden;
    perspective: 1000px;
  }
}

.wt-navigation-bar__nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--wt-navigation-bar-header-padding);
}

.wt-navigation-bar__app-pic {
  width: auto;
  height: var(--wt-navigation-bar-app-pic-height);
}

.wt-navigation-bar__nav-item-link {
  @extend %typo-body-1;
  display: block;
  padding: var(--wt-navigation-bar-link-padding);
  transition: var(--transition);
  word-wrap: break-word;
  color: var(--wt-navigation-bar-option-text-color);

  &:hover {
    background: var(--wt-navigation-bar-option-background-hover-color);
  }

  &.wt-navigation-bar__nav-item-link--active {
    color: var(--wt-navigation-bar-option-text-active-color);
    background: var(--wt-navigation-bar-option-background-active-color);
  }
}

.wt-navigation-bar__nav-expansion {
  @extend %typo-subtitle-1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--wt-navigation-bar-link-padding);
  color: var(--wt-navigation-bar-option-text-color);
  outline: none;

  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: var(--wt-navigation-bar-active-expansion-flag-width);
    content: '';
    transition: var(--transition);
    opacity: 0;
    border-radius: var(--border-radius);
    background: var(--wt-navigation-bar-expansion-ribbon-color);
  }

  .wt-navigation-bar__expansion-arrow {
    transition: var(--transition);
  }

  &--expanded:before,
  &--active:before {
    opacity: 1;
  }

  &--expanded .wt-navigation-bar__expansion-arrow {
    transform: rotate(90deg);
  }
}

.wt-navigation-bar__nav-expansion-name {
  display: block;
  max-width: var(--wt-navigation-bar-active-expansion-name-max-width);
  word-wrap: break-word;
}

.wt-navigation-bar__nav-item-link--subnav {
  padding-left: var(--wt-navigation-bar-subnav-padding-left);
}
</style>

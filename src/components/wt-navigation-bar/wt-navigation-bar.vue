<template>
  <aside v-clickaway="close" class="wt-navigation-bar">
    <wt-icon-btn
      :class="{'active': isOpened}"
      class="wt-navigation-bar__menu-btn"
      icon="menu"
      @click="isOpened = !isOpened"
    ></wt-icon-btn>
    <transition name="fade">
      <nav v-show="isOpened" class="wt-navigation-bar__nav">
        <header class="wt-navigation-bar__nav-header">
          <!--        vue cli build target lib cant handle dynamic require :( -->
          <img
            v-if="currentApp === 'admin'"
            alt="admin"
            class="wt-navigation-bar__app-pic"
            src="../../assets/components/organisms/wt-navigation-bar/logo-admin-app.svg"
          >
          <img
            v-if="currentApp === 'agent'"
            alt="agent"
            class="wt-navigation-bar__app-pic"
            src="../../assets/components/organisms/wt-navigation-bar/logo-agent-app.svg"
          >
          <img
            v-if="currentApp === 'audit'"
            alt="audit"
            class="wt-navigation-bar__app-pic"
            src="../../assets/components/organisms/wt-navigation-bar/logo-audit-app.svg"
          >
          <img
            v-if="currentApp === 'history'"
            alt="history"
            class="wt-navigation-bar__app-pic"
            src="../../assets/components/organisms/wt-navigation-bar/logo-history-app.svg"
          >
          <img
            v-if="currentApp === 'supervisor'"
            alt="supervisor"
            class="wt-navigation-bar__app-pic"
            src="../../assets/components/organisms/wt-navigation-bar/logo-supervisor-app.svg"
          >
          <img
            v-if="currentApp === 'crm'"
            alt="crm"
            class="wt-navigation-bar__app-pic"
            src="../../assets/components/organisms/wt-navigation-bar/logo-crm-app.svg"
          >
          <wt-icon-btn
            class="wt-navigation-bar__nav-close"
            icon="close"
            @click="isOpened = false"
          ></wt-icon-btn>
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
                > {{ navItem.name || navItem.value }}
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
                ></wt-icon>
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
                      >{{ subNavItem.name || subNavItem.value }}
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
import ExpandTransition from '../transitions/wt-expand-transition.vue';

export default {
  name: 'wt-navigation-bar',
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
  },
  data: () => ({
    isOpened: false,
    expandedName: '',
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

.wt-navigation-bar__menu-btn {
  display: block;
  width: fit-content;
  width: -moz-fit-content;
}

.wt-navigation-bar__nav {
  @extend %wt-scrollbar;
  position: fixed;
  z-index: var(--navigation-bar-z-index);
  top: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  width: var(--navigation-bar-width);
  padding: var(--navigation-bar-padding);
  border-radius: var(--border-radius);
  background: var(--navigation-bar-bg-color);
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
  padding: var(--navigation-bar-header-padding);
}

.wt-navigation-bar__app-pic {
  width: var(--navigation-bar-app-pic-width);
  height: var(--navigation-bar-app-pic-height);
}

.wt-navigation-bar__nav-item-link {
  @extend %typo-body-1;
  display: block;
  padding: var(--navigation-bar-link-padding);
  transition: var(--transition);
  word-wrap: break-word;

  &:hover {
    background: var(--accent-secondary-color);
  }

  &--active {
    background: var(--accent-secondary-color);
  }
}

.wt-navigation-bar__nav-expansion {
  @extend %typo-subtitle-1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--navigation-bar-link-padding);
  outline: none;

  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: var(--navigation-bar-active-expansion-flag-width);
    content: '';
    transition: var(--transition);
    opacity: 0;
    border-radius: var(--border-radius);
    background: var(--primary-color);
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
  max-width: var(--navigation-bar-active-expansion-name-max-width);
  word-wrap: break-word;
}

.wt-navigation-bar__nav-item-link--subnav {
  padding-left: var(--navigation-bar-subnav-padding-left);
}
</style>

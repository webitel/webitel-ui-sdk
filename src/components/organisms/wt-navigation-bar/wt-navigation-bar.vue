<template>
  <aside class="wt-navigation-bar" v-clickaway="close">
    <wt-icon-btn
      class="wt-navigation-bar__menu-btn"
      icon="menu"
      :class="{'active': isOpened}"
      @click="isOpened = !isOpened"
    ></wt-icon-btn>
    <transition name="fade">
      <nav class="wt-navigation-bar__nav" v-show="isOpened">
        <header class="wt-navigation-bar__nav-header">
          <!--        vue cli build target lib cant handle dynamic require :( -->
          <img v-if="currentApp === 'admin'"
               src="../../../assets/components/organisms/wt-navigation-bar/logo-admin-app.svg" alt="admin">
          <img v-if="currentApp === 'agent'"
               src="../../../assets/components/organisms/wt-navigation-bar/logo-agent-app.svg" alt="agent">
          <img v-if="currentApp === 'audit'"
               src="../../../assets/components/organisms/wt-navigation-bar/logo-audit-app.svg" alt="audit">
          <img v-if="currentApp === 'history'"
               src="../../../assets/components/organisms/wt-navigation-bar/logo-history-app.svg" alt="history">
          <img v-if="currentApp === 'supervisor'"
               src="../../../assets/components/organisms/wt-navigation-bar/logo-supervisor-app.svg" alt="supervisor">
          <wt-icon-btn
            class="wt-navigation-bar__nav-close"
            icon="close"
            @click="isOpened = false"
          ></wt-icon-btn>
        </header>
        <wt-divider/>
        <ul class="wt-navigation-bar__nav-list">
          <li
            v-for="(navItem, key) of nav"
            class="wt-navigation-bar__nav-item"
            :key="key"
          >
            <div v-if="!navItem.subNav">
              <div class="wt-navigation-bar__nav-item-wrapper">
                <router-link
                  class="wt-navigation-bar__nav-item-link"
                  :class="{'wt-navigation-bar__nav-item-link--active': currentNav.nav === navItem.value}"
                  :to="navItem.route"
                  @click.native="close"
                > {{ navItem.name || navItem.value }}
                </router-link>
              </div>
            </div>
            <div v-else>
              <button
                class="wt-navigation-bar__nav-expansion"
                :class="{
                  'wt-navigation-bar__nav-expansion--expanded': isExpanded(navItem),
                  'wt-navigation-bar__nav-expansion--active': currentNav.expansion === navItem.value,
                }"
                type="button"
                @click="expand(navItem)"
              >
                <span class="wt-navigation-bar__nav-expansion-name">{{ navItem.name || navItem.value }}</span>
                <wt-icon
                  class="wt-navigation-bar__expansion-arrow"
                  icon="arrow-right"
                  color="active"
                ></wt-icon>
              </button>
              <expand-transition>
                <ul v-if="isExpanded(navItem)">
                  <li
                    v-for="(subNavItem, subNavKey) of navItem.subNav"
                    class="wt-navigation-bar__nav-item"
                    :key="subNavKey"
                  >
                    <div class="wt-navigation-bar__nav-item-wrapper">
                      <router-link
                        class="wt-navigation-bar__nav-item-link wt-navigation-bar__nav-item-link--subnav"
                        :class="{'wt-navigation-bar__nav-item-link--active': currentNav.nav === subNavItem.value}"
                        :to="nestedRoute(subNavItem, navItem)"
                        @click.native="close"
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
import ExpandTransition from '../../transitions/expand-transition.vue';

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

<style lang="scss" scoped>
.wt-navigation-bar__menu-btn {
  display: block;
  width: fit-content;
  width: -moz-fit-content;
}

.wt-navigation-bar__nav {
  @extend %wt-scrollbar;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--navigation-bar-width);
  padding: var(--navigation-bar-padding);
  overflow: auto;
  z-index: var(--navigation-bar-z-index);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-10);
  background: var(--navigation-bar-bg-color);

  // expand animation optimization
  * {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
}

.wt-navigation-bar__nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--navigation-bar-header-padding);
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--navigation-bar-link-padding);
  outline: none;

  &:before {
    opacity: 0;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: var(--navigation-bar-active-expansion-flag-width);
    border-radius: var(--border-radius);
    background: var(--accent-color);
    transition: var(--transition);
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

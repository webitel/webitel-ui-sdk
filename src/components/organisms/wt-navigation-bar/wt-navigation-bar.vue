<template>
  <aside class="wt-navigation-bar">
    <wt-icon-btn icon="menu"></wt-icon-btn>
    <nav class="wt-navigation-bar__nav">
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
        <wt-icon-btn class="wt-navigation-bar__nav-close" icon="close"></wt-icon-btn>
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
                :class="{'wt-navigation-bar__nav-item-link--active': currentNav === navItem.name}"
                :to="navItem.route"
              > {{ navItem.name }}
              </router-link>
            </div>
          </div>
          <div v-else>
            <button
              class="wt-navigation-bar__nav-expansion"
              :class="{'wt-navigation-bar__nav-expansion--expanded': isExpanded(navItem)}"
              type="button"
              @click="expand(navItem)"
            >
              <span class="wt-navigation-bar__nav-expansion-name">{{ navItem.name }}</span>
              <wt-icon
                class="wt-navigation-bar__expansion-arrow"
                icon="arrow-right"
                color="active"
              ></wt-icon>
            </button>
            <!--            <transition name="fade">-->
            <ul v-if="isExpanded(navItem)">
              <li
                v-for="(subNavItem, subNavKey) of navItem.subNav"
                class="wt-navigation-bar__nav-item"
                :key="subNavKey"
              >
                <div class="wt-navigation-bar__nav-item-wrapper">
                  <router-link
                    class="wt-navigation-bar__nav-item-link wt-navigation-bar__nav-item-link--subnav"
                    :class="{'wt-navigation-bar__nav-item-link--active': currentNav === subNavItem.name}"
                    :to="subNavItem.route"
                  >{{ subNavItem.name }}
                  </router-link>
                </div>
              </li>
            </ul>
            <!--            </transition>-->
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'wt-navigation-bar',
  props: {
    currentApp: {
      type: String,
      default: 'admin',
    },
    nav: {
      type: Array,
      default: () => [
        { name: 'Supervisor', route: '/1' },
        {
          name: 'Admin1',
          subNav: [
            { name: 'Supervisor2', route: '/2' },
            { name: 'Supervisor3', route: '/3' },
          ],
        },
        {
          name: 'Admin2',
          subNav: [
            { name: 'Supervisor4', route: '/4' },
            { name: 'Supervisor5', route: '/5' },
          ],
        },
      ],
    },
  },
  data: () => ({
    expandedName: '',
  }),
  computed: {
    currentNav() {
      const path = this.$router.currentRoute.fullPath;
      const navItem = this.nav
        .flat()
        .find((navItem) => path.includes(navItem.route));
      return navItem?.name || null;
    },

    currentExpansion() {
      if (this.currentNav) {
      }
      return null;
    },
  },
  methods: {
    expand(navItem) {
      this.expandedName = this.expandedName !== navItem.name ? navItem.name : '';
    },
    isExpanded(navItem) {
      return this.expandedName === navItem.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-navigation-bar__nav {
  width: 350px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background: var(--main-primary-color);
  height: 600px;
}

.wt-navigation-bar__nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.wt-navigation-bar__nav-list {
  padding: 15px 10px;
}

.wt-navigation-bar__nav-item-link {
  @extend %typo-body-lg;
  display: block;
  padding: 15px;

  &:hover {
    background: var(--main-option-hover-color);
  }

  &--active {
    background: var(--main-option-hover-color);
  }
}

.wt-navigation-bar__nav-expansion {
  @extend %typo-heading-sm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  border: 1px dashed red;

  .wt-navigation-bar__expansion-arrow {
    transition: var(--transition);
  }

  &--expanded .wt-navigation-bar__expansion-arrow {
    transform: rotate(90deg);
  }
}

.wt-navigation-bar__nav-item-link--subnav {
  padding-left: 40px;
}

/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
//.slide-fade-enter-active {
//transition: all .3s ease;
//}

.bigger {
  //height: 0;
}

.fade-enter-active {
  transition: all 5s ease;
}

.fade-leave-to {
  //height: 300px;
}

.bigger.fade-enter-to {
  height: 200px;
  //opacity: 0;
}

.bigger.fade-enter-active {
  //transition: opacity 0s ease;
  transition: height 5s ease;
}

</style>

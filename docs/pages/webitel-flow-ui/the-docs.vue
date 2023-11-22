<template>
  <main class="docs">
    <wt-page-wrapper :actions-panel="false">
      <template #header>
        <wt-headline>
          <wt-navigation-bar :nav="nav" />
          <h1>Webitel Flow UI SDK v. 0.1.8</h1>
        </wt-headline>
      </template>
      <template #main>
        <div class="docs-content-wrapper">
          <router-view />
        </div>
      </template>
    </wt-page-wrapper>
  </main>
</template>

<script>
export default {
  name: 'TheDocs',
  computed: {
    nav() {
      return [
        {
          name: 'Webitel UI',
          value: 'webitel-ui',
          route: '/ui',
        },
        {
          name: 'Webitel CC UI',
          value: 'webitel-cc-ui',
          route: '/cc-ui',
        },
        {
          name: 'Quick Start',
          value: 'quick-start',
          route: '/flow-ui/quick-start',
        },
        // this.componentsNav,
        this.localeNav,
        this.enumsNav,
        this.lookupsNav,
        // this.mixinsNav,
        // this.packagesNav,
        // this.modulesNav,
        // this.scriptsNav,
        // this.storeNav,
      ];
    },
    enumsNav() {
      return {
        name: 'Enums',
        value: 'enums',
        route: '/flow-ui/enums',
        subNav: [
          {
            name: 'Flow App',
            value: 'flow-app',
            route: 'flow-app',
          },
        ],
      };
    },
    localeNav() {
      return {
        name: 'Locale',
        value: 'locale',
        route: '/flow-ui/locale',
        // subNav: [],
      };
    },
    lookupsNav() {
      return {
        name: 'Lookups',
        value: 'lookpus',
        route: '/flow-ui/lookups',
        subNav: [
          {
            name: 'Flow Type Applications',
            value: 'flow-type-applications',
            route: 'flow-type-applications',
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.docs {
  background: var(--page-bg-color);

  .wt-page-wrapper__main > * {
    width: 100%;
  }
}
</style>

<template>
  <main class="docs">
    <wt-page-wrapper :actions-panel="false">
      <template slot="header">
        <wt-headline>
          <wt-navigation-bar :nav="nav"/>
          <h1>Webitel UI SDK v. 0.6.23</h1>
        </wt-headline>
      </template>
      <template slot="main">
        <router-view/>
      </template>
    </wt-page-wrapper>
  </main>
</template>

<script>
export default {
  name: 'the-docs',
  computed: {
    nav() {
      return [
        {
          name: 'Quick Start',
          value: 'quick-start',
          route: '/quick-start',
        },
        this.styleNav,
        this.componentsNav,
        this.filtersNav,
        this.directivesNav,
        this.mixinsNav,
        this.modulesNav,
        this.scriptsNav,
      ];
    },
    styleNav() {
      return {
        name: 'Style',
        value: 'style',
        route: '/style',
        subNav: [
          {
            name: 'Typography',
            value: 'typography',
            route: 'typography',
          },
          {
            name: 'Colors',
            value: 'colors',
            route: 'colors',
          },
        ],
      };
    },
    componentsNav() {
      return {
        name: 'Components',
        value: 'components',
        route: '/components',
        subNav: [
          {
            name: 'Badge',
            value: 'badge',
            route: 'badge',
          },
          {
            name: 'Button',
            value: 'btn',
            route: 'button',
          },
          {
            name: 'Divider',
            value: 'divider',
            route: 'divider',
          },
          {
            name: 'Icons',
            value: 'icon',
            route: 'icon',
          },
          {
            name: 'Indicator',
            value: 'indicator',
            route: 'indicator',
          },
          {
            name: 'Input Info',
            value: 'input-info',
            route: 'input-info',
          },
          {
            name: 'Input Label',
            value: 'input-label',
            route: 'label',
          },
          {
            name: 'Loader',
            value: 'loader',
            route: 'loader',
          },
          {
            name: 'Tooltip',
            value: 'tooltip',
            route: 'tooltip',
          },
          {
            name: 'Checkbox',
            value: 'checkbox',
            route: 'checkbox',
          },
          {
            name: 'Datepicker',
            value: 'datepicker',
            route: 'datepicker',
          },
          {
            name: 'Datetimepicker',
            value: 'datetimepicker',
            route: 'datetimepicker',
          },
          {
            name: 'Input',
            value: 'input',
            route: 'input',
          },
          {
            name: 'Notification',
            value: 'notification',
            route: 'notification',
          },
          {
            name: 'Popup',
            value: 'popup',
            route: 'popup',
          },
          {
            name: 'Radio',
            value: 'radio',
            route: 'radio',
          },
          {
            name: 'Search bar',
            value: 'search-bar',
            route: 'search-bar',
          },
          {
            name: 'Select',
            value: 'select',
            route: 'select',
          },
          {
            name: 'Switcher',
            value: 'switcher',
            route: 'switcher',
          },
          {
            name: 'Tabs',
            value: 'tabs',
            route: 'tabs',
          },
          {
            name: 'Textarea',
            value: 'textarea',
            route: 'textarea',
          },
          {
            name: 'Time input',
            value: 'time-input',
            route: 'time-input',
          },
          {
            name: 'Timepicker',
            value: 'timepicker',
            route: 'timepicker',
          },
          {
            name: 'App Header',
            value: 'app-header',
            route: 'app-header',
          },
          {
            name: 'Headline',
            value: 'headline',
            route: 'headline',
          },
          {
            name: 'Navigation bar',
            value: 'navigation-bar',
            route: 'navigation-bar',
          },
          {
            name: 'Notifications bar',
            value: 'notifications-bar',
            route: 'notifications-bar',
          },
          {
            name: 'Pagination',
            value: 'pagination',
            route: 'pagination',
          },
          {
            name: 'Player',
            value: 'player',
            route: 'player',
          },
          {
            name: 'Page Wrapper',
            value: 'page-wrapper',
            route: 'page-wrapper',
          },
          {
            name: 'Status select',
            value: 'status-select',
            route: 'status-select',
          },
          {
            name: 'Table',
            value: 'table',
            route: 'table',
          },
          {
            name: 'Table actions',
            value: 'table-actions',
            route: 'table-actions',
          },
          {
            name: 'Rounded action',
            value: 'rounded-action',
            route: 'rounded-action',
          },
        ].sort((a, b) => a.name.localeCompare(b.name)),
      };
    },
    filtersNav() {
      return {
        name: 'Filters',
        value: 'filters',
        route: '/filters',
        subNav: [
          {
            name: 'Truncate',
            value: 'truncate',
            route: 'truncate',
          },
        ],
      };
    },
    directivesNav() {
      return {
        name: 'Directives',
        value: 'directives',
        route: '/directives',
        subNav: [
          {
            name: 'Clickaway',
            value: 'clickaway',
            route: 'clickaway',
          },
        ],
      };
    },
    mixinsNav() {
      return {
        name: 'Mixins',
        value: 'mixins',
        route: '/mixins',
        subNav: [
          {
            name: 'Validation',
            value: 'validation',
            route: 'validation',
          },
        ],
      };
    },
    modulesNav() {
      return {
        name: 'Modules',
        value: 'modules',
        route: '/modules',
        subNav: [
          {
            name: 'Data filters',
            value: 'data-filter',
            route: 'data-filter',
          },
          {
            name: 'Export CSV',
            value: 'export-csv',
            route: 'export-csv',
          },
          {
            name: 'Export Files',
            value: 'export-files',
            route: 'export-files',
          },
        ],
      };
    },
    scriptsNav() {
      return {
        name: 'Scripts',
        value: 'scripts',
        route: '/scripts',
        subNav: [
          {
            name: 'Case converters',
            value: 'case-converters',
            route: 'case-converters',
          },
          {
            name: 'Convert duration',
            value: 'convert-duration',
            route: 'convert-duration',
          },
          {
            name: 'Debounce',
            value: 'debounce',
            route: 'debounce',
          },
          {
            name: 'Event bus',
            value: 'event-bus',
            route: 'event-bus',
          },
          {
            name: 'Is empty',
            value: 'is-empty',
            route: 'is-empty',
          },
          {
            name: 'Prettify file size',
            value: 'prettify-file-size',
            route: 'prettify-file-size',
          },
          {
            name: 'Prettify time',
            value: 'prettify-time',
            route: 'prettify-time',
          },
          {
            name: 'Prevent hidden page calls decorator',
            value: 'prevent-hidden-page-calls-decorator',
            route: 'prevent-hidden-page-calls-decorator',
          },
          {
            name: 'Sort query adapters',
            value: 'sort-query-adapters',
            route: 'sort-query-adapters',
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.docs {
  min-height: 100%;
  background: var(--main-page-bg-color);

  .wt-page-wrapper__main > * {
    width: 100%;
  }
}
</style>

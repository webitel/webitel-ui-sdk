<template>
  <main class="docs">
    <wt-page-wrapper :actions-panel="false">
      <template slot="header">
        <wt-headline>
          <wt-navigation-bar :nav="nav"/>
          <h1>Webitel UI SDK v. 0.9.8</h1>
        </wt-headline>
      </template>
      <template slot="main">
        <div class="docs-content-wrapper">
          <router-view/>
        </div>
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
        this.localeNav,
        this.directivesNav,
        this.enumsNav,
        this.mixinsNav,
        this.modulesNav,
        this.scriptsNav,
        this.storeNav,
      ];
    },
    styleNav() {
      return {
        name: 'Style',
        value: 'style',
        route: '/style',
        subNav: [
          {
            name: 'Breakpoints',
            value: 'breakpoints',
            route: 'breakpoints',
          },
          {
            name: 'Colors',
            value: 'colors',
            route: 'colors',
          },
          {
            name: 'Display Helpers',
            value: 'display-helpers',
            route: 'display-helpers',
          },
          {
            name: 'Spacing',
            value: 'spacing',
            route: 'spacing',
          },
          {
            name: 'Typography',
            value: 'typography',
            route: 'typography',
          },
          {
            name: 'Shadows',
            value: 'shadows',
            route: 'shadows',
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
            name: 'Icon Button',
            value: 'icon-btn',
            route: 'icon-btn',
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
            name: 'Progress bar',
            value: 'progress-bar',
            route: 'progress-bar',
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
            name: 'Slider',
            value: 'slider',
            route: 'slider',
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
            name: 'Tags Input',
            value: 'tags-input',
            route: 'tags-input',
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
            name: 'Error page',
            value: 'error-page',
            route: 'error-page',
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
            name: 'Table column select',
            value: 'table-column-select',
            route: 'table-column-select',
          },
          {
            name: 'Rounded action',
            value: 'rounded-action',
            route: 'rounded-action',
          },
          {
            name: 'Filters panel wrapper',
            value: 'filters-panel-wrapper',
            route: 'filters-panel-wrapper',
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
    localeNav() {
      return {
        name: 'Locale',
        value: 'locale',
        route: '/locale',
        // subNav: [],
      };
    },
    enumsNav() {
      return {
        name: 'Enums',
        value: 'enums',
        route: '/enums',
        subNav: [
          {
            name: 'Agent Status',
            value: 'agent-status',
            route: 'agent-status',
          },
          {
            name: 'Webitel Applications',
            value: 'webitel-applications',
            route: 'webitel-applications',
          },
          {
            name: 'Supervisor Sections',
            value: 'supervisor-sections',
            route: 'supervisor-sections',
          },
          {
            name: 'Admin Sections',
            value: 'admin-sections',
            route: 'admin-sections',
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
            name: 'Edit proxy',
            value: 'edit-proxy',
            route: 'edit-proxy',
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
    storeNav() {
      return {
        name: 'Store',
        value: 'store',
        route: '/store',
        subNav: [
          {
            name: 'modules/Base Store Module',
            value: 'base-store-module',
            route: 'base-store-module',
          },
          {
            name: 'helpers/Get Namespaced State',
            value: 'get-namespaced-state',
            route: 'get-namespaced-state',
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

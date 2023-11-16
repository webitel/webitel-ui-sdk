<template>
  <main class="docs">
    <wt-page-wrapper :actions-panel="false">
      <template v-slot:header>
        <wt-headline>
          <wt-navigation-bar :nav="nav"/>
          <h1>Webitel UI SDK v. 3.2.153</h1>
        </wt-headline>
      </template>
      <template v-slot:main>
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
          name: 'Webitel Flow UI',
          value: 'webitel-flow-ui',
          route: '/flow-ui'
        },
        {
          name: 'Changelog',
          value: 'changelog',
          route: '/ui/changelog',
        },
        {
          name: 'Quick Start',
          value: 'quick-start',
          route: '/ui/quick-start',
        },
        this.styleNav,
        this.componentsNav,
        this.composablesNav,
        this.filtersNav,
        this.localeNav,
        this.directivesNav,
        this.enumsNav,
        this.mixinsNav,
        this.modulesNav,
        this.pluginsNav,
        this.scriptsNav,
        this.storeNav,
      ];
    },
    styleNav() {
      return {
        name: 'Style',
        value: 'style',
        route: '/ui/style',
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
            name: 'Elevations',
            value: 'elevations',
            route: 'elevations',
          },
          {
            name: 'Border radius',
            value: 'border-radius',
            route: 'border-radius',
          },
        ],
      };
    },
    componentsNav() {
      return {
        name: 'Components',
        value: 'components',
        route: '/ui/components',
        subNav: [
          {
            name: 'Avatar',
            value: 'avatar',
            route: 'avatar',
          },
          {
            name: 'Badge',
            value: 'badge',
            route: 'badge',
          },
          {
            name: 'Button Select',
            value: 'button-select',
            route: 'button-select',
          },
          {
            name: 'Hint',
            value: 'hint',
            route: 'hint',
          },
          {
            name: 'Context Menu',
            value: 'context-menu',
            route: 'context-menu',
          },
          {
            name: 'Copy Action',
            value: 'copy-action',
            route: 'copy-action',
          },
          {
            name: 'Chip',
            value: 'chip',
            route: 'chip',
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
            name: 'Load bar',
            value: 'load-bar',
            route: 'load-bar',
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
            name: 'Headline Nav',
            value: 'headline-nav',
            route: 'headline-nav',
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
          {
            name: 'Icon Action',
            value: 'icon-action',
            route: 'icon-action',
          },
          {
            name: 'Page Header',
            value: 'page-header',
            route: 'page-header',
          },
          {
            name: 'Item Link',
            value: 'item-link',
            route: 'item-link',
          },
          {
            name: 'Dummy',
            value: 'dummy',
            route: 'dummy',
          },
          {
            name: 'Stepper',
            value: 'stepper',
            route: 'stepper',
          },
          {
            name: 'Expansion Panel',
            value: 'expansion-panel',
            route: 'expansion-panel',
          },
          {
            name: 'Agent Status Timers',
            value: 'agent-status-timers',
            route: 'agent-status-timers',
          },
        ].sort((a, b) => a.name.localeCompare(b.name)),
      };
    },
    filtersNav() {
      return {
        name: 'Filters',
        value: 'filters',
        route: '/ui/filters',
        subNav: [
          {
            name: 'Truncate',
            value: 'truncate',
            route: 'truncate',
          },
        ],
      };
    },
    composablesNav() {
      return {
        name: 'Composables',
        value: 'composables',
        route: '/ui/composables',
        subNav: [
          {
            name: 'useDestroyableSortable',
            value: 'use-destroyable-sortable',
            route: 'use-destroyable-sortable',
          },
          {
            name: 'useRepresentableAgentPauseCause',
            value: 'use-representable-agent-pause-cause',
            route: 'use-representable-agent-pause-cause',
          },
          {
            name: 'useCachedInterval',
            value: 'use-cached-interval',
            route: 'use-cached-interval',
          },
        ],
      };
    },
    localeNav() {
      return {
        name: 'Locale',
        value: 'locale',
        route: '/ui/locale',
        // subNav: [],
      };
    },
    enumsNav() {
      return {
        name: 'Enums',
        value: 'enums',
        route: '/ui/enums',
        subNav: [
          {
            name: 'Abstract User Status',
            value: 'abstract-user-status',
            route: 'abstract-user-status',
          },
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
        route: '/ui/directives',
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
        route: '/ui/mixins',
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
        route: '/ui/modules',
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
          {
            name: 'Notifications',
            value: 'notifications-module',
            route: 'notifications-module',
          },
          {
            name: 'Audit Form',
            value: 'audit-form-module',
            route: 'audit-form-module',
          },
          {
            name: 'Table Store',
            value: 'table-store-module',
            route: 'table-store-module',
          },
          {
            name: 'Card Store',
            value: 'card-store-module',
            route: 'card-store-module',
          },
          {
            name: 'Agent Status Select',
            value: 'agent-status-select-module',
            route: 'agent-status-select-module',
          },
        ],
      };
    },
    pluginsNav() {
      return {
        name: 'Plugins',
        value: 'plugins',
        route: '/ui/plugins',
        subNav: [
          {
            name: 'Breakpoint',
            value: 'breakpoint',
            route: 'breakpoint',
          }
        ],
      };
    },
    scriptsNav() {
      return {
        name: 'Scripts',
        value: 'scripts',
        route: '/ui/scripts',
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
        route: '/ui/store',
        subNav: [
          {
            name: 'modules/Base Store Module',
            value: 'base-store-module',
            route: 'base-store-module',
          },
          {
            name: 'modules/Api Store Module',
            value: 'api-store-module',
            route: 'api-store-module',
          },
          {
            name: 'modules/Reactive Now Store Module',
            value: 'reactive-now-store-module',
            route: 'reactive-now-store-module',
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
  background: var(--page-bg-color);

  .wt-page-wrapper__main > * {
    width: 100%;
  }
}
</style>

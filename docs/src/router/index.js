import Vue from 'vue';
import VueRouter from 'vue-router';

import Changelog from '../components/changelog.vue';
import QuickStart from '../components/pages/quick-start/quick-start.vue';

import StyleDocs from '../components/pages/style/style-docs.vue';
import Breakpoints from '../components/pages/style/breakpoints/breakpoints.vue';
import Colors from '../components/pages/style/colors/colors.vue';
import DisplayHelpers from '../components/pages/style/display-helpers/display-helpers.vue';
import Spacings from '../components/pages/style/spacings/spacings.vue';
import Typography from '../components/pages/style/typography/typography.vue';
import Elevations from '../components/pages/style/elevations/elevations.vue';
import BorderRadius from '../components/pages/style/border-radius/border-radius.vue';

import ComponentsDocs from '../components/pages/components/components-docs.vue';
// atoms
import WtAvatarDocs from '../components/pages/components/atoms/wt-avatar/wt-avatar-docs.vue';
import WtBadgeDocs from '../components/pages/components/atoms/wt-badge/wt-badge-docs.vue';
import WtChipDocs from '../components/pages/components/atoms/wt-chip/wt-chip-docs.vue';
import WtBtnDocs from '../components/pages/components/atoms/wt-button/wt-button-docs.vue';
import WtDividerDocs from '../components/pages/components/atoms/wt-divider/wt-divider-docs.vue';
import WtIconDocs from '../components/pages/components/atoms/wt-icon/wt-icon-docs.vue';
import WtIndicatorDocs
  from '../components/pages/components/atoms/wt-indicator/wt-indicator-docs.vue';
import WtInputInfoDocs
  from '../components/pages/components/atoms/wt-input-info/wt-input-info-docs.vue';
import WtLabelDocs from '../components/pages/components/molecules/wt-label/wt-label-docs.vue';
import WtLoaderDocs from '../components/pages/components/atoms/wt-loader/wt-loader-docs.vue';
import WtLRoundedActionDocs
  from '../components/pages/components/atoms/wt-rounded-action/wt-rounded-action-docs.vue';
import WtTooltipDocs from '../components/pages/components/atoms/wt-tooltip/wt-tooltip-docs.vue';
import WtContextMenuDocs from '../components/pages/components/atoms/wt-context-menu/wt-context-menu-docs.vue';
// molecules
import WtCheckboxDocs
  from '../components/pages/components/molecules/wt-checkbox/wt-checkbox-docs.vue';
import WtTimepickerDocs
  from '../components/pages/components/molecules/wt-timepicker/wt-timepicker-docs.vue';
import WtDatepickerDocs
  from '../components/pages/components/molecules/wt-datepicker/wt-datepicker-docs.vue';
import WtDatetimepickerDocs
  from '../components/pages/components/molecules/wt-datetimepicker/wt-datetimepicker-docs.vue';
import WtIconBtnDocs
  from '../components/pages/components/molecules/wt-icon-btn/wt-icon-btn-docs.vue';
import WtInputDocs from '../components/pages/components/molecules/wt-input/wt-input-docs.vue';
import WtNotificationDocs
  from '../components/pages/components/molecules/wt-notification/wt-notification-docs.vue';
import WtPopupDocs from '../components/pages/components/molecules/wt-popup/wt-popup-docs.vue';
import WtProgressBarDocs
  from '../components/pages/components/molecules/wt-progress-bar/wt-progress-bar-docs.vue';
import WtRadioDocs from '../components/pages/components/molecules/wt-radio/wt-radio-docs.vue';
import WtSearchBarDocs
  from '../components/pages/components/molecules/wt-search-bar/wt-search-bar-docs.vue';
import WtSelectDocs from '../components/pages/components/molecules/wt-select/wt-select-docs.vue';
import WtSliderDocs from '../components/pages/components/molecules/wt-slider/wt-slider-docs.vue';
import WtSwitcherDocs
  from '../components/pages/components/molecules/wt-switcher/wt-switcher-docs.vue';
import WtTabsDocs from '../components/pages/components/molecules/wt-tabs/wt-tabs-docs.vue';
import WtTagsInputDocs
  from '../components/pages/components/molecules/wt-tags-input/wt-tags-input-docs.vue';
import WtTextareaDocs
  from '../components/pages/components/molecules/wt-textarea/wt-textarea-docs.vue';
import WtTimeInputDocs
  from '../components/pages/components/molecules/wt-time-input/wt-time-input-docs.vue';
import WtButtonSelectDocs
  from '../components/pages/components/molecules/wt-button-select/wt-button-select-docs.vue';
import WtHintDocs
  from '../components/pages/components/molecules/wt-hint/wt-hint-docs.vue';
// organisms
import WtAppHeaderDocs
  from '../components/pages/components/organisms/wt-app-header/wt-app-header-docs.vue';
import WtFiltersPanelWrapperDocs
  from '../components/pages/components/organisms/wt-filters-panel-wrapper/wt-table-actions-docs.vue';
import WtErrorPageDocs
  from '../components/pages/components/organisms/wt-error-page/wt-error-page-docs.vue';
import WtHeadlineDocs
  from '../components/pages/components/organisms/wt-headline/wt-headline-docs.vue';
import WtNavigationBarDocs
  from '../components/pages/components/organisms/wt-navigation-bar/wt-navigation-bar-docs.vue';
import WtNotificationsBarDocs
  from '../components/pages/components/organisms/wt-notifications-bar/wt-notifications-bar-docs.vue';
import WtPageWrapperDocs
  from '../components/pages/components/organisms/wt-page-wrapper/wt-page-wrapper-docs.vue';
import WtPaginationDocs
  from '../components/pages/components/organisms/wt-pagination/wt-pagination-docs.vue';
import WtPlayerDocs from '../components/pages/components/organisms/wt-player/wt-player-docs.vue';
import WtStatusSelectDocs
  from '../components/pages/components/organisms/wt-status-select/wt-status-select-docs.vue';
import WtTableDocs from '../components/pages/components/organisms/wt-table/wt-table-docs.vue';
import WtTableActionsDocs
  from '../components/pages/components/organisms/wt-table-actions/wt-table-actions-docs.vue';
import WtTableColumnSelectDocs
  from '../components/pages/components/organisms/wt-table-column-select/wt-table-column-select-docs.vue';

// other
import FiltersDocs from '../components/pages/filters/filters-docs.vue';
import TruncateFilterDocs
  from '../components/pages/filters/truncate-filter/truncate-filter-docs.vue';

import LocaleDocs from '../components/pages/locale/locale-docs.vue';

import DirectivesDocs from '../components/pages/directives/directives-docs.vue';
import ClickawayDirectiveDocs
  from '../components/pages/directives/clickaway-directive/clickaway-directive-docs.vue';

import EnumsDocs from '../components/pages/enums/enums-docs.vue';
import AbstractUserStatusEnumDocs from '../components/pages/enums/abstract-user-status/abstract-user-status-enum-docs.vue';
import AgentStatusEnumDocs from '../components/pages/enums/agent-status/agent-status-enum-docs.vue';
import WebitelApplicationsEnumDocs
  from '../components/pages/enums/webitel-applications/webitel-applications-enum-docs.vue';
import SupevisorSectionsEnumDocs
  from '../components/pages/enums/supervisor-sections/supervisor-sections-enum-docs.vue';
import AdminSectionsEnumDocs
  from '../components/pages/enums/admin-sections/admin-sections-enum-docs.vue';

import MixinsDocs from '../components/pages/mixins/mixins-docs.vue';
import ValidationMixinDocs
  from '../components/pages/mixins/validation-mixin/validation-mixin-docs.vue';

import ModulesDocs from '../components/pages/modules/modules-docs.vue';
import DataFilterModuleDocs
  from '../components/pages/modules/data-filter-module/data-filter-module-docs.vue';
import ExportCSVModuleDocs
  from '../components/pages/modules/export-csv-module/export-csv-module-docs.vue';
import ExportFilesModuleDocs
  from '../components/pages/modules/export-files-module/export-files-module-docs.vue';
import NotificationsModuleDocs
  from '../components/pages/modules/notifications-module/notifications-module-docs.vue';

import ScriptsDocs from '../components/pages/scripts/scripts-docs.vue';
import CaseConverterScriptsDocs
  from '../components/pages/scripts/case-converter-scripts/case-converter-scripts-docs.vue';
import ConvertDurationScriptDocs
  from '../components/pages/scripts/convert-duration-script/convert-duration-script-docs.vue';
import DebounceScriptDocs
  from '../components/pages/scripts/debounce-script/debounce-script-docs.vue';
import EditProxyScriptDocs
  from '../components/pages/scripts/edit-proxy-script/edit-proxy-script-docs.vue';
import EventBusScriptDocs
  from '../components/pages/scripts/event-bus-script/event-bus-script-docs.vue';
import IsEmptyScriptDocs
  from '../components/pages/scripts/is-empty-script/is-empty-script-docs.vue';
import PrettifyFileSizeScriptDocs
  from '../components/pages/scripts/prettify-file-size-script/prettify-file-size-script.vue';
import PrettifyTimeScriptDocs
  from '../components/pages/scripts/prettify-time-script/prettify-time-script-docs.vue';
import PreventHiddenPageCallsDecoratorScriptDocs
  from '../components/pages/scripts/prevent-hidden-page-calls-decorator-script/prevent-hidden-page-calls-decorator-script-docs.vue';
import SortQueryAdapterScriptsDocs
  from '../components/pages/scripts/sort-query-adapter-scripts/sort-query-adapter-scripts-docs.vue';

import StoreDocs from '../components/pages/store/store-docs.vue';
import BaseStoreModuleDocs from '../components/pages/store/modules/base-store-module-docs.vue';
import GetNamespacedStateDocs
  from '../components/pages/store/helpers/get-namespaced-state-docs.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/changelog',
  },
  {
    path: '/changelog',
    name: 'changelog',
    component: Changelog,
  },
  {
    path: '/quick-start',
    name: 'quick-start',
    component: QuickStart,
  },
  {
    path: '/style',
    name: 'style',
    component: StyleDocs,
    children: [
      {
        path: 'breakpoints',
        name: 'breakpoints',
        component: Breakpoints,
      },
      {
        path: 'colors',
        name: 'colors',
        component: Colors,
      },
      {
        path: 'display-helpers',
        name: 'display-helpers',
        component: DisplayHelpers,
      },
      {
        path: 'spacings',
        name: 'spacings',
        component: Spacings,
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography,
      },
      {
        path: 'elevations',
        name: 'elevations',
        component: Elevations,
      },
      {
        path: 'border-radius',
        name: 'border-radius',
        component: BorderRadius,
      },
    ],
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsDocs,
    children: [
      // atoms
      {
        path: 'avatar',
        name: 'avatar-docs',
        component: WtAvatarDocs,
      },
      {
        path: 'badge',
        name: 'badge-docs',
        component: WtBadgeDocs,
      },
      {
        path: 'context-menu',
        name: 'context-menu-docs',
        component: WtContextMenuDocs,
      },
      {
        path: '/components/chip',
        name: 'chip-docs',
        component: WtChipDocs,
      },
      {
        path: 'button',
        name: 'button-docs',
        component: WtBtnDocs,
      },
      {
        path: 'divider',
        name: 'divider-docs',
        component: WtDividerDocs,
      },
      {
        path: 'icon',
        name: 'icon-docs',
        component: WtIconDocs,
      },
      {
        path: 'indicator',
        name: 'indicator-docs',
        component: WtIndicatorDocs,
      },
      {
        path: 'input-info',
        name: 'input-info-docs',
        component: WtInputInfoDocs,
      },
      {
        path: 'label',
        name: 'label-docs',
        component: WtLabelDocs,
      },
      {
        path: 'loader',
        name: 'loader-docs',
        component: WtLoaderDocs,
      },
      {
        path: 'rounded-action',
        name: 'rounded-action-docs',
        component: WtLRoundedActionDocs,
      },
      {
        path: 'tooltip',
        name: 'tooltip-docs',
        component: WtTooltipDocs,
      },

      // molecules
      {
        path: 'button-select',
        name: 'button-select',
        component: WtButtonSelectDocs,
      },
      {
        path: 'hint',
        name: 'hint',
        component: WtHintDocs,
      },
      {
        path: 'checkbox',
        name: 'checkbox-docs',
        component: WtCheckboxDocs,
      },
      {
        path: 'timepicker',
        name: 'timepicker-docs',
        component: WtTimepickerDocs,
      },
      {
        path: 'datepicker',
        name: 'datepicker-docs',
        component: WtDatepickerDocs,
      },
      {
        path: 'datetimepicker',
        name: 'datetimepicker-docs',
        component: WtDatetimepickerDocs,
      },
      {
        path: 'icon-btn',
        name: 'icon-btn-docs',
        component: WtIconBtnDocs,
      },
      {
        path: 'input',
        name: 'input-docs',
        component: WtInputDocs,
      },
      {
        path: 'notification',
        name: 'notification-docs',
        component: WtNotificationDocs,
      },
      {
        path: 'popup',
        name: 'popup-docs',
        component: WtPopupDocs,
      },
      {
        path: 'progress-bar',
        name: 'progress-bar-docs',
        component: WtProgressBarDocs,
      },
      {
        path: 'radio',
        name: 'radio-docs',
        component: WtRadioDocs,
      },
      {
        path: 'search-bar',
        name: 'search-bar-docs',
        component: WtSearchBarDocs,
      },
      {
        path: 'select',
        name: 'select-docs',
        component: WtSelectDocs,
      },
      {
        path: 'slider',
        name: 'slider-docs',
        component: WtSliderDocs,
      },
      {
        path: 'switcher',
        name: 'switcher-docs',
        component: WtSwitcherDocs,
      },
      {
        path: 'tabs',
        name: 'tabs-docs',
        component: WtTabsDocs,
      },
      {
        path: 'tags-input',
        name: 'tags-input-docs',
        component: WtTagsInputDocs,
      },
      {
        path: 'textarea',
        name: 'textarea-docs',
        component: WtTextareaDocs,
      },
      {
        path: 'time-input',
        name: 'time-input-docs',
        component: WtTimeInputDocs,
      },

      // organisms
      {
        path: 'app-header',
        name: 'app-header-docs',
        component: WtAppHeaderDocs,
      },
      {
        path: 'filters-panel-wrapper',
        name: 'filters-panel-wrapper-docs',
        component: WtFiltersPanelWrapperDocs,
      },
      {
        path: 'headline',
        name: 'headline-docs',
        component: WtHeadlineDocs,
      },
      {
        path: 'error-page',
        name: 'error-page-docs',
        component: WtErrorPageDocs,
      },
      {
        path: 'navigation-bar',
        name: 'navigation-bar-docs',
        component: WtNavigationBarDocs,
      },
      {
        path: 'notifications-bar',
        name: 'notifications-bar-docs',
        component: WtNotificationsBarDocs,
      },
      {
        path: 'page-wrapper',
        name: 'page-wrapper-docs',
        component: WtPageWrapperDocs,
      },
      {
        path: 'pagination',
        name: 'pagination-docs',
        component: WtPaginationDocs,
      },
      {
        path: 'player',
        name: 'player-docs',
        component: WtPlayerDocs,
      },
      {
        path: 'status-select',
        name: 'status-select-docs',
        component: WtStatusSelectDocs,
      },
      {
        path: 'table',
        name: 'table-docs',
        component: WtTableDocs,
      },
      {
        path: 'table-actions',
        name: 'table-actions-docs',
        component: WtTableActionsDocs,
      },
      {
        path: 'table-column-select',
        name: 'table-column-select-docs',
        component: WtTableColumnSelectDocs,
      },
    ],
  },
  {
    path: '/filters',
    name: 'filters',
    component: FiltersDocs,
    children: [
      {
        path: 'truncate',
        name: 'truncate',
        component: TruncateFilterDocs,
      },
    ],
  },
  {
    path: '/locale',
    name: 'locale',
    component: LocaleDocs,
    children: [
      // {
      //   path: 'truncate',
      //   name: 'truncate',
      //   component: TruncateFilterDocs,
      // },
    ],
  },
  {
    path: '/directives',
    name: 'directives',
    component: DirectivesDocs,
    children: [
      {
        path: 'clickaway',
        name: 'clickaway',
        component: ClickawayDirectiveDocs,
      },
    ],
  },
  {
    path: '/enums',
    name: 'enums',
    component: EnumsDocs,
    children: [
      {
        path: 'abstract-user-status',
        name: 'abstract-user-status',
        component: AbstractUserStatusEnumDocs,
      },
      {
        path: 'agent-status',
        name: 'agent-status',
        component: AgentStatusEnumDocs,
      },
      {
        path: 'webitel-applications',
        name: 'webitel-applications',
        component: WebitelApplicationsEnumDocs,
      },
      {
        path: 'supervisor-sections',
        name: 'supervisor-sections',
        component: SupevisorSectionsEnumDocs,
      },
      {
        path: 'admin-sections',
        name: 'admin-sections',
        component: AdminSectionsEnumDocs,
      },
    ],
  },
  {
    path: '/mixins',
    name: 'mixins',
    component: MixinsDocs,
    children: [
      {
        path: 'validation',
        name: 'validation',
        component: ValidationMixinDocs,
      },
    ],
  },
  {
    path: '/modules',
    name: 'modules',
    component: ModulesDocs,
    children: [
      {
        path: 'data-filter',
        name: 'data-filter',
        component: DataFilterModuleDocs,
      },
      {
        path: 'export-csv',
        name: 'export-csv',
        component: ExportCSVModuleDocs,
      },
      {
        path: 'export-files',
        name: 'export-files',
        component: ExportFilesModuleDocs,
      },
      {
        path: 'notifications-module',
        name: 'notifications-module',
        component: NotificationsModuleDocs,
      },
    ],
  },
  {
    path: '/scripts',
    name: 'scripts',
    component: ScriptsDocs,
    children: [
      {
        path: 'case-converters',
        name: 'case-converters',
        component: CaseConverterScriptsDocs,
      },
      {
        path: 'convert-duration',
        name: 'convert-duration',
        component: ConvertDurationScriptDocs,
      },
      {
        path: 'debounce',
        name: 'debounce',
        component: DebounceScriptDocs,
      },
      {
        path: 'edit-proxy',
        name: 'edit-proxy',
        component: EditProxyScriptDocs,
      },
      {
        path: 'event-bus',
        name: 'event-bus',
        component: EventBusScriptDocs,
      },
      {
        path: 'is-empty',
        name: 'is-empty',
        component: IsEmptyScriptDocs,
      },
      {
        path: 'prettify-file-size',
        name: 'prettify-file-size',
        component: PrettifyFileSizeScriptDocs,
      },
      {
        path: 'prettify-time',
        name: 'prettify-time',
        component: PrettifyTimeScriptDocs,
      },
      {
        path: 'prevent-hidden-page-calls-decorator',
        name: 'prevent-hidden-page-calls-decorator',
        component: PreventHiddenPageCallsDecoratorScriptDocs,
      },
      {
        path: 'sort-query-adapters',
        name: 'sort-query-adapters',
        component: SortQueryAdapterScriptsDocs,
      },
    ],
  },
  {
    path: '/store',
    name: 'store',
    component: StoreDocs,
    children: [
      {
        path: 'base-store-module',
        name: 'base-store-module',
        component: BaseStoreModuleDocs,
      },
      {
        path: 'get-namespaced-state',
        name: 'get-namespaced-state',
        component: GetNamespacedStateDocs,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
      // Or for Vue 3:
      // return {el: to.hash}
    }
    return { x: 0, y: 0 };
  },
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';

import QuickStart from '../components/pages/quick-start/quick-start.vue';

import StyleDocs from '../components/pages/style/style-docs.vue';
import Typography from '../components/pages/style/typography/typography.vue';
import Colors from '../components/pages/style/colors/colors.vue';

import ComponentsDocs from '../components/pages/components/components-docs.vue';
// atoms
import WtBadgeDocs from '../components/pages/components/atoms/wt-badge/wt-badge-docs.vue';
import WtBtnDocs from '../components/pages/components/atoms/wt-button/wt-button-docs.vue';
import WtDividerDocs from '../components/pages/components/atoms/wt-divider/wt-divider-docs.vue';
import WtIconDocs from '../components/pages/components/atoms/wt-icon/wt-icon-docs.vue';
import WtIndicatorDocs
  from '../components/pages/components/atoms/wt-indicator/wt-indicator-docs.vue';
import WtInputInfoDocs
  from '../components/pages/components/atoms/wt-input-info/wt-input-info-docs.vue';
import WtLabelDocs from '../components/pages/components/atoms/wt-label/wt-label-docs.vue';
import WtLoaderDocs from '../components/pages/components/atoms/wt-loader/wt-loader-docs.vue';
import WtLRoundedActionDocs from '../components/pages/components/atoms/wt-rounded-action/wt-rounded-action-docs.vue';
import WtTooltipDocs from '../components/pages/components/atoms/wt-tooltip/wt-tooltip-docs.vue';
// molecules
import WtCheckboxDocs
  from '../components/pages/components/molecules/wt-checkbox/wt-checkbox-docs.vue';
import WtTimepickerDocs
  from '../components/pages/components/molecules/wt-timepicker/wt-timepicker-docs.vue';
import WtDatepickerDocs
  from '../components/pages/components/molecules/wt-datepicker/wt-datepicker-docs.vue';
import WtDatetimepickerDocs
  from '../components/pages/components/molecules/wt-datetimepicker/wt-datetimepicker-docs.vue';
import WtInputDocs from '../components/pages/components/molecules/wt-input/wt-input-docs.vue';
import WtNotificationDocs
  from '../components/pages/components/molecules/wt-notification/wt-notification-docs.vue';
import WtPopupDocs from '../components/pages/components/molecules/wt-popup/wt-popup-docs.vue';
import WtRadioDocs from '../components/pages/components/molecules/wt-radio/wt-radio-docs.vue';
import WtSearchBarDocs
  from '../components/pages/components/molecules/wt-search-bar/wt-search-bar-docs.vue';
import WtSelectDocs from '../components/pages/components/molecules/wt-select/wt-select-docs.vue';
import WtSwitcherDocs
  from '../components/pages/components/molecules/wt-switcher/wt-switcher-docs.vue';
import WtTabsDocs from '../components/pages/components/molecules/wt-tabs/wt-tabs-docs.vue';
import WtTextareaDocs
  from '../components/pages/components/molecules/wt-textarea/wt-textarea-docs.vue';
import WtTimeInputDocs
  from '../components/pages/components/molecules/wt-time-input/wt-time-input-docs.vue';
// organisms
import WtAppHeaderDocs from '../components/pages/components/organisms/wt-app-header/wt-app-header-docs.vue';
import WtHeadlineDocs from '../components/pages/components/organisms/wt-headline/wt-headline-docs.vue';
import WtNavigationBarDocs
  from '../components/pages/components/organisms/wt-navigation-bar/wt-navigation-bar-docs.vue';
import WtNotificationsBarDocs
  from '../components/pages/components/organisms/wt-notifications-bar/wt-notifications-bar-docs.vue';
import WtPageWrapperDocs
  from '../components/pages/components/organisms/wt-page-wrapper/wt-page-wrapper-docs.vue';
import WtPaginationDocs from '../components/pages/components/organisms/wt-pagination/wt-pagination-docs.vue';
import WtPlayerDocs from '../components/pages/components/organisms/wt-player/wt-player-docs.vue';
import WtStatusSelectDocs
  from '../components/pages/components/organisms/wt-status-select/wt-status-select-docs.vue';
import WtTableDocs from '../components/pages/components/organisms/wt-table/wt-table-docs.vue';
import WtTableActionsDocs
  from '../components/pages/components/organisms/wt-table-actions/wt-table-actions-docs.vue';

// other
import FiltersDocs from '../components/pages/filters/filters-docs.vue';
import TruncateFilterDocs from '../components/pages/filters/truncate-filter/truncate-filter-docs.vue';

import DirectivesDocs from '../components/pages/directives/directives-docs.vue';
import ClickawayDirectiveDocs from '../components/pages/directives/clickaway-directive/clickaway-directive-docs.vue';

import MixinsDocs from '../components/pages/mixins/mixins-docs.vue';
import ValidationMixinDocs from '../components/pages/mixins/validation-mixin/validation-mixin-docs.vue';

import ModulesDocs from '../components/pages/modules/modules-docs.vue';
import DataFilterModuleDocs from '../components/pages/modules/data-filter-module/data-filter-module-docs.vue';
import ExportCSVModuleDocs from '../components/pages/modules/export-csv-module/export-csv-module-docs.vue';
import ExportFilesModuleDocs from '../components/pages/modules/export-files-module/export-files-module-docs.vue';

import ScriptsDocs from '../components/pages/scripts/scripts-docs.vue';
import CaseConverterScriptsDocs from '../components/pages/scripts/case-converter-scripts/case-converter-scripts-docs.vue';
import ConvertDurationScriptDocs from '../components/pages/scripts/convert-duration-script/convert-duration-script-docs.vue';
import DebounceScriptDocs from '../components/pages/scripts/debounce-script/debounce-script-docs.vue';
import EventBusScriptDocs from '../components/pages/scripts/event-bus-script/event-bus-script-docs.vue';
import IsEmptyScriptDocs from '../components/pages/scripts/is-empty-script/is-empty-script-docs.vue';
import PrettifyFileSizeScriptDocs from '../components/pages/scripts/prettify-file-size-script/prettify-file-size-script.vue';
import PrettifyTimeScriptDocs from '../components/pages/scripts/prettify-time-script/prettify-time-script-docs.vue';
import PreventHiddenPageCallsDecoratorScriptDocs from '../components/pages/scripts/prevent-hidden-page-calls-decorator-script/prevent-hidden-page-calls-decorator-script-docs.vue';
import SortQueryAdapterScriptsDocs from '../components/pages/scripts/sort-query-adapter-scripts/sort-query-adapter-scripts-docs.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/quick-start',
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
        path: 'typography',
        name: 'typography',
        component: Typography,
      },
      {
        path: 'colors',
        name: 'colors',
        component: Colors,
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
        path: '/components/badge',
        name: 'badge-docs',
        component: WtBadgeDocs,
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
        path: 'headline',
        name: 'headline-docs',
        component: WtHeadlineDocs,
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

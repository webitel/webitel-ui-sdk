import Vue from 'vue';
import WtIcon from './atoms/wt-icon/wt-icon.vue';
import WtIndicator from './atoms/wt-indicator/wt-indicator.vue';
import WtInputInfo from './atoms/wt-input-info/wt-input-info.vue';
import WtButton from './atoms/wt-button/wt-button.vue';
import WtBadge from './atoms/wt-badge/wt-badge.vue';
import WtDivider from './atoms/wt-divider/wt-divider.vue';
import WtTooltip from './atoms/wt-tooltip/wt-tooltip.vue';
import WtRoundedAction from './atoms/wt-rounded-action/wt-rounded-action.vue';
import WtLoader from './atoms/wt-loader/wt-loader.vue';

import WtCheckbox from './molecules/wt-checkbox/wt-checkbox.vue';
import WtDatepicker from './molecules/wt-datepicker/wt-datepicker.vue';
import WtDatetimepicker from './molecules/wt-datetimepicker/wt-datetimepicker.vue';
import WtIconBtn from './molecules/wt-icon-btn/wt-icon-btn.vue';
import WtInput from './molecules/wt-input/wt-input.vue';
import WtNotification from './molecules/wt-notification/wt-notification.vue';
import WtPopup from './molecules/wt-popup/wt-popup.vue';
import WtProgressBar from './molecules/wt-progress-bar/wt-progress-bar.vue';
import WtRadio from './molecules/wt-radio/wt-radio.vue';
import WtSearchBar from './molecules/wt-search-bar/wt-search-bar.vue';
import WtSelect from './molecules/wt-select/wt-select.vue';
import WtSwitcher from './molecules/wt-switcher/wt-switcher.vue';
import WtTabs from './molecules/wt-tabs/wt-tabs.vue';
import WtTagsInput from './molecules/wt-tags-input/wt-tags-input.vue';
import WtTimeInput from './molecules/wt-time-input/wt-time-input.vue';
import WtTextarea from './molecules/wt-textarea/wt-textarea.vue';
import WtTimepicker from './molecules/wt-timepicker/wt-timepicker.vue';
import WtLabel from './molecules/wt-label/wt-label.vue';

import WtAppHeader from './organisms/wt-app-header/wt-app-header.vue';
import WtAppNavigator from './organisms/wt-app-header/wt-app-navigator.vue';
import WtFiltersPanelWrapper from './organisms/wt-filters-panel-wrapper/wt-filters-panel-wrapper.vue';
import WtHeaderActions from './organisms/wt-app-header/wt-header-actions.vue';
import WtErrorPage from './organisms/wt-error-page/wt-error-page.vue';
import WtHeadline from './organisms/wt-headline/wt-headline.vue';
import WtNavigationBar from './organisms/wt-navigation-bar/wt-navigation-bar.vue';
import WtNotificationsBar from './organisms/wt-notifications-bar/wt-notifications-bar.vue';
import WtPageWrapper from './organisms/wt-page-wrapper/wt-page-wrapper.vue';
import WtPagination from './organisms/wt-pagination/wt-pagination.vue';
import WtPlayer from './organisms/wt-player/wt-player.vue';
import WtStatusSelect from './organisms/wt-status-select/wt-status-select.vue';
import WtTable from './organisms/wt-table/wt-table.vue';
import WtTableActions from './organisms/wt-table-actions/wt-table-actions.vue';
import WtTableColumnSelect from './organisms/wt-table-column-select/wt-table-column-select.vue';

const Components = {
  WtIcon,
  WtIndicator,
  WtInputInfo,
  WtButton,
  WtBadge,
  WtDivider,
  WtTooltip,
  WtLabel,
  WtLoader,
  WtRoundedAction,
  WtCheckbox,
  WtDatepicker,
  WtDatetimepicker,
  WtIconBtn,
  WtInput,
  WtNotification,
  WtPopup,
  WtProgressBar,
  WtRadio,
  WtSearchBar,
  WtSelect,
  WtSwitcher,
  WtTabs,
  WtTagsInput,
  WtTimeInput,
  WtTimepicker,
  WtTextarea,
  WtAppHeader,
  WtHeadline,
  WtNavigationBar,
  WtAppNavigator,
  WtFiltersPanelWrapper,
  WtHeaderActions,
  WtErrorPage,
  WtNotificationsBar,
  WtPageWrapper,
  WtPagination,
  WtPlayer,
  WtStatusSelect,
  WtTable,
  WtTableActions,
  WtTableColumnSelect,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

import { defineAsyncComponent } from 'vue';

// Core components - kept synchronous (used on almost every page, small)
import WtIcon from './wt-icon/wt-icon.vue';
import WtLoader from './wt-loader/wt-loader.vue';
import WtLabel from './wt-label/wt-label.vue';
import WtBadge from './wt-badge/wt-badge.vue';
import WtBadgeNew from './wt-badge-new/wt-badge.vue';
import WtDivider from './wt-divider/wt-divider.vue';
import WtTooltip from './wt-tooltip/wt-tooltip.vue';
import WtButton from './wt-button/wt-button.vue';
import WtInput from './wt-input/wt-input.vue';
import WtSelect from './wt-select/wt-select.vue';
import WtCheckbox from './wt-checkbox/wt-checkbox.vue';
import WtRadio from './wt-radio/wt-radio.vue';
import WtSwitcher from './wt-switcher/wt-switcher.vue';
import WtTextarea from './wt-textarea/wt-textarea.vue';
import WtChip from './wt-chip/wt-chip.vue';
import WtAvatar from './wt-avatar/wt-avatar.vue';
import WtIndicator from './wt-indicator/wt-indicator.vue';
import WtInputInfo from './wt-input-info/wt-input-info.vue';
import WtIconBtn from './wt-icon-btn/wt-icon-btn.vue';
import WtIconAction from './wt-icon-action/wt-icon-action.vue';
import WtRoundedAction from './wt-rounded-action/wt-rounded-action.vue';
import WtHint from './wt-hint/wt-hint.vue';
import WtProgressBar from './wt-progress-bar/wt-progress-bar.vue';
import WtInputNumber from './wt-input-number/wt-input-number.vue';
import WtInputText from './wt-input-text/wt-input-text.vue';
import WtIntersectionObserver from './wt-intersection-observer/wt-intersection-observer.vue';
import WtItemLink from './wt-item-link/wt-item-link.vue';
import WtLoadBar from './wt-load-bar/wt-load-bar.vue';
import WtLogo from './wt-logo/wt-logo.vue';
import WtMessage from './wt-message/wt-message.vue';
import WtNavigationBar from './wt-navigation-bar/wt-navigation-bar.vue';
import WtNotification from './wt-notification/wt-notification.vue';
import WtPopup from './wt-popup/wt-popup.vue';
import WtAppHeader from './wt-app-header/wt-app-header.vue';
import WtAppNavigator from './wt-app-header/wt-app-navigator.vue';
import WtHeaderActions from './wt-app-header/wt-header-actions.vue';
import WtPageWrapper from './wt-page-wrapper/wt-page-wrapper.vue';
import WtBreadcrumb from './wt-breadcrumb/wt-breadcrumb.vue';
import WtHeadline from './wt-headline/wt-headline.vue';
import WtEmpty from './wt-empty/wt-empty.vue';
import WtImage from './wt-image/wt-image.vue';
import WtReplaceTransition from './transitions/cases/wt-replace-transition.vue';

// Async components - heavy or rarely used components
const WtActionBar = defineAsyncComponent(() => import('./wt-action-bar/wt-action-bar.vue'));
const WtButtonSelect = defineAsyncComponent(() => import('./wt-button-select/wt-button-select.vue'));
const WtConfirmDialog = defineAsyncComponent(() => import('./wt-confirm-dialog/wt-confirm-dialog.vue'));
const WtContextMenu = defineAsyncComponent(() => import('./wt-context-menu/wt-context-menu.vue'));
const WtCopyAction = defineAsyncComponent(() => import('./wt-copy-action/wt-copy-action.vue'));
const WtDatepicker = defineAsyncComponent(() => import('./wt-datepicker/wt-datepicker.vue'));
const WtDualPanel = defineAsyncComponent(() => import('./wt-dual-panel/wt-dual-panel.vue'));
const WtDummy = defineAsyncComponent(() => import('./wt-dummy/wt-dummy.vue'));
const WtErrorPage = defineAsyncComponent(() => import('./wt-error-page/wt-error-page.vue'));
const WtExpansionPanel = defineAsyncComponent(() => import('./wt-expansion-panel/wt-expansion-panel.vue'));
const WtFiltersPanelWrapper = defineAsyncComponent(() => import('./wt-filters-panel-wrapper/wt-filters-panel-wrapper.vue'));
const WtGalleria = defineAsyncComponent(() => import('./wt-galleria/wt-galleria.vue'));
const WtNotificationsBar = defineAsyncComponent(() => import('./wt-notifications-bar/wt-notifications-bar.vue'));
const WtPageHeader = defineAsyncComponent(() => import('./wt-page-header/wt-page-header.vue'));
const WtPagination = defineAsyncComponent(() => import('./wt-pagination/wt-pagination.vue'));
const WtPlayer = defineAsyncComponent(() => import('./wt-player/wt-player.vue'));
const WtPopover = defineAsyncComponent(() => import('./wt-popover/wt-popover.vue'));
const WtSearchBar = defineAsyncComponent(() => import('./wt-search-bar/wt-search-bar.vue'));
const WtSlider = defineAsyncComponent(() => import('./wt-slider/wt-slider.vue'));
const WtStatusSelect = defineAsyncComponent(() => import('./wt-status-select/wt-status-select.vue'));
const WtStepper = defineAsyncComponent(() => import('./wt-stepper/wt-stepper.vue'));
const WtTable = defineAsyncComponent(() => import('./wt-table/wt-table.vue'));
const WtTableActions = defineAsyncComponent(() => import('./wt-table-actions/wt-table-actions.vue'));
const WtTableColumnSelect = defineAsyncComponent(() => import('./wt-table-column-select/wt-table-column-select.vue'));
const WtTabs = defineAsyncComponent(() => import('./wt-tabs/wt-tabs.vue'));
const WtTagsInput = defineAsyncComponent(() => import('./wt-tags-input/wt-tags-input.vue'));
const WtTimeInput = defineAsyncComponent(() => import('./wt-time-input/wt-time-input.vue'));
const WtTimepicker = defineAsyncComponent(() => import('./wt-timepicker/wt-timepicker.vue'));
const WtTree = defineAsyncComponent(() => import('./wt-tree/wt-tree.vue'));
const WtTreeTable = defineAsyncComponent(() => import('./wt-tree-table/wt-tree-table.vue'));
const WtVidstackPlayer = defineAsyncComponent(() => import('./wt-vidstack-player/wt-vidstack-player.vue'));
const WtChatEmoji = defineAsyncComponent(() => import('./on-demand/wt-chat-emoji/wt-chat-emoji.vue'));
const WtDisplayChipItems = defineAsyncComponent(() => import('./on-demand/wt-display-chip-items/wt-display-chip-items.vue'));
const WtNavigationMenu = defineAsyncComponent(() => import('./on-demand/wt-navigation-menu/components/wt-navigation-menu.vue'));
const WtSelectionPopup = defineAsyncComponent(() => import('./on-demand/wt-selection-popup/wt-selection-popup.vue'));
const WtStartPage = defineAsyncComponent(() => import('./on-demand/wt-start-page/components/wt-start-page.vue'));
const WtTypeExtensionValueInput = defineAsyncComponent(() => import('./on-demand/wt-type-extension-value-input/wt-type-extension-value-input.vue'));

const Components = {
	WtActionBar,
	WtImage,
	WtEmpty,
	WtLogo,
	WtAvatar,
	WtBadge,
	WtBadgeNew,
	WtMessage,
	WtIcon,
	WtIndicator,
	WtInputInfo,
	WtButton,
	WtChip,
	WtConfirmDialog,
	WtDivider,
	WtTooltip,
	WtLabel,
	WtLoader,
	WtRoundedAction,
	WtReplaceTransition,
	WtCheckbox,
	WtDatepicker,
	WtIconBtn,
	WtInput,
	WtInputNumber,
	WtInputText,
	WtIntersectionObserver,
	WtHint,
	WtNotification,
	WtPopup,
	WtProgressBar,
	WtRadio,
	WtSearchBar,
	WtSelect,
	WtSlider,
	WtSwitcher,
	WtTabs,
	WtTagsInput,
	WtTimeInput,
	WtTimepicker,
	WtTextarea,
	WtAppHeader,
	WtHeadline,
	WtBreadcrumb,
	WtNavigationBar,
	WtAppNavigator,
	WtFiltersPanelWrapper,
	WtHeaderActions,
	WtErrorPage,
	WtNotificationsBar,
	WtPageWrapper,
	WtDualPanel,
	WtPagination,
	WtPlayer,
	WtPopover,
	WtStatusSelect,
	WtTable,
	WtTree,
	WtTreeTable,
	WtTableActions,
	WtTableColumnSelect,
	WtButtonSelect,
	WtContextMenu,
	WtCopyAction,
	WtLoadBar,
	WtIconAction,
	WtPageHeader,
	WtItemLink,
	WtDummy,
	WtStepper,
	WtExpansionPanel,
	WtNavigationMenu,
	WtStartPage,
	WtSelectionPopup,
	WtDisplayChipItems,
	WtGalleria,
	WtVidstackPlayer,
	WtChatEmoji,
};

export {
	WtActionBar,
	WtAppHeader,
	WtAppNavigator,
	WtAvatar,
	WtBadge,
	WtBadgeNew,
	WtBreadcrumb,
	WtButton,
	WtButtonSelect,
	WtChatEmoji,
	WtCheckbox,
	WtChip,
	WtConfirmDialog,
	WtContextMenu,
	WtCopyAction,
	WtDatepicker,
	WtDisplayChipItems,
	WtDivider,
	WtDualPanel,
	WtDummy,
	WtEmpty,
	WtErrorPage,
	WtExpansionPanel,
	WtFiltersPanelWrapper,
	WtGalleria,
	WtHeaderActions,
	WtHeadline,
	WtHint,
	WtIcon,
	WtIconAction,
	WtIconBtn,
	WtImage,
	WtIndicator,
	WtInput,
	WtInputInfo,
	WtInputNumber,
	WtInputText,
	WtIntersectionObserver,
	WtItemLink,
	WtLabel,
	WtLoadBar,
	WtLoader,
	WtLogo,
	WtMessage,
	WtNavigationBar,
	WtNavigationMenu,
	WtNotification,
	WtNotificationsBar,
	WtPageHeader,
	WtPageWrapper,
	WtPagination,
	WtPlayer,
	WtPopover,
	WtPopup,
	WtProgressBar,
	WtRadio,
	WtReplaceTransition,
	WtRoundedAction,
	WtSearchBar,
	WtSelect,
	WtSelectionPopup,
	WtSlider,
	WtStartPage,
	WtStatusSelect,
	WtStepper,
	WtSwitcher,
	WtTable,
	WtTableActions,
	WtTableColumnSelect,
	WtTabs,
	WtTagsInput,
	WtTextarea,
	WtTimeInput,
	WtTimepicker,
	WtTooltip,
	WtTree,
	WtTreeTable,
	WtTypeExtensionValueInput,
	WtVidstackPlayer,
};

export default Components;

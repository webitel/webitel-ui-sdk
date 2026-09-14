import { defineAsyncComponent } from 'vue';

import WtReplaceTransition from './transitions/cases/wt-replace-transition.vue';
import WtAppHeader from './wt-app-header/wt-app-header.vue';
import WtAppNavigator from './wt-app-header/wt-app-navigator.vue';
import WtHeaderActions from './wt-app-header/wt-header-actions.vue';
import WtAvatar from './wt-avatar/wt-avatar.vue';
import WtBadge from './wt-badge/wt-badge.vue';
import WtBadgeNew from './wt-badge-new/wt-badge.vue';
import WtBreadcrumb from './wt-breadcrumb/wt-breadcrumb.vue';
import WtButton from './wt-button/wt-button.vue';
import WtCallMediaMetric from './wt-call-media-metric/wt-call-media-metric.vue';
import WtCard from './wt-card/wt-card.vue';
import WtCheckbox from './wt-checkbox/wt-checkbox.vue';
import WtChip from './wt-chip/wt-chip.vue';
import WtDatetimeText from './wt-datetime-text/wt-datetime-text.vue';
import WtDivider from './wt-divider/wt-divider.vue';
import WtEmpty from './wt-empty/wt-empty.vue';
import WtHeadline from './wt-headline/wt-headline.vue';
import WtHint from './wt-hint/wt-hint.vue';
// Core components - kept synchronous (used on almost every page, small)
import WtIcon from './wt-icon/wt-icon.vue';
import WtIconAction from './wt-icon-action/wt-icon-action.vue';
import WtIconBtn from './wt-icon-btn/wt-icon-btn.vue';
import WtImage from './wt-image/wt-image.vue';
import WtIndicator from './wt-indicator/wt-indicator.vue';
import WtInputNumber from './wt-input-number/wt-input-number.vue';
import WtInputText from './wt-input-text/wt-input-text.vue';
import WtIntersectionObserver from './wt-intersection-observer/wt-intersection-observer.vue';
import WtItemLink from './wt-item-link/wt-item-link.vue';
import WtLabel from './wt-label/wt-label.vue';
import WtLoadBar from './wt-load-bar/wt-load-bar.vue';
import WtLoader from './wt-loader/wt-loader.vue';
import WtLogo from './wt-logo/wt-logo.vue';
import WtMessage from './wt-message/wt-message.vue';
import WtMultiSelect from './wt-multi-select/wt-multi-select.vue';
import WtNavigationBar from './wt-navigation-bar/wt-navigation-bar.vue';
import WtPageWrapper from './wt-page-wrapper/wt-page-wrapper.vue';
import WtPassword from './wt-password/wt-password.vue';
import WtPopup from './wt-popup/wt-popup.vue';
import WtProgressBar from './wt-progress-bar/wt-progress-bar.vue';
import WtRadio from './wt-radio/wt-radio.vue';
import WtRoundedAction from './wt-rounded-action/wt-rounded-action.vue';
import WtSingleSelect from './wt-single-select/wt-single-select.vue';
import WtSwitcher from './wt-switcher/wt-switcher.vue';
import WtTextarea from './wt-textarea/wt-textarea.vue';
import WtToast from './wt-toast/wt-toast.vue';
import WtTooltip from './wt-tooltip/wt-tooltip.vue';

// Async components - heavy or rarely used components
/** @type {typeof import('./wt-action-bar/wt-action-bar.vue').default} */
const WtActionBar = defineAsyncComponent(
	() => import('./wt-action-bar/wt-action-bar.vue'),
);
/** @type {typeof import('./wt-button-select/wt-button-select.vue').default} */
const WtButtonSelect = defineAsyncComponent(
	() => import('./wt-button-select/wt-button-select.vue'),
);
/** @type {typeof import('./wt-confirm-dialog/wt-confirm-dialog.vue').default} */
const WtConfirmDialog = defineAsyncComponent(
	() => import('./wt-confirm-dialog/wt-confirm-dialog.vue'),
);
/** @type {typeof import('./wt-context-menu/wt-context-menu.vue').default} */
const WtContextMenu = defineAsyncComponent(
	() => import('./wt-context-menu/wt-context-menu.vue'),
);
/** @type {typeof import('./wt-copy-action/wt-copy-action.vue').default} */
const WtCopyAction = defineAsyncComponent(
	() => import('./wt-copy-action/wt-copy-action.vue'),
);
/** @type {typeof import('./wt-datepicker/wt-datepicker.vue').default} */
const WtDatepicker = defineAsyncComponent(
	() => import('./wt-datepicker/wt-datepicker.vue'),
);
/** @type {typeof import('./wt-dual-panel/wt-dual-panel.vue').default} */
const WtDualPanel = defineAsyncComponent(
	() => import('./wt-dual-panel/wt-dual-panel.vue'),
);
/** @type {typeof import('./wt-dummy/wt-dummy.vue').default} */
const WtDummy = defineAsyncComponent(() => import('./wt-dummy/wt-dummy.vue'));
/** @type {typeof import('./wt-error-page/wt-error-page.vue').default} */
const WtErrorPage = defineAsyncComponent(
	() => import('./wt-error-page/wt-error-page.vue'),
);
/** @type {typeof import('./wt-expansion-panel/wt-expansion-panel.vue').default} */
const WtExpansionPanel = defineAsyncComponent(
	() => import('./wt-expansion-panel/wt-expansion-panel.vue'),
);
/** @type {typeof import('./wt-expansion-card/wt-expansion-card.vue').default} */
const WtExpansionCard = defineAsyncComponent(
	() => import('./wt-expansion-card/wt-expansion-card.vue'),
);
/** @type {typeof import('./wt-filters-panel-wrapper/wt-filters-panel-wrapper.vue').default} */
const WtFiltersPanelWrapper = defineAsyncComponent(
	() => import('./wt-filters-panel-wrapper/wt-filters-panel-wrapper.vue'),
);
/** @type {typeof import('./wt-galleria/wt-galleria.vue').default} */
const WtGalleria = defineAsyncComponent(
	() => import('./wt-galleria/wt-galleria.vue'),
);
/** @type {typeof import('./wt-notifications-bar/wt-notifications-bar.vue').default} */
const WtNotificationsBar = defineAsyncComponent(
	() => import('./wt-notifications-bar/wt-notifications-bar.vue'),
);
/** @type {typeof import('./wt-page-header/wt-page-header.vue').default} */
const WtPageHeader = defineAsyncComponent(
	() => import('./wt-page-header/wt-page-header.vue'),
);
/** @type {typeof import('./wt-pagination/wt-pagination.vue').default} */
const WtPagination = defineAsyncComponent(
	() => import('./wt-pagination/wt-pagination.vue'),
);
/** @type {typeof import('./wt-player/wt-player.vue').default} */
const WtPlayer = defineAsyncComponent(
	() => import('./wt-player/wt-player.vue'),
);
/** @type {typeof import('./wt-popover/wt-popover.vue').default} */
const WtPopover = defineAsyncComponent(
	() => import('./wt-popover/wt-popover.vue'),
);
/** @type {typeof import('./wt-search-bar/wt-search-bar.vue').default} */
const WtSearchBar = defineAsyncComponent(
	() => import('./wt-search-bar/wt-search-bar.vue'),
);
/** @type {typeof import('./wt-slider/wt-slider.vue').default} */
const WtSlider = defineAsyncComponent(
	() => import('./wt-slider/wt-slider.vue'),
);
/** @type {typeof import('./wt-status-select/wt-status-select.vue').default} */
const WtStatusSelect = defineAsyncComponent(
	() => import('./wt-status-select/wt-status-select.vue'),
);
/** @type {typeof import('./wt-stepper/wt-stepper.vue').default} */
const WtStepper = defineAsyncComponent(
	() => import('./wt-stepper/wt-stepper.vue'),
);
/** @type {typeof import('./wt-table/wt-table.vue').default} */
const WtTable = defineAsyncComponent(() => import('./wt-table/wt-table.vue'));
/** @type {typeof import('./wt-table-actions/wt-table-actions.vue').default} */
const WtTableActions = defineAsyncComponent(
	() => import('./wt-table-actions/wt-table-actions.vue'),
);
/** @type {typeof import('./wt-table-column-select/wt-table-column-select.vue').default} */
const WtTableColumnSelect = defineAsyncComponent(
	() => import('./wt-table-column-select/wt-table-column-select.vue'),
);
/** @type {typeof import('./wt-tabs/wt-tabs.vue').default} */
const WtTabs = defineAsyncComponent(() => import('./wt-tabs/wt-tabs.vue'));
/** @type {typeof import('./wt-time-input/wt-time-input.vue').default} */
const WtTimeInput = defineAsyncComponent(
	() => import('./wt-time-input/wt-time-input.vue'),
);
/** @type {typeof import('./wt-timepicker/wt-timepicker.vue').default} */
const WtTimepicker = defineAsyncComponent(
	() => import('./wt-timepicker/wt-timepicker.vue'),
);
/** @type {typeof import('./wt-tree/wt-tree.vue').default} */
const WtTree = defineAsyncComponent(() => import('./wt-tree/wt-tree.vue'));
/** @type {typeof import('./wt-tree-table/wt-tree-table.vue').default} */
const WtTreeTable = defineAsyncComponent(
	() => import('./wt-tree-table/wt-tree-table.vue'),
);
/** @type {typeof import('./wt-vidstack-player/wt-vidstack-player.vue').default} */
const WtVidstackPlayer = defineAsyncComponent(
	() => import('./wt-vidstack-player/wt-vidstack-player.vue'),
);
/** @type {typeof import('./on-demand/wt-call-media-action/wt-call-media-action.vue').default} */
const WtCallMediaAction = defineAsyncComponent(
	() => import('./on-demand/wt-call-media-action/wt-call-media-action.vue'),
);
/** @type {typeof import('./on-demand/wt-chat-emoji/wt-chat-emoji.vue').default} */
const WtChatEmoji = defineAsyncComponent(
	() => import('./on-demand/wt-chat-emoji/wt-chat-emoji.vue'),
);
/** @type {typeof import('./on-demand/wt-display-chip-items/wt-display-chip-items.vue').default} */
const WtDisplayChipItems = defineAsyncComponent(
	() => import('./on-demand/wt-display-chip-items/wt-display-chip-items.vue'),
);
/** @type {typeof import('./on-demand/wt-navigation-menu/components/wt-navigation-menu.vue').default} */
const WtNavigationMenu = defineAsyncComponent(
	() =>
		import('./on-demand/wt-navigation-menu/components/wt-navigation-menu.vue'),
);
/** @type {typeof import('./on-demand/wt-selection-popup/wt-selection-popup.vue').default} */
const WtSelectionPopup = defineAsyncComponent(
	() => import('./on-demand/wt-selection-popup/wt-selection-popup.vue'),
);
/** @type {typeof import('./on-demand/wt-start-page/components/wt-start-page.vue').default} */
const WtStartPage = defineAsyncComponent(
	() => import('./on-demand/wt-start-page/components/wt-start-page.vue'),
);
/** @type {typeof import('./on-demand/wt-type-extension-value-input/wt-type-extension-value-input.vue').default} */
const WtTypeExtensionValueInput = defineAsyncComponent(
	() =>
		import(
			'./on-demand/wt-type-extension-value-input/wt-type-extension-value-input.vue'
		),
);
/** @type {typeof import('./on-demand/wt-screen-recordings-action/wt-screen-recordings-action.vue').default} */
const WtScreenRecordingsAction = defineAsyncComponent(
	() =>
		import(
			'./on-demand/wt-screen-recordings-action/wt-screen-recordings-action.vue'
		),
);
/** @type {typeof import('./on-demand/wt-send-message-popup/wt-send-message-popup.vue').default} */
const WtSendMessagePopup = defineAsyncComponent(
	() => import('./on-demand/wt-send-message-popup/wt-send-message-popup.vue'),
);

/** @type {typeof import('./wt-inline-add-panel/wt-inline-add-panel.vue').default} */
const WtInlineAddPanel = defineAsyncComponent(
	() => import('./wt-inline-add-panel/wt-inline-add-panel.vue'),
);

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
	WtInputNumber,
	WtInputText,
	WtPassword,
	WtIntersectionObserver,
	WtHint,
	WtPopup,
	WtProgressBar,
	WtRadio,
	WtSearchBar,
	WtSlider,
	WtSwitcher,
	WtTabs,
	WtTimeInput,
	WtTimepicker,
	WtTextarea,
	WtToast,
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
	WtExpansionCard,
	WtDatetimeText,
	WtCard,
	WtSingleSelect,
	WtMultiSelect,
	WtScreenRecordingsAction,
	WtInlineAddPanel,
	WtCallMediaAction,
	WtCallMediaMetric,
	WtSendMessagePopup,
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
	WtCallMediaAction,
	WtCallMediaMetric,
	WtCard,
	WtChatEmoji,
	WtCheckbox,
	WtChip,
	WtConfirmDialog,
	WtContextMenu,
	WtCopyAction,
	WtDatepicker,
	WtDatetimeText,
	WtDisplayChipItems,
	WtDivider,
	WtDualPanel,
	WtDummy,
	WtEmpty,
	WtErrorPage,
	WtExpansionCard,
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
	WtInlineAddPanel,
	WtInputNumber,
	WtInputText,
	WtIntersectionObserver,
	WtItemLink,
	WtLabel,
	WtLoadBar,
	WtLoader,
	WtLogo,
	WtMessage,
	WtMultiSelect,
	WtNavigationBar,
	WtNavigationMenu,
	WtNotificationsBar,
	WtPageHeader,
	WtPageWrapper,
	WtPagination,
	WtPassword,
	WtPlayer,
	WtPopover,
	WtPopup,
	WtProgressBar,
	WtRadio,
	WtReplaceTransition,
	WtRoundedAction,
	WtScreenRecordingsAction,
	WtSearchBar,
	WtSelectionPopup,
	WtSendMessagePopup,
	WtSingleSelect,
	WtSlider,
	WtStartPage,
	WtStatusSelect,
	WtStepper,
	WtSwitcher,
	WtTable,
	WtTableActions,
	WtTableColumnSelect,
	WtTabs,
	WtTextarea,
	WtTimeInput,
	WtTimepicker,
	WtToast,
	WtTooltip,
	WtTree,
	WtTreeTable,
	WtTypeExtensionValueInput,
	WtVidstackPlayer,
};

export default Components;

import Vue from 'vue';
import WtIcon from './atoms/wt-icon/wt-icon.vue';
import WtButton from './atoms/wt-button/wt-button.vue';
import WtBadge from './atoms/wt-badge/wt-badge.vue';
import WtTooltip from './atoms/wt-tooltip/wt-tooltip.vue';
import WtLabel from './atoms/wt-label/wt-label.vue';
import WtLoader from './atoms/wt-loader/wt-loader.vue';
import WtCheckbox from './molecules/wt-checkbox/wt-checkbox.vue';
import WtDatepicker from './molecules/wt-datepicker/wt-datepicker.vue';
import WtDatetimepicker from './molecules/wt-datetimepicker/wt-datetimepicker.vue';
import WtIconBtn from './molecules/wt-icon-btn/wt-icon-btn.vue';
import WtInput from './molecules/wt-input/wt-input.vue';
import WtNotification from './molecules/wt-notification/wt-notification.vue';
import WtRadio from './molecules/wt-radio/wt-radio.vue';
import WtSearchBar from './molecules/wt-search-bar/wt-search-bar.vue';
import WtSelect from './molecules/wt-select/wt-select.vue';
import WtSwitcher from './molecules/wt-switcher/wt-switcher.vue';
import WtTimeInput from './molecules/wt-time-input/wt-time-input.vue';
import WtTextarea from './molecules/wt-textarea/wt-textarea.vue';
import WtTimepicker from './molecules/wt-timepicker/wt-timepicker.vue';

const Components = {
  WtIcon,
  WtButton,
  WtBadge,
  WtTooltip,
  WtLabel,
  WtLoader,
  WtCheckbox,
  WtDatepicker,
  WtDatetimepicker,
  WtIconBtn,
  WtInput,
  WtNotification,
  WtRadio,
  WtSearchBar,
  WtSelect,
  WtSwitcher,
  WtTimeInput,
  WtTimepicker,
  WtTextarea,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

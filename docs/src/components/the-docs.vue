<template>
  <main class="docs">
    <header>
      <h1>Webitel UI SDK v. 0.1.x</h1>
    </header>
    <wt-tabs v-model="currentTab" :tabs="tabs"></wt-tabs>
    <component :is="currentTab.value"></component>
  </main>
</template>

<script>
  import QuickStart from './pages/quick-start/quick-start.vue';
  import Typography from './pages/typography/typography.vue';
  import Colors from './pages/colors/colors.vue';
  import Badge from './pages/atoms/badge/badge.vue';
  import Btn from './pages/atoms/button/button.vue';
  import Divider from './pages/atoms/divider/divider.vue';
  import Icon from './pages/atoms/icon/icon.vue';
  import InputInfo from './pages/atoms/input-info/input-info.vue';
  import InputLabel from './pages/atoms/label/label.vue';
  import Loader from './pages/atoms/loader/loader.vue';
  import Tooltip from './pages/atoms/tooltip/tooltip.vue';
  import Checkbox from './pages/molecules/checkbox/checkbox.vue';
  import Datepicker from './pages/molecules/datepicker/datepicker.vue';
  import Datetimepicker from './pages/molecules/datetimepicker/datetimepicker.vue';
  import InputPage from './pages/molecules/input/input.vue';
  import Notification from './pages/molecules/notification/notification.vue';
  import Popup from './pages/molecules/popup/popup.vue';
  import Radio from './pages/molecules/radio/radio.vue';
  import SearchBar from './pages/molecules/search-bar/search-bar.vue';
  import SelectPage from './pages/molecules/select/select.vue';
  import Switcher from './pages/molecules/switcher/switcher.vue';
  import Tabs from './pages/molecules/tabs/tabs.vue';
  import TextareaPage from './pages/molecules/textarea/textarea.vue';
  import TimeInput from './pages/molecules/time-input/time-input.vue';
  import Timepicker from './pages/molecules/timepicker/timepicker.vue';
  import Pagination from './pages/organisms/pagination/pagination.vue';

  export default {
    name: 'the-docs',
    components: {
      QuickStart,
      Typography,
      Colors,
      Badge,
      Btn, // Button name conflicts with default <button> tag
      Divider,
      Icon,
      InputInfo,
      InputLabel,
      Loader,
      Tooltip,
      Checkbox,
      Datepicker,
      Datetimepicker,
      InputPage,
      Notification,
      Popup,
      Radio,
      SearchBar,
      SelectPage,
      Switcher,
      Tabs,
      TextareaPage,
      TimeInput,
      Timepicker,
      Pagination,
    },
    data: () => ({
      currentTab: {
        text: 'Quick Start',
        value: 'quick-start',
      },
      tabs: [
        {
          text: 'Quick Start',
          value: 'quick-start',

        },
        {
          text: 'Typography',
          value: 'typography',
        },
        {
          text: 'Colors',
          value: 'colors',
        },
        {
          text: 'Badge',
          value: 'badge',
        },
        {
          text: 'Button',
          value: 'btn',
        },
        {
          text: 'Divider',
          value: 'divider',
        },
        {
          text: 'Icons',
          value: 'icon',
        },
        {
          text: 'Input Info',
          value: 'input-info',
        },
        {
          text: 'Input Label',
          value: 'input-label',
        },
        {
          text: 'Loader',
          value: 'loader',
        },
        {
          text: 'Tooltip',
          value: 'tooltip',
        },
        {
          text: 'Checkbox',
          value: 'checkbox',
        },
        {
          text: 'Datepicker',
          value: 'datepicker',
        },
        {
          text: 'Datetimepicker',
          value: 'datetimepicker',
        },
        {
          text: 'Input',
          value: 'input-page',
        },
        {
          text: 'Notification',
          value: 'notification',
        },
        {
          text: 'Popup',
          value: 'popup',
        },
        {
          text: 'Radio',
          value: 'radio',
        },
        {
          text: 'Search bar',
          value: 'search-bar',
        },
        {
          text: 'Select',
          value: 'select-page',
        },
        {
          text: 'Switcher',
          value: 'switcher',
        },
        {
          text: 'Tabs',
          value: 'tabs',
        },
        {
          text: 'Textarea',
          value: 'textarea-page',
        },
        {
          text: 'Time input',
          value: 'time-input',
        },
        {
          text: 'Timepicker',
          value: 'timepicker',
        },
        {
          text: 'Pagination',
          value: 'pagination',
        },
      ],
    }),
  };
</script>

<style lang="scss" scoped>
  .docs {
    padding: 30px;
  }

</style>

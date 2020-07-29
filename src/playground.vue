<template>
  <div class="playground" :style="{'background': bg}">
    <div>
      <label>Make page white:
        <input
          :value="bg === '#fff'"
          type="checkbox"
          @input="bg = bg === '#fff' ? '#eee' : '#fff'"
        >
      </label>
    </div>
    <div>
      <h2>wt-icon</h2>
      <wt-icon icon="bucket" color="hold"></wt-icon>
    </div>
    <div>
      <h2>wt-icon-btn</h2>
      <wt-icon-btn
        icon="close"
        tooltip="hello there!"
      ></wt-icon-btn>
    </div>
    <div>
      <h2>wt-button</h2>
      <wt-button>Primary</wt-button>
      <wt-button color="secondary">Secondary</wt-button>
      <wt-button disabled>Disabled</wt-button>
      <wt-button color="success">Success</wt-button>
      <wt-button color="danger">Danger</wt-button>
      <wt-button color="transfer">Transfer</wt-button>
      <wt-button wide>Primary</wt-button>
    </div>

    <div>
      <h2>wt-button--outline</h2>
      <wt-button outline>Primary</wt-button>
      <wt-button outline color="secondary">Secondary</wt-button>
      <wt-button outline disabled>Disabled</wt-button>
      <wt-button outline color="success">Success</wt-button>
      <wt-button outline color="danger">Danger</wt-button>
      <wt-button outline color="transfer">Transfer</wt-button>
    </div>

    <div>
      <h2>wt-badge</h2>
      <wt-badge>+10</wt-badge>
      <wt-badge>hello there!</wt-badge>
    </div>

    <div>
      <h2>wt-tooltip</h2>
      <wt-tooltip visible>default</wt-tooltip>
      <wt-tooltip visible contrast>contrast</wt-tooltip>
    </div>
    <div>
      <h2>wt-notification</h2>
      <wt-notification type="info">lorem ipsum</wt-notification>
      <wt-notification type="error">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur,
        debitis
      </wt-notification>

      <wt-notification type="error">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut deserunt et eum
        exercitationem hic labore libero minus nam optio, praesentium, quas quasi quia rem
        repellendus sunt tempora tempore voluptas?'
      </wt-notification>
    </div>

    <div>
      <h2>wt-input</h2>
      <wt-input
        v-model="inputs.labelInput"
        label="Label"
        name="label-input"
      ></wt-input>
      <wt-input
        label="Disabled"
        name="disabled-input"
        type="password"
        has-show-password
        disabled
      ></wt-input>
      <wt-input
        v-model="inputs.outlineInput"
        label="Outline"
        name="outline-input"
        outline
      ></wt-input>
      <wt-input
        v-model="inputs.passwordInput"
        label="Password"
        name="password-input"
        type="password"
        :v="vValid"
        has-show-password
      ></wt-input>
      <wt-input
        v-model="inputs.labelInput"
        label="Invalid input"
        name="invalid-input"
        :v="vInvalid"
      ></wt-input>
    </div>
    <div>
      <h2>Search bar</h2>
      <wt-search-bar
        v-model="searchBar.defaultSearch"
        placeholder="debounced search"
        debounce
        @search="searchBar.search"
      ></wt-search-bar>
      <wt-search-bar
        v-model="searchBar.outlineSearch"
        outline
      ></wt-search-bar>
    </div>
    <div>
      <h2>Textarea</h2>
      <wt-textarea
        v-model="textarea"
        name="textarea-input"
        label="Textarea"
      ></wt-textarea>
    </div>
    <div>
      <h2>Time inputs</h2>
      <wt-time-input
        v-model="timeInput.hour"
        label="hour"
        name="time-input-hour"
        :max-value="23"
      ></wt-time-input>
      <wt-time-input
        v-model="timeInput.min"
        label="min"
        name="time-input-min"
        :max-value="59"
        outline
      ></wt-time-input>
      <wt-time-input
        v-model="timeInput.sec"
        label="sec"
        name="time-input-sec"
        :max-value="59"
        disabled
      ></wt-time-input>
    </div>
    <div>
      <h2>Radio</h2>
      <wt-radio
        v-model="radio.selected"
        :value="radio.value1"
        label="Radio 1"
        name="radio-opt1"
      ></wt-radio>
      <wt-radio
        v-model="radio.selected"
        :value="radio.value2"
        label="Radio 2"
        name="radio-opt-outline"
        outline
      ></wt-radio>
      <wt-radio
        v-model="radio.selected"
        :value="radio.value3"
        label="Radio 3"
        name="radio-opt-disabled"
        disabled
      ></wt-radio>
      <wt-radio
      ></wt-radio>
    </div>
    <div>
      <h2>Checkbox</h2>
      <wt-checkbox
        v-model="checkbox.selected1"
        label="Checkbox selected"
      ></wt-checkbox>
      <wt-checkbox
        v-model="checkbox.selected2"
        label="Disabled checkbox"
        disabled
      ></wt-checkbox>
      <wt-checkbox
        v-model="checkbox.selected2"
      ></wt-checkbox>
      <wt-checkbox
        v-model="checkbox.selected3"
        :value="checkbox.opt1"
        label="Multiple checkbox 1"
      ></wt-checkbox>
      <wt-checkbox
        v-model="checkbox.selected3"
        :value="checkbox.opt2"
        label="Multiple checkbox 2 [outlined]"
        outline
      ></wt-checkbox>
    </div>

    <div>
      <h2>switcher</h2>
      <wt-switcher
        v-model="switcher.label"
        label="Switcher with label"
      ></wt-switcher>
      <wt-switcher
        v-model="switcher.labelLeft"
        label="Switcher with label left"
        label-left
      ></wt-switcher>
      <wt-switcher
        v-model="switcher.disabled"
        label="Disabled switcher"
        disabled
      ></wt-switcher>
      <wt-switcher
        v-model="switcher.disabled"
      ></wt-switcher>
    </div>

    <div>
      <h2>Select</h2>
      <wt-select
        v-model="select.value"
        :options="select.options"
        label="Select"
        track-by="name"
      ></wt-select>
      <wt-select
        v-model="select.multipleValue"
        :options="select.options"
        :close-on-select="false"
        label="Multiple Select"
        track-by="name"
        :v="vValid"
        multiple
      ></wt-select>
      <wt-select
        v-model="select.value"
        label="Disabled Select"
        track-by="name"
        disabled
      ></wt-select>
      <wt-select
        v-model="select.value"
        label="Invalid Select"
        track-by="name"
        :v="vInvalid"
      ></wt-select>
    </div>
    <div>
      <h2>Datepicker</h2>
      <wt-datepicker
        v-model="datepicker.value"
        label="Datepicker"
        inline-label="Dtpckr"
      ></wt-datepicker>
      <wt-datepicker
        v-model="datepicker.value"
        label="Disabled datepicker"
        disabled
      ></wt-datepicker>
    </div>
    <div>
      <h2>Timepicker</h2>
      <wt-timepicker v-model="timepicker.value"></wt-timepicker>
      <wt-timepicker
        v-model="timepicker.value"
        format="mm:ss"
        disabled
      ></wt-timepicker>
    </div>
    <div>
      <h2>Datetimepicker</h2>
      <wt-datetimepicker
        v-model="datetimepicker.value"
        label="Datetimepicker"
      ></wt-datetimepicker>
      <wt-datetimepicker
        v-model="datetimepicker.value"
        label="Disabled datetimepicker"
        disabled
      ></wt-datetimepicker>
    </div>
    <div>
      <h2>Loader</h2>
      <wt-loader/>
    </div>
    <div>
      <h2>Divider</h2>
      <wt-divider/>
    </div>

    <div>
      <h2>Tabs</h2>
      <wt-tabs
        v-model="tabs.current"
        :tabs="tabs.tabs"
      ></wt-tabs>
    </div>
    <div>
      <h2>Popup</h2>
      <div class="popup-wrapper" style="position: relative; width: 600px; height: 500px;">
        <wt-popup style="position:absolute;">
          <template slot="header">
            <h2 style="text-align: center;">Popup header</h2>
          </template>
          <template slot="main">
            <p style="text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Accusamus autem consequatur consequuntur earum, eius, exercitationem, expedita
              fugiat mollitia nam nesciunt omnis placeat provident quos sed tempore ullam voluptate.
              Est, molestias.</p>
          </template>
          <template slot="actions">
            <wt-button color="primary">Ok</wt-button>
            <wt-button color="secondary" style="margin-left: 20px;">Not Ok</wt-button>
          </template>
        </wt-popup>
      </div>
    </div>
    <div>
      <h2>Pagination</h2>
      <wt-pagination
        v-model="pagination.size"
        :next="true"
        :prev="true"
      ></wt-pagination>
    </div>
    <div>
      <h2>Table</h2>
      <wt-table
        :headers="table.headers"
        :data="table.data"
        sortable
      >
        <template slot="h2">
          <wt-select
            v-model="select.multipleValue"
            :options="select.options"
            :close-on-select="false"
            track-by="name"
            placeholder="placeholder"
            multiple
          ></wt-select>
        </template>
      </wt-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'playground',
    data: () => ({
      bg: '#fff',
      vValid: {
        $error: false,
        $dirty: true,
      },
      vInvalid: {
        $error: true,
        $dirty: true,
        required: false,
      },
      inputs: {
        labelInput: '',
        outlineInput: '',
        passwordInput: '12345',
      },
      searchBar: {
        defaultSearch: '',
        outlineSearch: '',
        search(value) {
          // eslint-disable-next-line
          alert(`search debounce: ${value}`);
        },
      },
      textarea: '',
      timeInput: {
        hour: 0,
        min: 2,
        sec: 22,
      },
      radio: {
        value1: 'value1',
        value2: 'value2',
        value3: 'value3',
        selected: 'value3',
      },
      checkbox: {
        selected1: true,
        selected2: false,
        selected3: ['Option 1'],
        opt1: 'Option 1',
        opt2: 'Option 2',
      },
      switcher: {
        label: true,
        outline: false,
        labelLeft: false,
        disabled: true,
      },
      select: {
        value: '',
        multipleValue: [],
        options: [
          { name: 'Vue.js1', language: 'JavaScript' },
          { name: 'Adonis2', language: 'JavaScript' },
          { name: 'Rails3', language: 'Ruby' },
          { name: 'Sinatra4', language: 'Ruby' },
          { name: 'Laravel5', language: 'PHP' },
          { name: 'Phoenix6', language: 'Elixir' },
          { name: 'Vue.js7', language: 'JavaScript' },
          { name: 'Adonis8', language: 'JavaScript' },
          { name: 'Rails9', language: 'Ruby' },
          { name: 'Sinatra10', language: 'Ruby' },
          { name: 'Laravel11', language: 'PHP' },
          { name: 'Phoenix12', language: 'Elixir' },
        ],
      },
      datepicker: {
        value: Date.now(),
      },
      timepicker: {
        value: Date.now(),
      },
      datetimepicker: {
        value: Date.now(),
      },
      tabs: {
        current: { value: '1' },
        tabs: [
          {
            text: 'Tab 1',
            value: '1',
          },
          {
            text: 'Tab 2',
            value: '2',
          },
          {
            text: 'Tab 3',
            value: '3',
          },
        ],
      },
      pagination: {
        size: 10,
      },
      table: {
        headers: [
          {
            text: 'heading 1',
            value: 'h1',
            sort: 'desc',
          },
          {
            text: 'heading2',
            value: 'h2',
            sort: 'asc',
          },
          {
            text: 'heading 3',
            value: 'h3',
          },
          {
            text: 'heading 1',
            value: 'h1',
            sort: 'desc',
          },
          {
            text: 'heading 2',
            value: 'h2',
            sort: 'asc',
          },
          {
            text: 'heading 3',
            value: 'h3',
          },
          {
            text: 'heading 1',
            value: 'h1',
            sort: 'desc',
          },
          {
            text: 'heading 2',
            value: 'h2',
            sort: 'asc',
          },
          {
            text: 'heading 3',
            value: 'h3',
          },
        ],
        data: [
          {
            h1: 'heading    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequatur cum cupiditate dignissimos facilis hic impedit incidunt itaque labore maxime, numquam perspiciatis saepe sapiente ullam ut. Deleniti iure odio quibusdam!\n1',
            h2: 'heading 2',
            h3: 'heading 3',
            _isSelected: false,
          },
          {
            h1: 'heading    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequatur cum cupiditate dignissimos facilis hic impedit incidunt itaque labore maxime, numquam perspiciatis saepe sapiente ullam ut. Deleniti iure odio quibusdam!\n1',
            h2: 'heading 2',
            h3: 'heading 3',
            _isSelected: false,
          },
          {
            h1: 'heading    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequatur cum cupiditate dignissimos facilis hic impedit incidunt itaque labore maxime, numquam perspiciatis saepe sapiente ullam ut. Deleniti iure odio quibusdam!\n1',
            h2: 'heading 2',
            h3: 'heading 3',
            _isSelected: false,
          },
          {
            h1: 'heading 1',
            h2: 'heading 2',
            h3: 'heading 3',
            _isSelected: false,
          },
          {
            h1: 'heading 1',
            h2: 'heading 2',
            h3: 'heading 3',
            _isSelected: false,
          },
          {
            h1: 'heading 1',
            h2: 'heading 2',
            h3: 'heading 3',
            _isSelected: false,
          },
          {
            h1: 'heading 1',
            h2: 'heading 2',
            h3: 'heading 3',
            _isSelected: false,
          }],
      },
    }),
  };
</script>

<style lang="scss" scoped>
  .playground {
    min-height: 100vh;
    padding: 90px;
    box-sizing: border-box;

    & > div {
      margin-bottom: 30px;
      border-bottom: 2px solid lightskyblue;

      & > * {
        margin: 10px;
      }
    }
  }
</style>

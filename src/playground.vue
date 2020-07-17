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
      <wt-notification :notification="{type: 'info', text: 'lorem ipsum'}"></wt-notification>
      <wt-notification
        :notification="{
          type: 'error',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, debitis '
        }"
      ></wt-notification>

      <wt-notification
        :notification="{
          type: 'error',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut deserunt et eum exercitationem hic labore libero minus nam optio, praesentium, quas quasi quia rem repellendus sunt tempora tempore voluptas?'
        }"
      ></wt-notification>
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
          has-show-password
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
  </div>
</template>

<script>
  export default {
    name: 'playground',
    data: () => ({
      bg: '#fff',
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

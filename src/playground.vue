<template>
  <div class="playground">
    <wt-rounded-action icon="call" color="transfer"></wt-rounded-action>
    default
    <wt-icon icon="mic-bold" size="xl"></wt-icon>
    accent
    <wt-icon icon="mic-bold" size="xl" color="accent"></wt-icon>
    contrast
    <div style="background: #000; display: inline-block;"><wt-icon icon="mic-bold" size="xl" color="contrast"></wt-icon></div>
    active
    <wt-icon icon="mic-bold" size="xl" color="active"></wt-icon>
    disabled
    <wt-icon icon="mic-bold" size="xl" color="disabled"></wt-icon>
    success
    <wt-icon icon="mic-bold" size="xl" color="success"></wt-icon>
    danger
    <wt-icon icon="mic-bold" size="xl" color="danger"></wt-icon>
    transfer
    <wt-icon icon="mic-bold" size="xl" color="transfer"></wt-icon>
    hold
    <wt-icon icon="mic-bold" size="xl" color="hold"></wt-icon>
    <br>
    default, hoverable
    <wt-icon-btn icon="mic-bold" size="xl"></wt-icon-btn>
    accent
    <wt-icon-btn icon="mic-bold" size="xl" color="accent"></wt-icon-btn>
    contrast
    <div style="background: #000; display: inline-block;"><wt-icon-btn icon="mic-bold" size="xl" color="contrast"></wt-icon-btn></div>
    active
    <wt-icon-btn icon="mic-bold" size="xl" color="active"></wt-icon-btn>
    COLOR: disabled
    <wt-icon-btn icon="mic-bold" size="xl" color="disabled"></wt-icon-btn>
    disabled actions
    <wt-icon-btn icon="mic-bold" size="xl" disabled></wt-icon-btn>
    disabled actions, but COLOR IS SUCCESS
    <wt-icon-btn icon="mic-bold" size="xl" disabled color="success"></wt-icon-btn>
    success
    <wt-icon-btn icon="mic-bold" size="xl" color="success"></wt-icon-btn>
    danger
    <wt-icon-btn icon="mic-bold" size="xl" color="danger"></wt-icon-btn>
    transfer
    <wt-icon-btn icon="mic-bold" size="xl" color="transfer"></wt-icon-btn>
    hold
    <wt-icon-btn icon="mic-bold" size="xl" color="hold"></wt-icon-btn>

    <wt-checkbox selected label="value"></wt-checkbox>
    <wt-checkbox selected label="value" disabled></wt-checkbox>
    <wt-textarea
      label="value"
      value="hello"
      disabled
    ></wt-textarea>
    <wt-textarea
      label="placeholder"
      placeholder="hello"
      disabled
    ></wt-textarea>
    <wt-select
      label="value"
      value="hello"
      disabled
    ></wt-select>
    <wt-select
      label="placeholder"
      placeholder="hello"
      disabled
    ></wt-select>
    <wt-input
      label="value"
      value="hello"
      disabled
    ></wt-input>
    <wt-input
      label="placeholder"
      placeholder="hello"
      disabled
    ></wt-input>
    <wt-input
      label="value"
      value="hello"
      disabled
    ></wt-input>
<!--    <wt-table-->
<!--      :headers="table.headers"-->
<!--      :data="table.data"-->
<!--    >-->
<!--&lt;!&ndash;      <template slot="h1">&ndash;&gt;-->
<!--&lt;!&ndash;        <wt-select></wt-select>&ndash;&gt;-->
<!--&lt;!&ndash;      </template>&ndash;&gt;-->
<!--    </wt-table>-->
  </div>
</template>

<script>

export default {
  name: 'playground',
  data: () => ({
    switcher: true,
    autocomplete: [
      { name: 'Laravel5', language: 'PHP' },
      { name: 'Phoenix6', language: 'Elixir' },
      { name: 'Vue.js7', language: 'JavaScript' },
      { name: 'Adonis8', language: 'JavaScript' },
    ],
    vValid: {
      $error: false,
      $dirty: true,
    },
    vInvalid: {
      $error: true,
      $dirty: true,
      required: false,
    },
    table: {
      headers: [
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
          text: 'heading2',
          value: 'h2',
          sort: 'asc',
        },
        {
          text: 'heading 3',
          value: 'h3',
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
          text: 'heading2',
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
          h1: 'value 1',
          h2: 'value 2',
          // h3: '876878768787687876878768787687',
          h3: '123',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
        {
          h1: 'value 1',
          h2: 'value 2',
          h3: 'value 3',
          _isSelected: false,
        },
      ],
    },
    select: {
      value: '876878768787687876878768787687',
      objValue: { name: 'Vue.js1AAAAAA', language: 'JavaScript' },
      multipleValue: [],
      stringOptions: ['123123123123', '321123123123123', '456'],
      options: [
        { name: 'Vue.js1AAAAAA', language: 'JavaScript' },
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
    appHeader: {
      apps: {
        agent: { href: 'https://example.com' },
        supervisor: { href: 'https://example.com' },
        history: { href: 'https://example.com' },
        audit: { href: 'https://example.com' },
        admin: { href: 'https://example.com' },
        grafana: { href: 'https://example.com' },
      },
    },
    columnSelect: [
    ],
  }),
  methods: {
    log(event, inputEvent) {
      console.log(event, inputEvent);
    },
  },
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

.scrollbar-outer {
  @extend %wt-scrollbar;
}
</style>

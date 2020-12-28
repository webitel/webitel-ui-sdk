<template>
  <div class="playground">
    <wt-timepicker v-model="timepicker" @input="log"></wt-timepicker>
  </div>
</template>

<script>

export default {
  name: 'playground',
  data: () => ({
    timepicker: 12,
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
      ],
      data: [
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
        }],
    },
    select: {
      value: '876878768787687876878768787687',
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

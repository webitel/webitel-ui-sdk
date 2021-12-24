<template>
  <div class="playground">
    <wt-button color="secondary">Secondary</wt-button>
    <div class="h1">Heading 1</div>
    <div class="h2">Heading 2</div>
    <div class="h3">Heading 3</div>
    <div class="st1">Subtitle 1</div>
    <div class="st2">Subtitle 2</div>
    <div class="b1">Body 1</div>
    <div class="b2">Body 2</div>
    <div class="c">caption</div>
    <div class="o">OVERLINE</div>
  </div>
</template>

<script>
export default {
  name: 'playground',
  data: () => ({
    switcher: true,
    options: [{ text: 'Save as Save as Save as Save as  Save as Save as Save asSave as  Save as Save as Save as' }],
    active: true,
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
      objValue: {
        name: 'Vue.js1AAAAAA',
        language: 'JavaScript',
      },
      multipleValue: [],
      stringOptions: ['123123123123', '321123123123123', '456'],
      options: [
        {
          name: 'Vue.js1AAAAAA',
          language: 'JavaScript',
        },
        {
          name: 'Adonis2',
          language: 'JavaScript',
        },
        {
          name: 'Rails3',
          language: 'Ruby',
        },
        {
          name: 'Sinatra4',
          language: 'Ruby',
        },
        {
          name: 'Laravel5',
          language: 'PHP',
        },
        {
          name: 'Phoenix6',
          language: 'Elixir',
        },
        {
          name: 'Vue.js7',
          language: 'JavaScript',
        },
        {
          name: 'Adonis8',
          language: 'JavaScript',
        },
        {
          name: 'Rails9',
          language: 'Ruby',
        },
        {
          name: 'Sinatra10',
          language: 'Ruby',
        },
        {
          name: 'Laravel11',
          language: 'PHP',
        },
        {
          name: 'Phoenix12',
          language: 'Elixir',
        },
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
    columnSelect: [],
  }),
  methods: {
    search(search) {
      return {
        items: Array(10)
          .fill({ name: search || '123' }),
        next: true,
      };
    },
    log(options) {
      console.log(options);
    },
  },
};
</script>

<style lang="scss" scoped>
.playground {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 90px;

  & > div {
    margin-bottom: 30px;
    //border-bottom: 2px solid lightskyblue;

    & > * {
      margin: 10px;
    }
  }
}

.scrollbar-outer {
  @extend %wt-scrollbar;
}

.h1 {
  @extend %typo-heading-1;
}

.h2 {
  @extend %typo-heading-2;
}

.h3 {
  @extend %typo-heading-3;
}

.st1 {
  @extend %typo-subtitle-1;
}

.st2 {
  @extend %typo-subtitle-2;
}

.b1 {
  @extend %typo-body-1;
}

.b2 {
  @extend %typo-body-2;
}

.c {
  @extend %typo-caption;
}

.o {
  @extend %typo-overline;
}
</style>

<template>
  <div class="playground">
    <section>
      <wt-pagination
        :size="10"
        :page="10"
        prev="true"
        next="true"
      ></wt-pagination>
      <article style="width: 1000px; height: 400px; position: relative;">
        <wt-popup style="position: absolute;">
          <template slot="title">
            Popup header
          </template>
          <template slot="main">
            <p style="text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Accusamus autem consequatur consequuntur earum, eius, exercitationem, expedita
              fugiat mollitia nam nesciunt omnis placeat provident quos sed tempore ullam
              voluptate.
              Est, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Accusamus autem consequatur consequuntur earum, eius, exercitationem, expedita
              fugiat mollitia nam nesciunt omnis placeat provident quos sed tempore ullam
              voluptate.
              Est, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Accusamus autem consequatur consequuntur earum, eius, exercitationem, expedita
              fugiat mollitia nam nesciunt omnis placeat provident quos sed tempore ullam
              voluptate.
              Est, molestias.</p>
          </template>
          <template slot="actions">
            <wt-button color="primary">Ok</wt-button>
            <wt-button color="secondary">Not Ok</wt-button>
          </template>
        </wt-popup>
      </article>
      <article class="buttons">
        <div class="example-wrapper">
          <wt-rounded-action wide icon="call"></wt-rounded-action>
          <wt-rounded-action loading icon="call"></wt-rounded-action>
          <pre><code
            class="language-html">&lt;wt-rounded-action icon="call"&gt;&lt;/wt-rounded-action&gt;</code></pre>
        </div>
        <div class="example-wrapper" style="display: flex;">
          <wt-rounded-action icon="call" color="secondary"></wt-rounded-action>
          <wt-rounded-action icon="call" disabled></wt-rounded-action>
          <wt-rounded-action icon="call" color="success"></wt-rounded-action>
          <wt-rounded-action icon="call" color="danger"></wt-rounded-action>
          <wt-rounded-action icon="call" color="transfer"></wt-rounded-action>
          <wt-rounded-action icon="call" color="transfer" disabled></wt-rounded-action>
        </div>
        <p>! class 'active', attached to secondary color button, highlights it.</p>
      </article>

      <article class="buttons">
        <wt-button :loading="isLoading" @click="load">Load!</wt-button>
        <wt-button-select>123</wt-button-select>
        <div class="example-wrapper">
<!--          <wt-button :loading="isLoading" @click="load">Load!</wt-button>-->
          <wt-button loading></wt-button>
          <wt-button outline>Primary button Primary button</wt-button>
          <pre><code
            class="language-html">&lt;wt-button&gt;Primary button&lt;/wt-button&gt;</code></pre>
        </div>
        <div class="example-wrapper">
          <wt-button size="sm" color="secondary">Small button</wt-button>
        </div>
        <div class="example-wrapper">
          <wt-button wide>Wide button</wt-button>
        </div>
        <div class="example-wrapper">
          <wt-button rounded class="el-1">Primary</wt-button>
          <wt-button rounded color="secondary">Secondary</wt-button>
          <wt-button rounded disabled>Disabled</wt-button>
          <wt-button rounded color="success">Success</wt-button>
          <wt-button color="danger">Danger</wt-button>
          <wt-button color="transfer">Transfer</wt-button>
        </div>
        <div class="example-wrapper">
          <wt-button outline>Primary</wt-button>
          <wt-button outline color="secondary">Secondary</wt-button>
          <wt-button outline disabled>Disabled</wt-button>
          <wt-button rounded outline color="success">Success</wt-button>
          <wt-button rounded outline color="danger">Danger</wt-button>
          <wt-button outline color="transfer">Transfer</wt-button>
        </div>
      </article>
      <wt-app-header>
        <wt-status-select style="width: 160px;"></wt-status-select>
        <wt-switcher label="Contact Center"></wt-switcher>
        <wt-header-actions :user="{name: 'Адміністратор', account: 'adm@demo.webitel.com'}" :build-info="{ release: '12.12' }"></wt-header-actions>
        <wt-app-navigator current-app="admin" :apps="[{ name: 'admin' }, { name: 'admin' }, { name: 'admin' }, { name: 'grafana' }, { name: 'agent' }, { name: 'supervisor' }, { name: 'history' }]"></wt-app-navigator>
      </wt-app-header>
      <wt-tags-input
        label="Tags input"
        placeholder="Tags input placeholder"
        v-model="autocomplete"
        :autocomplete-items="autocomplete"
      ></wt-tags-input>
      <wt-radio label="Label"></wt-radio>
      <wt-checkbox label="Label"></wt-checkbox>
      <wt-progress-bar :value="50"></wt-progress-bar>
      <wt-notification type="error">ERROR!</wt-notification>
      <wt-notification type="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, eligendi error exercitationem molestias sapiente sed ullam! Deleniti dolorum enim est exercitationem expedita in, ipsam minima optio quasi, quis reiciendis tenetur?</wt-notification>
      <wt-status-select style="margin-bottom: 10px;"></wt-status-select>
      <wt-indicator
        color="success"
        text="Indicator text"
    ></wt-indicator>
      <wt-indicator
        color="success"
        text="Indicator text"
        size="sm"
    ></wt-indicator>
      <wt-table-actions
        :icons="['refresh', 'import', 'export']"
      ></wt-table-actions>
      <wt-tabs v-model="currentTab" :tabs="[{text: 'Tab 1', value: 1}, { text: 'Tab 2', value: 2}]"></wt-tabs>
      <wt-headline>
        <template slot="title">
          Headline
        </template>
        <template slot="search">
          <wt-search-bar></wt-search-bar>
        </template>
        <template slot="actions">
          <wt-button style="margin-left: 20px;">Hello</wt-button>
          <wt-button style="margin-left: 20px;" color="secondary">there!</wt-button>
        </template>
      </wt-headline>
      <wt-datetimepicker></wt-datetimepicker>
      <wt-datepicker placeholder="PLAHCEHOLDER"></wt-datepicker>
      <wt-select :value="[{ name: 'test' }, { name: 'test2' }]" placeholder="placeholder!" :clearable="false"></wt-select>
      <wt-select :value="[{ name: 'test' }, { name: 'test2' }]" placeholder="placeholder!"></wt-select>
      <wt-textarea value="123321"></wt-textarea>
      <wt-button-select>btn slct</wt-button-select>
      <wt-select placeholder="placeholder!"></wt-select>
      <wt-search-bar :value="'Dont forget right X'" style="margin-bottom: 10px;"></wt-search-bar>
      <wt-input placeholder="42px height" style="margin-bottom: 10px;"></wt-input>
    </section>
    <section>
      <h1 class="title">Placeholders</h1>
      <wt-textarea placeholder="Textarea placeholder"></wt-textarea>
      <wt-textarea disabled placeholder="Disabled textarea placeholder"></wt-textarea>
      <wt-search-bar placeholder="Search bar placeholder"></wt-search-bar>
      <wt-search-bar outline placeholder="Outline search bar placeholder"></wt-search-bar>
      <wt-tags-input label="Tags input" placeholder="Tags input placeholder"></wt-tags-input>
      <wt-tags-input
        :value="[{ text: 'Disabled tags input' }, { text: 'Is here' }]"
        disabled
        placeholder="Disabled tags input placeholder"
      ></wt-tags-input>
      <wt-select placeholder="Select placeholder"></wt-select>
      <wt-select disabled placeholder="Disabled select placeholder"></wt-select>
      <wt-input placeholder="Input placeholder"></wt-input>
      <wt-input outline placeholder="Outline input placeholder"></wt-input>
      <wt-input disabled placeholder="Disabled input placeholder"></wt-input>
      <wt-input disabled outline placeholder="Disabled outline input placeholder"></wt-input>
    </section>
    <section class="playground-docs playground-box-shadow">
      <h1 class="title">Elevations</h1>
      <article>
        <div class="el el-1">Elevation 1</div>
        <div class="el el-2">Elevation 2</div>
        <div class="el el-3">Elevation 3</div>
        <div class="el el-4">Elevation 4</div>
        <div class="el el-5">Elevation 5</div>
        <div class="el el-6">Elevation 6</div>
        <div class="el el-7">Elevation 7</div>
        <div class="el el-8">Elevation 8</div>
        <div class="el el-9">Elevation 9</div>
        <div class="el el-10">Elevation 10</div>
      </article>
    </section>
    <section class="playground-docs playground-typo">
      <h1 class="title">Typo</h1>
      <article>
        <div style="display: flex; border: 1px solid blue;">
          <span style="display: inline-block;" class="b1">Tab</span>
          <strong style="display: inline-block;" class="st1">Tab</strong>
          <div style="width: 24px; height: 24px; background: red; display: inline-block;"></div>
        </div>
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
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'playground',
  data: () => ({
    currentTab: { value: 1 },
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
    isLoading: false,
  }),
  methods: {
    search(search) {
      return {
        items: Array(10)
          .fill({ name: search || '123' }),
        next: true,
      };
    },
    load() {
      this.isLoading = true;
      setTimeout(() => { this.isLoading = false; }, 1000);
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

  .buttons .wt-button {
    margin: 10px;
  }

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

.playground-docs {
  margin-bottom: var(--spacing-3xl);

  .title {
    @extend %typo-heading-1;
    margin-bottom: var(--spacing-sm);
  }
}

.playground-box-shadow article {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-3xl);
}
  .el {
    @extend %typo-overline;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 110px;
    height: 100px;
    border-radius: var(--border-radius);
  }

  .el-1 {
    box-shadow: var(--elevation-1);
  }

  .el-2 {
    box-shadow: var(--elevation-2);
  }

  .el-3 {
    box-shadow: var(--elevation-3);
  }

  .el-4 {
    box-shadow: var(--elevation-4);
  }

  .el-5 {
    box-shadow: var(--elevation-5);
  }

  .el-6 {
    box-shadow: var(--elevation-6);
  }

  .el-7 {
    box-shadow: var(--elevation-7);
  }

  .el-8 {
    box-shadow: var(--elevation-8);
  }

  .el-9 {
    box-shadow: var(--elevation-9);
  }

  .el-10 {
    box-shadow: var(--elevation-10);
  }
//}

.playground-typo {
  article > * {
    margin-bottom: var(--spacing-sm);
  }
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
//}
</style>

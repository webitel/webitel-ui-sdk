<template>
  <div class="playground">
    <wt-popup width="600">
      <template v-slot:title>lorem ispsum</template>
      <template v-slot:main>
        Lorem markdownum. Causa furca Boebes qua **tumulo se ab** tollit Perseus
        demersus. Tetigere concipientibus vetitis tamen, volucrum abesse et [tulit
        ustus](http://tenuihoc.io/cui).

        > Maledictaque inquit, sustinet velit, hoc coniciunt victa tingui fors sacrisque
        > autem te fecere in hunc cum est **Spercheides**. Nulla decidit! Vittis curru
        > rotarum. Et animo certe in cum ulva quaesiti servanda bacis versavitque
        > decebat trahebat vero cadit. Genero tactis novissimus discede, ait nunc iubes
        > crescunt horrea qui [germanamque et](http://iuncisque-serpens.io/ardesceret)
        > deae ore ut gravi contudit montanaque, virtute?

        Quies est perstat inire, horrenda cecidisse vulnere, quam natura copia in pia,
        Atlas conclamat elisi, in. Nutrix fecit victa: mandata Medusaeo sed mihi haut
        ceras nescio praedator regionibus monstravit guttura amarunt caesique abesse:
        sub.

        ## Longusque pharetram
      </template>
    </wt-popup>
    <wt-status-select></wt-status-select>
    <wt-tags-input
      v-model="select.multipleValue"
      :options="select.stringOptions"
      placeholder="placeholder"
      label="label"
    ></wt-tags-input>
    <wt-tags-input
      v-model="select.multipleValue"
      :options="select.options"
      track-by="name"
      taggable
      placeholder="placeholder"
      label="label"
    ></wt-tags-input>
    <wt-tags-input
      v-model="select.multipleValue"
      :options="select.options"
      track-by="name"
      taggable
      placeholder="placeholder"
      label="label"
      disabled
    ></wt-tags-input>
    <wt-select
      v-model="select.multipleValue"
      :options="select.options"
      track-by="name"
      multiple
      placeholder="placeholder"
      label="label"
    ></wt-select>
    <wt-select
      v-model="select.multipleValue"
      :options="select.options"
      :clearable="false"
      track-by="name"
      multiple
      placeholder="placeholder"
      label="label"
    ></wt-select>
    <wt-select
      :value="'lorem ipsum'"
      :options="select.options"
      track-by="name"
      placeholder="placeholder"
      label="label"
      disabled
    ></wt-select>
  </div>
</template>

<script>
export default {
  name: 'the-playground',
  data: () => ({
    date: Date.now(),
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
      multipleValue: [
        {
          name: 'Vue.876878768787687876878768787687',
          language: 'JavaScript',
        },
        {
          name: 'Adonis2',
          language: 'JavaScript',
        },
      ],
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

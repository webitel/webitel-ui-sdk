<script setup>
import { onMounted, ref } from 'vue';
import WtButton from './components/wt-button/wt-button.vue';
import service from './service.json';

const myInput = ref()

const selected = ref([])

const myTestInput = ref({
  form: {
    test: {
      name: {
        value: '123',
        error: false,
        dirty: false,
      }
    }
  }
})

const services = ref([...service.items])

const tableData = ref([
  {
    "name": "Admооо",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "3",
    "username": "adm",
    "extension": "202",
    "presence": {
      "note": "Chatting"
    }
  },
  {
    "name": "Ihor Ihor",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "10",
    "username": "igor",
    "extension": "1008",
    "presence": {
      "note": "Available"
    }
  },
  {
    "name": "Margarita Kadatskaya",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "19",
    "username": "ddd",
    "extension": "8888",
    "presence": {
      "note": "Available"
    }
  },
  {
    "name": "defaultuserlogin0.",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "31",
    "username": "7454",
    "extension": "7454",
    "presence": {
      "status": "{dnd}",
      "note": "On break"
    }
  },
  {
    "name": "222",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "32",
    "username": "222",
    "extension": "777"
  },
  {
    "name": "default us11",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "37",
    "username": "7677",
    "extension": "7677",
    "presence": {
      "note": "Available"
    }
  },
  {
    "name": "default user namd",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "39",
    "username": "defaultuserlogin0.38286564308706494",
    "extension": "3244444444444444",
    "presence": {
      "status": "{dnd}"
    }
  },
  {
    "name": "258",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "50",
    "username": "258",
    "extension": "258",
    "presence": {
      "status": "{dnd}"
    }
  },
  {
    "name": "weweweweц",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "51",
    "username": "259",
    "extension": "259"
  },
  {
    "name": "260",
    "status": "",
    "state": true,
    "dnd": false,
    "id": "52",
    "username": "260",
    "extension": "260",
    "presence": {
      "status": "{dnd}"
    }
  }
])

const dataHeaders = ref([
  {
    "value": "name",
    "locale": "objects.name",
    "field": "name",
    "sort": null
  },
  {
    "value": "status",
    "locale": "objects.directory.users.status",
    "width": "minmax(320px, 1fr)",
    "field": "presence",
    "sort": null
  },
  {
    "value": "username",
    "locale": "objects.directory.users.login",
    "field": "username",
    "sort": null
  },
  {
    "value": "extensions",
    "locale": "objects.directory.users.extensions",
    "field": "extension",
    "sort": null
  },
  {
    "value": "DnD",
    "locale": "objects.directory.users.DnD",
    "width": "120px",
    "field": "presence",
    "sort": null
  }
])

const dataHeaders2 = ref([
  {
    "value": "name",
    "locale": "objects.name",
    "field": "name",
    "sort": null
  },
  {
    "value": "description",
    "locale": "objects.description",
    "width": "minmax(320px, 1fr)",
    "field": "presence",
    "sort": null
  },
])

const focusInput = () => {
  myInput.value.focus()
}

onMounted(() => {
  console.log('services', services)
})
</script>

<template>
  <div
    class="playground"
    style="background: var(--content-wrapper-color);"
  >
    myTestInput.form.test.name.value {{ myTestInput.form.test.name.value }}
    <wt-table
      :headers="dataHeaders"
      :data="tableData"
    >
      <template #name="data">{{ data }}</template>
    </wt-table>
    <wt-tree-table
      :headers="dataHeaders2"
      :data="services"
      children="service"
      selectable
      sortable
    >
      <template #actions-header>
        Test
      </template>
      <template #name="data">{{ data.item.name }} + <strong>slot template</strong></template>
    </wt-tree-table>
    <div style="display: flex; gap: 8px; align-items: center">
      <div>
        <wt-input :value="myTestInput.form.test.name.value" @input="myTestInput.form.test.name.value = $event" ref="myInput"></wt-input>
      </div>
      <wt-divider variant="vertical" />
      <div>
        <wt-button @click="focusInput">focusInput</wt-button>
      </div>
    </div>
<!--    <wt-input type="number" />-->
<!--    <wt-logo />-->
<!--    <wt-select />-->
<!--    <wt-pagination />-->
<!--    <wt-input />-->
<!--    <wt-icon-btn-->
<!--      icon="edit"-->
<!--      @click="() => alert('wt-icon-btn clicked')"-->
<!--    />-->
<!--    <wt-switcher-->
<!--      v-model="dark"-->
<!--      label="Dark theme"-->
<!--      @change="changeTheme"-->
<!--    />-->
<!--    <wt-rounded-action icon="edit" />-->
<!--    <wt-player-->
<!--      :autoplay="false"-->
<!--      mime="video"-->
<!--      reset-on-end-->
<!--      reset-volume-->
<!--      src="https://www.w3schools.com/html/mov_bbb.mp4"-->
<!--    />-->
<!--    <wt-app-header>-->
<!--      <wt-app-navigator-->
<!--        :apps="[{name: 'admin', href: `dev.webitel.com/admin`}]"-->
<!--        :current-app="'admin'"-->
<!--      />-->
<!--      <wt-header-actions-->
<!--        :user="{ name: 'John Doe' }"-->
<!--      />-->
<!--    </wt-app-header>-->
<!--    {{ date }}-->
<!--    <wt-datepicker-->
<!--      v-model="date"-->
<!--      mode="datetime"-->
<!--    />-->
<!--    <wt-button color="secondary-50">-->
<!--      123-->
<!--    </wt-button>-->
<!--    <wt-status-select />-->
<!--    <div style="display: flex; gap: 10px; flex-wrap: wrap">-->
<!--      <wt-avatar size="sm" />-->
<!--      <wt-avatar-->
<!--        size="sm"-->
<!--        username="A B"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        badge-->
<!--        size="lg"-->
<!--        username="A b"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="2xl"-->
<!--        username="c d"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="3xl"-->
<!--        username="e f"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="sm"-->
<!--        username="g h"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="lg"-->
<!--        username="i j"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="2xl"-->
<!--        username="kl"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="3xl"-->
<!--        username="mn"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="sm"-->
<!--        username="op"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="lg"-->
<!--        username="qr"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="2xl"-->
<!--        username="s t"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="3xl"-->
<!--        username="u v"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="sm"-->
<!--        username="w x"-->
<!--      />-->
<!--      <wt-avatar-->
<!--        size="lg"-->
<!--        username="y z"-->
<!--      />-->
<!--    </div>-->
<!--    <wt-context-menu :options="[{ text: 'lorem ipsum', disabled: true }, { text: 'lorem ipsum'}, { text: 'lorem ipsum'}]">-->
<!--      <template #activator>-->
<!--        <wt-button>context menu</wt-button>-->
<!--      </template>-->
<!--    </wt-context-menu>-->
<!--    <wt-tooltip-->
<!--      :popper-triggers="['click']"-->
<!--      :triggers="['click']"-->
<!--    >-->
<!--      <template #activator>-->
<!--        <div class="my-div">-->
<!--          Hover me!-->
<!--        </div>-->
<!--      </template>-->
<!--      Hello there!-->
<!--    </wt-tooltip>-->
<!--    <wt-button-select-->
<!--      :options="[-->
<!--        { text: 'ipsum 2' },{ text: 'ipsum 2' },{ text: 'ipsum 2' },-->
<!--      ]"-->
<!--    />-->
<!--    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">-->
<!--      <div>-->
<!--        <audit-form-->
<!--          v-model:questions="auditQuestions"-->
<!--          mode="create"-->
<!--        />-->
<!--        {{ auditQuestions }}-->
<!--      </div>-->
<!--      <div>-->
<!--        <audit-form-->
<!--          v-model:result="auditResult"-->
<!--          :questions="auditQuestions"-->
<!--          mode="fill"-->
<!--        />-->
<!--        {{ auditResult }}-->
<!--      </div>-->
<!--    </div>-->
<!--    <wt-navigation-bar-->
<!--      :nav="[-->
<!--        { value: '1', name: 'Name 1', route: '/1' },-->
<!--        { value: 'exp1', name: 'Expansion 1', subNav: [-->
<!--          { value: '2', name: 'Name 2', route: '/2' },-->
<!--          { value: '3', name: 'Name 3', route: '/3' },-->
<!--        ] },-->
<!--        { value: 'exp2', name: 'Expansion 2', subNav: [-->
<!--          { value: '4', name: 'Name 4', route: '/4' },-->
<!--          { value: '5', name: 'Name 5', route: '/5' },-->
<!--        ] },-->
<!--      ]"-->
<!--    />-->
<!--    <wt-avatar-->
<!--      badge-->
<!--      status="dnd"-->
<!--    />-->
<!--    <wt-icon-->
<!--      icon="bucket"-->
<!--      @click="log"-->
<!--    />-->
<!--    <wt-icon-btn-->
<!--      color="icon-secondary"-->
<!--      icon="edit"-->
<!--      size="lg"-->
<!--      @click="log"-->
<!--    />-->
<!--    <wt-load-bar-->
<!--      max="100"-->
<!--      value="50"-->
<!--    />-->
<!--    <wt-load-bar-->
<!--      max="100"-->
<!--      value="100"-->
<!--    />-->
<!--    <wt-status-select />-->
<!--    <wt-tags-input-->
<!--      v-model="select.multipleValue"-->
<!--      :options="select.stringOptions"-->
<!--      label="label"-->
<!--      placeholder="placeholder"-->
<!--    />-->
<!--    &lt;!&ndash;    <wt-tags-input&ndash;&gt;-->
<!--    &lt;!&ndash;      v-model="select.multipleValue"&ndash;&gt;-->
<!--    &lt;!&ndash;      :options="select.options"&ndash;&gt;-->
<!--    &lt;!&ndash;      track-by="name"&ndash;&gt;-->
<!--    &lt;!&ndash;      taggable&ndash;&gt;-->
<!--    &lt;!&ndash;      placeholder="placeholder"&ndash;&gt;-->
<!--    &lt;!&ndash;      label="label"&ndash;&gt;-->
<!--    &lt;!&ndash;    ></wt-tags-input>&ndash;&gt;-->
<!--    &lt;!&ndash;    <wt-tags-input&ndash;&gt;-->
<!--    &lt;!&ndash;      v-model="select.multipleValue"&ndash;&gt;-->
<!--    &lt;!&ndash;      :options="select.options"&ndash;&gt;-->
<!--    &lt;!&ndash;      track-by="name"&ndash;&gt;-->
<!--    &lt;!&ndash;      taggable&ndash;&gt;-->
<!--    &lt;!&ndash;      placeholder="placeholder"&ndash;&gt;-->
<!--    &lt;!&ndash;      label="label"&ndash;&gt;-->
<!--    &lt;!&ndash;      disabled&ndash;&gt;-->
<!--    &lt;!&ndash;    ></wt-tags-input>&ndash;&gt;-->
<!--    &lt;!&ndash;    <wt-select&ndash;&gt;-->
<!--    &lt;!&ndash;      v-model="select.multipleValue"&ndash;&gt;-->
<!--    &lt;!&ndash;      :options="select.options"&ndash;&gt;-->
<!--    &lt;!&ndash;      track-by="name"&ndash;&gt;-->
<!--    &lt;!&ndash;      multiple&ndash;&gt;-->
<!--    &lt;!&ndash;      placeholder="placeholder"&ndash;&gt;-->
<!--    &lt;!&ndash;      label="label"&ndash;&gt;-->
<!--    &lt;!&ndash;    ></wt-select>&ndash;&gt;-->
<!--    <wt-select-->
<!--      v-model="select.multipleValue"-->
<!--      :clearable="false"-->
<!--      :options="select.options"-->
<!--      label="label"-->
<!--      multiple-->
<!--      placeholder="placeholder"-->
<!--      track-by="name"-->
<!--    />-->
<!--    &lt;!&ndash;    <wt-select&ndash;&gt;-->
<!--    &lt;!&ndash;      :value="'lorem ipsum'"&ndash;&gt;-->
<!--    &lt;!&ndash;      :options="select.options"&ndash;&gt;-->
<!--    &lt;!&ndash;      track-by="name"&ndash;&gt;-->
<!--    &lt;!&ndash;      placeholder="placeholder"&ndash;&gt;-->
<!--    &lt;!&ndash;      label="label"&ndash;&gt;-->
<!--    &lt;!&ndash;      disabled&ndash;&gt;-->
<!--    &lt;!&ndash;    ></wt-select>&ndash;&gt;-->

<!--    <template v-if="message === '123'">-->
<!--      <p>{{ message + '333' }}</p>-->
<!--    </template>-->
<!--    <p>{{ message }}</p>-->
<!--    <input v-model="message">-->
<!--    <wt-search-bar-->
<!--      :hint="'qwe qwe'"-->
<!--      :placeholder="$t('reusable.search')"-->
<!--      :v="vInvalid"-->
<!--      invalid-->
<!--    >-->
<!--      <template #additional-actions="options">-->
<!--        <wt-icon-->
<!--          :color="options.invalid ? 'error' : null"-->
<!--          icon="bucket"-->
<!--        />-->
<!--      </template>-->
<!--    </wt-search-bar>-->
  </div>
</template>

<script>
import VueDatepicker from '@vuepic/vue-datepicker';
import { EngineAuditQuestionType } from 'webitel-sdk';
import WtExpandTransition from './components/transitions/wt-expand-transition.vue';
import WtContextMenu from './components/wt-context-menu/wt-context-menu.vue';
import WtDatepicker from './components/wt-datepicker/wt-datepicker.vue';
import WtNavigationBar from './components/wt-navigation-bar/wt-navigation-bar.vue';
import WtPlayer from './components/wt-player/wt-player.vue';
import WtRoundedAction from './components/wt-rounded-action/wt-rounded-action.vue';
import WtSearchBar from './components/wt-search-bar/wt-search-bar.vue';
import WtTooltip from './components/wt-tooltip/wt-tooltip.vue';

import AuditForm from './modules/AuditForm/components/audit-form.vue';
import WtDivider from './components/wt-divider/wt-divider.vue';
import WtInput from './components/wt-input/wt-input.vue';

export default {
  name: 'ThePlayground',
  components: {
    WtInput,
    WtDivider,
    WtPlayer,
    WtRoundedAction,
    WtContextMenu,
    WtTooltip,
    VueDatepicker,
    WtDatepicker,
    WtNavigationBar,
    WtExpandTransition,
    AuditForm,
    WtSearchBar,
  },
  data: () => ({
    dark: false,
    auditQuestions: [
      {
        required: true,
        question: 'My Anketa number 1',
        type: EngineAuditQuestionType.Option,
        options: [
          {
            name: 'My first var!',
            score: 10,
          },
          {
            name: 'My lorem ipsum var!',
            score: 10,
          },
        ],
      },
      // {
      //   'required': true,
      //   'question': 'My anketa number two!',
      //   'type': EngineAuditQuestionType.Score,
      //   'min': 1,
      //   'max': 5,
      // },
    ],
    auditResult: [],
    date: Date.now(),
    currentTab: { value: 1 },
    switcher: true,
    options: [
      {
        text: 'Save as Save as Save as Save as  Save as Save as Save asSave as  Save as Save as Save as',
      },
    ],
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
    searchValue: '',
    message: '',
  }),
  methods: {
    search(search) {
      return {
        items: Array(10).fill({ name: search || '123' }),
        next: true,
      };
    },
    load() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    log(options) {
      console.log(options);
    },
    changeTheme() {
      document.documentElement.classList.toggle('theme--dark');
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

//.scrollbar-outer {
//  @extend %wt-scrollbar;
//}
//
//.playground-docs {
//  margin-bottom: var(--spacing-3xl);
//
//  .title {
//    @extend %typo-heading-1;
//    margin-bottom: var(--spacing-sm);
//  }
//}
//
//.playground-box-shadow article {
//  display: grid;
//  grid-template-columns: repeat(5, 1fr);
//  gap: var(--spacing-3xl);
//}
//
//.el {
//  @extend %typo-overline;
//  display: flex;
//  align-items: center;
//  justify-content: center;
//  min-width: 110px;
//  height: 100px;
//  border-radius: var(--border-radius);
//}
//
//.el-1 {
//  box-shadow: var(--elevation-1);
//}
//
//.el-2 {
//  box-shadow: var(--elevation-2);
//}
//
//.el-3 {
//  box-shadow: var(--elevation-3);
//}
//
//.el-4 {
//  box-shadow: var(--elevation-4);
//}
//
//.el-5 {
//  box-shadow: var(--elevation-5);
//}
//
//.el-6 {
//  box-shadow: var(--elevation-6);
//}
//
//.el-7 {
//  box-shadow: var(--elevation-7);
//}
//
//.el-8 {
//  box-shadow: var(--elevation-8);
//}
//
//.el-9 {
//  box-shadow: var(--elevation-9);
//}
//
//.el-10 {
//  box-shadow: var(--elevation-10);
//}
//
////}
//
//.playground-typo {
//  article > * {
//    margin-bottom: var(--spacing-sm);
//  }
//}
//
//.h1 {
//  @extend %typo-heading-1;
//}
//
//.h2 {
//  @extend %typo-heading-2;
//}
//
//.h3 {
//  @extend %typo-heading-3;
//}
//
//.st1 {
//  @extend %typo-subtitle-1;
//}
//
//.st2 {
//  @extend %typo-subtitle-2;
//}
//
//.b1 {
//  @extend %typo-body-1;
//}
//
//.b2 {
//  @extend %typo-body-2;
//}
//
//.c {
//  @extend %typo-caption;
//}
//
//.o {
//  @extend %typo-overline;
//}

//}
</style>

<template>
  <div class="playground">
    <wt-datepicker></wt-datepicker>
    <div style="margin-top: 250px;">
      <h2>Player</h2>
      <wt-player></wt-player>
    </div>
    <div>
      <h2>Table</h2>
      <wt-table
        :headers="table.headers"
        :data="table.data"
        sortable
      ></wt-table>
    </div>
    <div>
      <h2>Status Select</h2>
      <wt-status-select/>
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
      <h2>Notifications bar</h2>
      <div style="position:relative; : 800px; height: 800px; background: var(--main-outline-color);">
        <wt-notifications-bar style="position: absolute;"/>
      </div>
    </div>
    <div>
      <h2>App Header</h2>
      <wt-app-header>
        <wt-app-navigator :apps="appHeader.apps"></wt-app-navigator>
        <wt-header-actions :user="{name: 'Name', account: 'name@example.com'}"></wt-header-actions>
      </wt-app-header>
    </div>
    <div>
      <h2>Scrollbar</h2>
      <div class="scrollbar-outer" style="width: 300px; height: 300px; overflow: scroll;">
        <div style="width: 1000px; height: 1000px;"></div>
      </div>
    </div>
    <div style="padding: 30px; background: #EAEAEA;">
      <h2>Headline</h2>
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
    </div>
    <div>
      <h2>Table Actions</h2>
      <wt-table-actions
        :icons="['import', 'export', 'filter-reset', 'column-select', 'refresh', 'settings']"
      ></wt-table-actions>
    </div>
  </div>
</template>

<script>

export default {
  name: 'playground',
  data: () => ({
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
      value: '',
      multipleValue: [],
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

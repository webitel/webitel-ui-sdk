<template>
  <div class="playground">
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
      <div style="position:relative; : 800px; height: 800px; background: var(--main-ouline-color);">
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
      appHeader: {
        apps: [
          {
            name: 'admin',
            href: 'https://example.com',
          },
          {
            name: 'audit',
            href: 'https://example.com',
          },
          {
            name: 'history',
            href: 'https://example.com',
          },
          {
            name: 'supervisor',
            href: 'https://example.com',
          },
          {
            name: 'agent',
            href: 'https://example.com',
          },
          {
            name: 'grafana',
            href: 'https://example.com',
          },
        ],
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

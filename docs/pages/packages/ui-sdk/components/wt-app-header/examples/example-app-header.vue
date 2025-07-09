<script setup>
import { CrmSections,WebitelApplications } from '@webitel/ui-sdk/enums';

const apps = [
  { name: WebitelApplications.AGENT, href: 'https://example.com' },
  { name: WebitelApplications.AUDIT, href: 'https://example.com' },
  { name: WebitelApplications.SUPERVISOR, href: 'https://example.com' },
  { name: WebitelApplications.CRM, href: 'https://example.com' },
  { name: WebitelApplications.ADMIN, href: 'https://example.com' },
  { name: WebitelApplications.HISTORY, href: 'https://example.com' },
  { name: WebitelApplications.ANALYTICS, href: 'https://example.com' },
];

const nav = [{
  value: CrmSections.CONTACTS,
  name: CrmSections.CONTACTS,
  route: '/contacts',
}]

const user = {
  name: 'My name',
  preferredUsername: 'My username',
};

const buildInfo = {
  release: '21.02',
  build: 'AWS-12',
};
</script>

<template>
  <wt-app-header>
    <template #start>
      <wt-navigation-bar
        current-app="admin"
        :nav="nav"
        dark-mode
        :logo-route="''"
      />

      <wt-logo
        dark-mode
        :logo-href="''"
      />

      <wt-dark-mode-switcher />
    </template>

    <template #end>
      <wt-switcher
        :value="false"
        label="Call center"
      />

      <wt-app-navigator
        :apps="apps"
        current-app="admin"
        dark-mode
      />

      <wt-header-actions
        :user="user"
        :build-info="buildInfo"
      />
    </template>
  </wt-app-header>
</template>

<style lang="scss" scoped></style>

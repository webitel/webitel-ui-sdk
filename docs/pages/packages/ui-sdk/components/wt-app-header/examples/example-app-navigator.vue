<script setup>
import { WebitelApplications } from '@webitel/ui-sdk/enums';

const apps = [
  { name: WebitelApplications.AGENT, href: 'https://example.com' },
  { name: WebitelApplications.AUDIT, href: 'https://example.com' },
  { name: WebitelApplications.SUPERVISOR, href: 'https://example.com' },
  { name: WebitelApplications.CRM, href: 'https://example.com' },
  { name: WebitelApplications.ADMIN, href: 'https://example.com' },
  { name: WebitelApplications.HISTORY, href: 'https://example.com' },
  { name: WebitelApplications.ANALYTICS, href: 'https://example.com' },
];
</script>

<template>
  <wt-app-header>
    <template #end>
      <wt-app-navigator
        current-app="admin"
        :apps="apps"
        dark-mode
      />
      <wt-app-navigator
        current-app="admin"
        :apps="apps"
      />
    </template>
  </wt-app-header>
</template>

<style scoped lang="scss"></style>

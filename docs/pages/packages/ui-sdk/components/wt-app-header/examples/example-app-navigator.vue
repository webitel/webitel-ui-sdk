<script setup>
import { WtApplication } from '@webitel/ui-sdk/enums';

const apps = [
	{
		name: WtApplication.Agent,
		href: 'https://example.com',
	},
	{
		name: WtApplication.Audit,
		href: 'https://example.com',
	},
	{
		name: WtApplication.Supervisor,
		href: 'https://example.com',
	},
	{
		name: WtApplication.Crm,
		href: 'https://example.com',
	},
	{
		name: WtApplication.Admin,
		href: 'https://example.com',
	},
	{
		name: WtApplication.History,
		href: 'https://example.com',
	},
	{
		name: WtApplication.Analytics,
		href: 'https://example.com',
	},
];
</script>

<template>
  <wt-app-header>
    <wt-app-navigator
      current-app="admin"
      :apps="apps"
      dark-mode
    />
    <wt-app-navigator
      current-app="admin"
      :apps="apps"
    />
  </wt-app-header>
</template>

<style scoped lang="scss"></style>

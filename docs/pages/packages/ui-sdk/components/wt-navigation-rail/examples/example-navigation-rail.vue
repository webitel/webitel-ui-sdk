<script setup>
import { ref } from 'vue';

const active = ref('calls');
const lastSelected = ref('');

const top = [
	{
		id: 'calls',
		icon: 'call',
		label: 'Calls',
		badge: {
			value: 1,
			severity: 'error',
		},
	},
	{
		id: 'chats',
		icon: 'chat',
		label: 'Chats',
		badge: {
			value: 3,
		},
	},
	{
		id: 'comments',
		icon: 'comment',
		label: 'Comments',
	},
	{
		id: 'emails',
		icon: 'email',
		label: 'Emails',
	},
];
const bottom = [
	{
		id: 'docs',
		icon: 'docs',
		label: 'Knowledge base',
	},
	{
		id: 'contacts',
		icon: 'contacts',
		label: 'Contacts',
	},
	{
		id: 'history',
		icon: 'history',
		label: 'History',
		disabled: true,
	},
];
</script>

<template>
  <div style="display: flex; gap: 16px; height: 360px">
    <wt-navigation-rail
      :active-item-id="active"
      :top-items="top"
      :bottom-items="bottom"
      @select="active = lastSelected = $event.id"
    />
    <div class="theme--dark" style="display: flex">
      <wt-navigation-rail
        :active-item-id="active"
        :top-items="top"
        :bottom-items="bottom"
        @select="active = $event.id"
      />
    </div>
    <p>Active: {{ active }}<br />Last select event: {{ lastSelected || '—' }}</p>
  </div>
</template>

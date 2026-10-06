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
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div
      v-for="theme of ['', 'theme--dark']"
      :key="theme"
      :class="theme"
      style="height: 360px"
    >
      <wt-page>
        <wt-navigation-rail
          :active-item-id="active"
          :top-items="top"
          :bottom-items="bottom"
          @select="active = lastSelected = $event.id"
        />
        <wt-layout>
          <wt-content-wrapper>
            Active: {{ active }}<br />
            Last select event: {{ lastSelected || '—' }}
          </wt-content-wrapper>
        </wt-layout>
      </wt-page>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const active = ref('calls');
const lastSelected = ref('');
const showItems = ref(true);

const topList = [
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
const bottomList = [
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

// rail is hidden when both lists are empty
const top = computed(() => (showItems.value ? topList : []));
const bottom = computed(() => (showItems.value ? bottomList : []));
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <wt-checkbox v-model:selected="showItems" label="Show navigation items" />
    <div
      v-for="theme of ['', 'theme--dark']"
      :key="theme"
      :class="theme"
      style="height: 360px"
    >
      <wt-page
        :navigation-rail="{ topItems: top, bottomItems: bottom, activeItemId: active }"
        @navigation-select="active = lastSelected = $event.id"
      >
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

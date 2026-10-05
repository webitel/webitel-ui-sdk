<script setup>
import { ref } from 'vue';

const isSidePanelShown = ref(true);
const activeNav = ref('calls');

const navTop = [
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
];
const navBottom = [
	{
		id: 'contacts',
		icon: 'contacts',
		label: 'Contacts',
	},
];
</script>

<template>
  <div style="height: 480px">
    <wt-page
      show-navigation-rail
      :navigation-rail-active-item-id="activeNav"
      @navigation-rail:select="activeNav = $event.id"
      :navigation-rail-top-items="navTop"
      :navigation-rail-bottom-items="navBottom"
    >
      <template #header>
        <div style="height: 40px; background: lightblue" />
      </template>
      <wt-layout :default-width="320" resizable>
        <wt-content-wrapper align="stretch">
          <wt-button @click="isSidePanelShown = !isSidePanelShown">
            Toggle side layout
          </wt-button>
        </wt-content-wrapper>
      </wt-layout>
      <wt-layout>
        <wt-content-wrapper>Fluid</wt-content-wrapper>
      </wt-layout>
      <wt-layout v-if="isSidePanelShown" :default-width="320">
        <wt-content-wrapper>Fixed 320px</wt-content-wrapper>
      </wt-layout>
    </wt-page>
  </div>
</template>

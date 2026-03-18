<script setup>
const now = new Date();

const timezones = [
	'Europe/Kyiv',
	'America/New_York',
	'Asia/Tokyo',
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <div
      v-for="tz of timezones"
      :key="tz"
      style="display: flex; gap: 16px; align-items: center"
    >
      <code style="min-width: 160px">{{ tz }}</code>
      <wt-datetime-text :datetime="now" :timezone="tz" />
    </div>
  </div>
</template>

<template>
  <ul
    v-if="teams">
    <li
      v-for="(team, index) of teams"
      :key="index"
    >
      {{ team.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { searchMethod } from './config.js';
import {ref} from 'vue';

const props = defineProps<{
  value: number[];
}>();

const teams = ref([]);

const getTeams = async () => {
  const { items } = await searchMethod({id: props.value});
  teams.value = items;
};

getTeams();
</script>

<style lang="scss" scoped>
</style>

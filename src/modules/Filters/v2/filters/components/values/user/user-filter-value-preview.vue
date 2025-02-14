<template>
  <ul
    v-if="users">
    <li
      v-for="(user, index) of users"
      :key="index"
    >
      {{ user.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { searchMethod } from './config.js';
import {ref} from 'vue';

const props = defineProps<{
  value: number[];
}>();

const users = ref([]);

const getUsers = async () => {
  const { items } = await searchMethod({id: props.value});
  users.value = items;
};

getUsers();
</script>

<style lang="scss" scoped>
</style>

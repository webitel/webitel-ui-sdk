<template>
  <ul
    v-if="users"
    class="user-filter-value-preview">
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
  const { items } = await searchMethod({id: props.value, fields: ['id', 'name']});
  users.value = items;
};

getUsers();
</script>

<style lang="scss" scoped>
.user-filter-value-preview {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>

<template>
  <ul
    v-if="contacts">
    <li
      v-for="(contact, index) of contacts"
      :key="index"
    >
      {{ contact.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { searchMethod } from './config.js';
import {ref} from 'vue';

const props = defineProps<{
  value: number[];
}>();

const contacts = ref([]);

const getContacts = async () => {
  const { items } = await searchMethod({id: props.value});
  contacts.value = items;
};

getContacts();
</script>

<style lang="scss" scoped>
</style>

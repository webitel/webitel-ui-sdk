<template>
  <ul
    v-if="grantees">
    <li
      v-for="(grantee, index) of grantees"
      :key="index"
    >
      {{ grantee.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { searchMethod } from './config.js';
import {ref} from 'vue';

const props = defineProps<{
  value: number[];
}>();

const grantees = ref([]);

const getGrantees = async () => {
  const { items } = await searchMethod({ids: props.value});
  grantees.value = items;
};

getGrantees();
</script>

<style lang="scss" scoped>
</style>

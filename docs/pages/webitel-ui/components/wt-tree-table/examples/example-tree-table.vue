<script setup>
import { ref } from 'vue';
import service from './service.json'

const services = ref([...service.items])

const dataHeaders = ref([
  {
    "value": "name",
    "locale": "objects.name",
    "width": "320px",
    "field": "name",
    "sort": null
  },
  {
    "value": "code",
    "locale": "objects.code",
    "width": "160px",
    "field": "code",
    "sort": null
  },
  {
    "value": "description",
    "locale": "objects.description",
    "width": "320px",
    "field": "presence",
    "sort": null
  },
])
</script>

<template>
  <wt-tree-table
    :headers="dataHeaders"
    :data="services"
    children="service"
    selectable
    sortable
  >
  </wt-tree-table>
</template>

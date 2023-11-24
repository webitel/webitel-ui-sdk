<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

const value = ref([]);

const autocomplete = [
  { name: 'Vue.js', language: 'JavaScript' },
  { name: 'Adonis', language: 'JavaScript' },
  { name: 'Rails', language: 'Ruby' },
];

const v$ = useVuelidate(computed(() => ({
  value: {
    required: () => false,
  },
})), { value });

v$.value.$touch();
</script>

<template>
  <wt-tags-input
    :value="value"
    label="Tags Input"
    :options="autocomplete"
    track-by="name"
    option-label="name"
    :v="v$"
    @input="value = $event"
  />
</template>

<style scoped lang="scss">

</style>

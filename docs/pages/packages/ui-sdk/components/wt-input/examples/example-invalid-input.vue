<template>
  <wt-input
    v-model="value"
    :v="v$"
    label="Invalid input"
    name="invalid-input"
  />
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed,ref } from 'vue';

const value = ref('invalid value');

const v$ = useVuelidate(
  computed(() => ({
    value: {
      required: () => false,
    },
  })),
  { value },
);

v$.value.$touch();

const handler = (e) => {
  value.value = e;
};
</script>

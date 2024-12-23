<template>
  <wt-input
    v-model="value"
    :v="v$"
    label="Invalid input"
    name="invalid-input"
  ></wt-input>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';

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

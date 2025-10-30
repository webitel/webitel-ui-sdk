<template>
  <wt-textarea
    v-model="value"
    :v="v$"
    label="Invalid textarea"
    name="invalid-textarea"
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
</script>

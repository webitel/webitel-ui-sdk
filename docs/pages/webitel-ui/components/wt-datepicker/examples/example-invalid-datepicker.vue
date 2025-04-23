<template>
  <wt-datepicker
    v-model="value"
    :v="v$.value"
    required
    label="Invalid datepicker"
    name="invalid-datepicker"
  />
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, ref } from 'vue';

const value = ref(null);

const v$ = useVuelidate(
  computed(() => ({
    value: {
      required,
    },
  })),
  { value },
);

v$.value.$touch();
</script>

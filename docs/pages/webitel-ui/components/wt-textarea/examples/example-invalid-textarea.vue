<template>
  <wt-textarea
    :value="value"
    :v="v$"
    label="Invalid textarea"
    name="invalid-textarea"
    @input="handler"
  />
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

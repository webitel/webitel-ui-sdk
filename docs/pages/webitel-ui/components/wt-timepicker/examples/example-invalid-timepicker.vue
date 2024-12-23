<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

const value = ref(322);

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

<template>
  <wt-timepicker
    :value="value"
    label="Invalid timepicker"
    format="hh:mm:ss"
    :v="v$"
  />
</template>

<style scoped lang="scss"></style>

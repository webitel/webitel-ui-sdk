<script setup>
import { useVuelidate } from '@vuelidate/core';
import { ref, computed } from 'vue';

const value = ref('');
const v$ = useVuelidate(computed(() => ({
  value: {
    required: () => false,
  },
})), { value });

v$.value.$touch();
</script>

<template>
  <wt-search-bar
    :value="value"
    placeholder="Invalid Search"
    :v="v$"
    @input="value = $event"
  />
</template>

<style scoped lang="scss">

</style>

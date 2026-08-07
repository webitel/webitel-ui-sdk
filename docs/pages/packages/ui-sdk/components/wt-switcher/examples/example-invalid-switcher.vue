<template>
  <wt-switcher
    v-model="value"
    :v="v$.value"
    label="Invalid switcher"
  />
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

const value = ref(false);

const v$ = useVuelidate(
	computed(() => ({
		value: {
			required: (val) => val === true,
		},
	})),
	{
		value,
	},
);

v$.value.$touch();
</script>

<style scoped lang="scss"></style>

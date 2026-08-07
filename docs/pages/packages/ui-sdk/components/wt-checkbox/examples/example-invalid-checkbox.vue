<template>
  <wt-checkbox
    v-model:selected="selected"
    :v="v$.selected"
    label="Invalid checkbox"
  />
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

const selected = ref(false);

const v$ = useVuelidate(
	computed(() => ({
		selected: {
			required: (value) => value === true,
		},
	})),
	{
		selected,
	},
);

v$.value.$touch();
</script>

<style scoped lang="scss"></style>

<template>
  <wt-radio
    v-model:selected="selected"
    :v="v$.selected"
    value="value1"
    label="Invalid radio"
  />
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

const selected = ref('');

const v$ = useVuelidate(
	computed(() => ({
		selected: {
			required: () => false,
		},
	})),
	{
		selected,
	},
);

v$.value.$touch();
</script>

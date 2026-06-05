<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

import { frameworkOptions as options } from '../../wt-select/examples/_internals/select-example-options.js';

const value = ref([
	options[0],
]);
const empty = ref([]);

const v$ = useVuelidate(
	computed(() => ({
		value: {
			required: () => false,
		},
	})),
	{
		value,
	},
);

v$.value.$touch();
</script>

<template>
  <wt-multi-select
    v-model="value"
    :options="options"
    label="Multi Select"
    option-label="name"
    data-key="language"
    :v="v$"
  />
  <wt-multi-select
    v-model="empty"
    :options="options"
    label="Multi Select (empty)"
    option-label="name"
    data-key="language"
    :v="v$"
  />
</template>

<style scoped lang="scss"></style>

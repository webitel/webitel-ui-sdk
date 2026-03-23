<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

import { frameworkOptions as options } from '../../wt-select/examples/_internals/select-example-options.js';

const value = ref(options[0]);
const empty = ref('');

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
  <wt-single-select
    v-model="value"
    :options="options"
    label="Single Select"
    option-label="name"
    :v="v$"
  />
  <wt-single-select
    v-model="empty"
    :options="options"
    label="Single Select (empty)"
    option-label="name"
    :v="v$"
  />
</template>

<style scoped lang="scss"></style>
